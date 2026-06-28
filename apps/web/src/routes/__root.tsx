import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { Layout } from '../components/Layout'
import appCss from '../styles.css?url'

const SITE_URL =
  (import.meta.env.VITE_SITE_URL as string | undefined) ?? 'http://localhost:3000'
const siteTitle = 'Weekly Game Design Challenge'
const siteDescription =
  'A weekly game design challenge by Nakuya — read the prompt, build a game, and share your design.'
const ogImage = `${SITE_URL}/og-image.jpg`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: siteTitle },
      { name: 'description', content: siteDescription },
      { name: 'theme-color', content: '#fb923c' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: siteTitle },
      { property: 'og:title', content: siteTitle },
      { property: 'og:description', content: siteDescription },
      { property: 'og:url', content: SITE_URL },
      { property: 'og:image', content: ogImage },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: siteTitle },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: siteTitle },
      { name: 'twitter:description', content: siteDescription },
      { name: 'twitter:image', content: ogImage },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/png', href: '/logo.png' },
      { rel: 'icon', type: 'image/webp', href: '/logo.webp' },
      { rel: 'apple-touch-icon', href: '/logo.png' },
      { rel: 'manifest', href: '/manifest.json' },
    ],
  }),
  component: RootComponent,
  shellComponent: RootDocument,
})

function RootComponent() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-[url(/bg.webp)] bg-repeat w-full min-h-screen">
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
