import type { ReactNode } from 'react'
import { MailIcon } from 'lucide-react'

interface Social {
  label: string
  href: string
  icon: ReactNode
}

const socials: Social[] = [
  {
    label: 'X',
    href: 'https://x.com/doraenack',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@nakuya',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
]

export function Sns() {
  return (
    <div id="sns" className="flex items-center gap-3">
      <span className="font-bold">SNS</span>
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          aria-label={social.label}
          className="w-4 h-4 hover:text-orange-400 transition-colors"
        >
          {social.icon}
        </a>
      ))}
      <a
        href="mailto:nack098gamer@gmail.com"
        aria-label="Email"
        className="hover:text-orange-400 transition-colors"
      >
        <MailIcon width={16} />
      </a>
    </div>
  )
}
