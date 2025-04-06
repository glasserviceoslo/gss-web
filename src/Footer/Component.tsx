import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navGroups = footerData?.navGroups || []

  return (
    <footer className="mt-auto px-8 py-6 lg:px-12 border-t border-border bg-primary-foreground text-white">
      <div className="container mx-auto">
        <div className="md:flex md:justify-between">
          <div className="mb-6 self-center md:mb-0">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            {navGroups.map((group, index) => (
              <div key={index}>
                <h2 className="mb-6 text-sm font-semibold uppercase text-gray-600">
                  {group.label}
                </h2>
                <ul className="text-gray-300">
                  {group.items?.map((item, itemIndex) => (
                    <li key={itemIndex} className="mb-4">
                      <CMSLink className="hover:underline" {...item.link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <hr className="my-6" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-700 dark:text-gray-300 sm:text-center">
            © {new Date().getFullYear()} Glass-Service Svendsen og Sønn AS. All Rights Reserved.
          </span>
          <div className="mt-4 flex flex-row gap-4 sm:mt-0 sm:ml-4">
            <div className="flex flex-row gap-2">
              <p className="text-gray-700 dark:text-gray-300">Tel:</p>
              <Link
                href="tel:+4791584940"
                className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                <span>+47 91 58 49 40</span>
              </Link>
            </div>
            <div className="flex flex-row gap-2">
              <p className="text-gray-700 dark:text-gray-300">Email:</p>
              <Link
                href="mailto:post@glass.no"
                className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                <span>post@glass.no</span>
              </Link>
            </div>
          </div>
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Link
              href="https://facebook.com/glass1889"
              className="text-gray-700 transition-colors duration-200 hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-400"
              target="_blank"
              rel="noreferrer"
            >
              <p className="sr-only">Link to Facebook</p>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
            <Link
              href="https://www.instagram.com/glass_siden_1889/"
              className="text-gray-700 transition-colors duration-200 hover:text-pink-700 dark:text-gray-300 dark:hover:text-pink-400"
              target="_blank"
              rel="noreferrer"
            >
              <p className="sr-only">Link to Instagram</p>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
            <Link
              href="https://sgregister.dibk.no/enterprises/921527675"
              className="text-gray-700 transition-colors duration-200 hover:text-yellow-700 dark:text-gray-300 dark:hover:text-yellow-400"
              target="_blank"
              rel="noreferrer"
            >
              <p className="sr-only">Link to Sentral Godkjenning Register</p>
              <svg
                className="h-6 w-6"
                viewBox="0 0 40 37"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M35.4558 3.61243V33.2781H3.7207V3.61243H35.4558Z"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M35.4558 3.61243V33.2781H3.7207V3.61243H35.4558Z"
                    fill="#003045"
                  ></path>
                  <path
                    d="M23.3089 22.5503L11.8186 13.0266V21.5651L6.56589 17.1864V29.6657H19.9165H21.558H31.6257V15.5444L23.3089 22.5503ZM13.4601 16.6391L21.8863 23.645L19.6977 25.5059V27.9142H19.2599L13.4601 22.9882V16.6391ZM21.558 27.8047V26.1627L23.3089 24.6302L24.7315 25.8343V27.6953L21.558 27.8047ZM13.4601 27.9142V25.1775L16.6336 27.8047L13.4601 27.9142ZM8.20736 27.9142V20.7988L11.7092 23.7544V27.9142H8.20736ZM29.9842 27.9142H26.5919L26.4824 25.068L24.7315 23.645L29.9842 19.2663V27.9142Z"
                    fill="#FFBE00"
                  ></path>
                  <path
                    d="M39.1765 37H0V0H39.1765V37ZM1.96977 35.0296H37.2067V1.97041H1.96977V35.0296Z"
                    fill="#003045"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_2019_984">
                    <rect width="40" height="37" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </Link>

            <Link
              href="https://mittanbud.no/profil/204609/glass-service-svendsen-og-s%C3%B8nn-as/#overview"
              className="text-gray-700 transition-colors duration-200 hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-400"
              target="_blank"
              rel="noreferrer"
            >
              <p className="sr-only">Link to Mittanbud</p>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 400 400"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m144.009 28.015-143.9875156 143.987 39.9975156 39.998 143.987-143.9876z"
                  fill="#101f41"
                ></path>
                <path
                  d="m128.015 156.001c10.61 10.605 24.997 16.562 39.997 16.562 15.001 0 29.388-5.957 39.998-16.562l47.998-47.997 103.994 103.994 39.998-39.997-143.992-143.9927z"
                  fill="#3960bf"
                ></path>
                <path
                  d="m224.01 172.002c-14.852 14.851-34.995 23.193-55.997 23.193-21.003 0-41.146-8.342-55.997-23.193l-55.9974 55.997 143.9924 143.993 23.999-23.999-55.997-55.997 15.999-15.999 55.997 55.997 23.998-23.999-55.997-55.997 16-15.999 55.997 55.997 23.998-23.999-87.995-87.995z"
                  fill="#101f41"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
