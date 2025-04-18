import { readdir, readFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import matter from 'gray-matter'
import { z } from 'zod'
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import payloadConfig from '@/payload.config'
import { defaultLexical } from '@/fields/defaultLexical'
import type { CollectionSlug, Payload, File, PayloadRequest } from 'payload'
import type { GlobalSlug } from 'payload'
import type { ContentBlock, Glasstype, Post } from '@/payload-types'
// import { getPayload } from 'payload'
// import config from '@payload-config'
// import { inspect } from 'node:util'

const baseContentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  heading: z.string().min(1, 'Heading is required'),
  featuredMedia: z
    .discriminatedUnion('discriminant', [
      z.object({
        discriminant: z.literal('image'),
        value: z.object({
          asset: z.string(),
          alt: z.string().optional(),
        }),
      }),
      z.object({
        discriminant: z.literal('video'),
        value: z.object({
          url: z.string().min(1, 'Video URL is required').url('Must be a valid URL'),
          image: z.object({
            asset: z.string(),
            alt: z.string().optional(),
          }),
        }),
      }),
      z.object({
        discriminant: z.literal('none'),
        value: z.null().optional(),
      }),
    ])
    .default({ discriminant: 'none', value: null }),
  metaDescription: z.string().optional(),
  seoKeyphrase: z.string().optional().nullable(),
  seoKeywords: z.string().optional().nullable(),
  publishedAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  slug: z.string(),
})

type FrontMatter = z.infer<typeof baseContentSchema>
type LexicalContent = NonNullable<
  NonNullable<ContentBlock['columns']>[number]['richText'] | Post['content'] | Glasstype['content']
>

type ParsedMarkdown = {
  frontMatter: FrontMatter
  lexicalContent: LexicalContent
  rawContent: string
}

const baseAssetURL = 'https://raw.githubusercontent.com/glasserviceoslo/glass.no/main/src'

async function parseMarkdownFile(filePath: string, payload: Payload): Promise<ParsedMarkdown> {
  const fileContent = await readFile(filePath, 'utf-8')
  const fileName =
    filePath
      .split('/')
      .pop()
      ?.replace(/\.(md|mdx)$/, '') || ''

  const { data, content } = matter(fileContent)
  const parsedData = baseContentSchema.parse({
    ...data,
    slug: fileName,
  })

  const config = await payloadConfig

  // Extract all image paths from markdown
  const imageMatches = content.matchAll(/!\[(.*?)\]\((.*?)\)/g)
  const images: { path: string; caption: string }[] = []
  let processedContent = content

  for (const match of imageMatches) {
    const [, caption = '', path = ''] = match
    if (path) {
      // Clean the path by removing @/ prefix and any backslashes
      const cleanPath = path.replace('@/', '').replace(/\\/g, '')
      images.push({
        path: cleanPath,
        caption,
      })
    }
  }

  // Create media documents for each image
  const mediaDocs: Record<string, string> = {}
  for (const { path } of images) {
    try {
      // Construct the GitHub raw content URL
      const fullPath = `${baseAssetURL}/${path}`
      console.log(`Fetching image from: ${fullPath}`) // Debug log

      const buffer = await fetchFileByURL(fullPath)

      const mediaDoc = await payload.create({
        collection: 'media',
        data: {
          alt: path.split('/').pop() || 'Image',
        },
        file: buffer,
      })

      // Store the media document ID for later use
      mediaDocs[path] = mediaDoc.id.toString()

      // Replace markdown image with MediaBlock component
      processedContent = processedContent.replace(
        new RegExp(`!\\[(.*?)\\]\\(${path}\\)`),
        `<MediaBlock media="${mediaDoc.id}" />`,
      )
    } catch (error) {
      console.error(`Failed to create media document for ${path}:`, error)
    }
  }

  const instantiatedEditorConfig = await editorConfigFactory.fromEditor({
    config: config,
    editor: defaultLexical,
  })

  const lexicalContent = convertMarkdownToLexical({
    editorConfig: instantiatedEditorConfig,
    markdown: processedContent,
  }) as NonNullable<ParsedMarkdown['lexicalContent']>

  return {
    frontMatter: parsedData,
    lexicalContent,
    rawContent: processedContent,
  }
}

