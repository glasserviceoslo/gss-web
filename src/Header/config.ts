// import type { GlobalConfig } from 'payload'

// import { link } from '@/fields/link'
// import { revalidateHeader } from './hooks/revalidateHeader'

// export const Header: GlobalConfig = {
//   slug: 'header',
//   access: {
//     read: () => true,
//   },
//   fields: [
//     {
//       name: 'navItems',
//       type: 'array',
//       fields: [
//         link({
//           appearances: false,
//         }),
//       ],
//       maxRows: 6,
//       admin: {
//         initCollapsed: true,
//         components: {
//           RowLabel: '@/Header/RowLabel#RowLabel',
//         },
//       },
//     },
//   ],
//   hooks: {
//     afterChange: [revalidateHeader],
//   },
// }

import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'group',
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
        {
          name: 'children',
          type: 'array',
          fields: [
            {
              name: 'item',
              type: 'group',
              fields: [
                link({
                  appearances: false,
                }),
              ],
            },
            {
              name: 'grandchildren',
              type: 'array',
              fields: [
                {
                  name: 'item',
                  type: 'group',
                  fields: [
                    link({
                      appearances: false,
                    }),
                  ],
                },
              ],
              admin: {
                components: {
                  RowLabel: '@/Header/RowLabel#RowLabel',
                },
              },
            },
          ],
          admin: {
            components: {
              RowLabel: '@/Header/RowLabel#RowLabel',
            },
          },
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