/**
 * Process all markdown files in a directory
 */
async function processMarkdownDirectory(
  dirPath: string,
  payload: Payload,
): Promise<ParsedMarkdown[]> {
  const absolutePath = resolve(dirPath)
  const files = await readdir(absolutePath)

  const markdownFiles = files.filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))

  const results: ParsedMarkdown[] = []

  for (const file of markdownFiles) {
    const filePath = join(absolutePath, file)
    try {
      const parsedFile = await parseMarkdownFile(filePath, payload)
      results.push(parsedFile)
      console.log(`Processed: ${file}`)
    } catch (error) {
      console.error(`Error processing ${file}:`, error)
    }
  }

  return results
}

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'forms',
  'form-submissions',
  'search',
]
const globals: GlobalSlug[] = ['header', 'footer']

export const seed = async ({ payload }: { payload: Payload; req: PayloadRequest }) => {
  try {
    // payload = await getPayload({ config })
    payload.logger.info('Seeding database...')
    payload.logger.info(`— Clearing collections and globals...`)

    // clear the database
    await Promise.all(
      globals.map((global) =>
        payload.updateGlobal({
          slug: global,
          data: {},
          depth: 0,
          context: {
            disableRevalidate: true,
          },
        }),
      ),
    )

    await Promise.all(
      collections.map((collection) => payload.db.deleteMany({ collection, where: {} })),
    )

    await Promise.all(
      collections
        .filter((collection) => Boolean(payload.collections[collection].config.versions))
        .map((collection) => payload.db.deleteVersions({ collection, where: {} })),
    )
    payload.logger.info(`— Seeding demo author and user...`)

    await payload.delete({
      collection: 'users',
      depth: 0,
      where: {
        email: {
          equals: 'demo-author@example.com',
        },
      },
    })

    payload.logger.info(`— Processing markdown files...`)
    const pagesPath = join(import.meta.dirname, './content/pages')
    const postsPath = join(import.meta.dirname, './content/posts')
    const glasstypesPath = join(import.meta.dirname, './content/glasstypes')

    const pages = await processMarkdownDirectory(pagesPath, payload)
    const posts = await processMarkdownDirectory(postsPath, payload)
    const glasstypes = await processMarkdownDirectory(glasstypesPath, payload)
    await payload.create({
      collection: 'users',
      data: {
        name: 'Demo Author',
        email: 'demo-author@example.com',
        password: 'password',
      },
    })

    payload.logger.info(`✓ Processed ${pages.length} markdown files`)

    payload.logger.info(`— Fetching media files...`)
    const images = await [...pages, ...posts, ...glasstypes].reduce(
      async (accPromise, { frontMatter }) => {
        const acc = await accPromise
        if (frontMatter.featuredMedia?.discriminant === 'image') {
          const buffer = await fetchFileByURL(
            frontMatter.featuredMedia.value.asset.replace(/@|[/]src/, baseAssetURL),
          )
          return { ...acc, [frontMatter.slug]: buffer }
        }
        return acc
      },
      Promise.resolve({} as Record<string, File>),
    )
    payload.logger.info(`✓ Fetched ${Object.keys(images).length} media files`)

    payload.logger.info(`— Creating pages and media...`)
    for (const [index, page] of pages.entries()) {
      const { frontMatter, lexicalContent } = page
      payload.logger.info(`  Processing page ${index + 1}/${pages.length}: ${frontMatter.slug}`)

      let imgDoc = null
      if (frontMatter.featuredMedia?.discriminant === 'image') {
        imgDoc = await payload.create({
          collection: 'media',
          data: {
            alt: frontMatter.featuredMedia.value.alt,
          },
          file: images[frontMatter.slug],
        })
        payload.logger.info(`    Created media for ${frontMatter.slug}`)
      }

      await payload.create({
        collection: 'pages',
        depth: 0,
        context: {
          disableRevalidate: true,
        },
        data: {
          title: frontMatter.heading,
          slug: frontMatter.slug,
          meta: {
            description: frontMatter.metaDescription,
            title: frontMatter.title,
            keywords: frontMatter.seoKeywords || frontMatter.seoKeyphrase,
          },
          hero: imgDoc
            ? {
                type: 'animated',
                media: imgDoc,
              }
            : {
                type: 'none',
              },
          layout: [
            {
              blockName: 'Content Block',
              blockType: 'content',
              columns: [
                {
                  size: 'full',
                  richText: lexicalContent,
                },
              ],
            },
          ],
        },
      })
      payload.logger.info(`    Created page ${frontMatter.slug}`)
    }

    payload.logger.info(`— Creating posts and media...`)
    for (const [index, post] of posts.entries()) {
      const { frontMatter, lexicalContent } = post
      payload.logger.info(`  Processing post ${index + 1}/${posts.length}: ${frontMatter.slug}`)

      let imgDoc = null
      if (frontMatter.featuredMedia?.discriminant === 'image') {
        imgDoc = await payload.create({
          collection: 'media',
          data: {
            alt: frontMatter.featuredMedia.value.alt,
          },
          file: images[frontMatter.slug],
        })
        payload.logger.info(`    Created media for ${frontMatter.slug}`)
      }

      await payload.create({
        collection: 'posts',
        depth: 0,
        context: {
          disableRevalidate: true,
        },
        data: {
          title: frontMatter.heading,
          slug: frontMatter.slug,
          meta: {
            description: frontMatter.metaDescription,
            title: frontMatter.title,
            keywords: frontMatter.seoKeywords || frontMatter.seoKeyphrase,
          },
          heroImage: imgDoc,
          content: lexicalContent,
        },
      })
      payload.logger.info(`    Created post ${frontMatter.slug}`)
    }

    payload.logger.info(`— Creating glasstypes and media...`)
    for (const [index, glasstype] of glasstypes.entries()) {
      const { frontMatter, lexicalContent } = glasstype
      payload.logger.info(
        `  Processing glasstype ${index + 1}/${glasstypes.length}: ${frontMatter.slug}`,
      )

      let imgDoc = null
      if (frontMatter.featuredMedia?.discriminant === 'image') {
        imgDoc = await payload.create({
          collection: 'media',
          data: {
            alt: frontMatter.featuredMedia.value.alt,
          },
          file: images[frontMatter.slug],
        })
        payload.logger.info(`    Created media for ${frontMatter.slug}`)
      }

      await payload.create({
        collection: 'glasstypes',
        depth: 0,
        context: {
          disableRevalidate: true,
        },
        data: {
          title: frontMatter.heading,
          slug: frontMatter.slug,
          meta: {
            description: frontMatter.metaDescription,
            title: frontMatter.title,
            keywords: frontMatter.seoKeywords || frontMatter.seoKeyphrase,
          },
          heroImage: imgDoc,
          content: lexicalContent,
        },
      })
      payload.logger.info(`    Created glasstype ${frontMatter.slug}`)
    }

    payload.logger.info('✓ Seeding completed successfully')
  } catch (error) {
    if (payload) {
      payload.logger.error('Error during seeding:', error)
    } else {
      console.error('Error during seeding:', error)
    }
    throw error
  }
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}

// seed()
//   .catch((error) => {
//     console.error(
//       'Failed to seed database:',
//       inspect(error, { showHidden: true, depth: null, colors: true }),
//     )
//     process.exit(1)
//   })
//   .finally(() => {
//     console.log('Seed completed')
//     process.exit(0)
//   })

// async function test() {
//   const pagesPath = join(import.meta.dirname, './content/pages')
//   const payload = await getPayload({ config })
//   const pages = await processMarkdownDirectory(pagesPath, payload)
//   pages
//     .filter((page) => page.frontMatter.slug.includes('smijern'))
//     .forEach((page) => {
//       console.log(inspect(page.lexicalContent, { showHidden: true, depth: null, colors: true }))
//     })
// }

// test()
