import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowRightIcon,
  CheckIcon,
  InfoIcon,
  LightbulbIcon,
  UsersIcon,
} from 'lucide-react'

export const Route = createFileRoute('/about/')({
  component: RouteComponent,
})

const steps = [
  'A new prompt drops each week.',
  'Design a game around it — any genre, any scope, as simple or as wild as you like.',
  'Share your idea with a short write-up, an image, and a link to your design docs.',
  'Read other submissions, leave comments, and borrow ideas to make your next design better.',
]

const facts = ['New prompt every week', 'No code required', 'All skill levels welcome']

function RouteComponent() {
  return (
    <div className="pb-8 grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="flex items-center gap-2">
          <InfoIcon width={18} className="text-orange-400" />
          <h2 className="font-bold">About</h2>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          What the Weekly Game Design Challenge is all about.
        </p>

        <p className="text-gray-700 text-pretty mb-4">
          Every week we post a small, random idea — a prompt — and you design a game
          around it. There's no engine to install and no code to write: it's all about
          the <em>design</em>. Share your concept, see how everyone else tackled the same
          idea, swap comments, and walk away a slightly better game designer than last week.
        </p>

        <div className="bg-orange-50 rounded-md flex flex-row gap-2 mb-8">
          <div className="w-1.5 bg-orange-400 rounded-l-md" />
          <p className="italic text-pretty py-3 pr-4 text-sm text-gray-700">
            Everyone should be able to design games. This is a gentle place to start.
          </p>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <LightbulbIcon width={18} className="text-orange-400" />
          <h2 className="font-bold">How it works</h2>
        </div>
        <ol className="flex flex-col gap-3 mb-8">
          {steps.map((step, index) => (
            <li key={index} className="flex gap-3">
              <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-400 text-white text-xs font-bold">
                {index + 1}
              </span>
              <p className="text-gray-700 text-pretty">{step}</p>
            </li>
          ))}
        </ol>

        <div className="flex items-center gap-2 mb-3">
          <UsersIcon width={18} className="text-orange-400" />
          <h2 className="font-bold">Who it's for</h2>
        </div>
        <p className="text-gray-700 text-pretty mb-2">
          Everyone — students, hobbyists, and anyone curious about how games are designed.
        </p>
        <p className="text-gray-700 text-pretty mb-8">
          If a full game jam feels like a lot — the deadline crunch, the building, the
          all-nighters — this is a softer on-ramp. You bring the idea; the rest is just
          sharing and learning together, at your own pace.
        </p>

        <p className="text-sm text-gray-400 text-pretty">
          Inspired by Takashi Hamamura's interview on learning game design by breaking it
          into pieces and practicing —{' '}
          <a
            href="https://gamemakers.jp/article/2022_07_13_11507/"
            target="_blank"
            rel="noreferrer"
            className="text-orange-400 hover:underline"
          >
            read it on gamemakers.jp ↗
          </a>
          .
        </p>
      </div>

      <aside className="lg:col-span-1">
        <div className="bg-orange-50 rounded-xl p-5 lg:sticky lg:top-8">
          <h3 className="font-bold text-gray-800 mb-1">Ready to dive in?</h3>
          <p className="text-sm text-gray-600 mb-4">
            This week's prompt is waiting — come design something.
          </p>
          <Link
            to="/"
            className="group inline-flex items-center gap-1 px-4 py-2 bg-orange-400 text-white text-sm font-semibold rounded-md hover:bg-orange-500 transition-colors"
          >
            See this week's challenge
            <ArrowRightIcon
              width={16}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </Link>
          <ul className="mt-5 flex flex-col gap-2 text-sm text-gray-600">
            {facts.map((fact) => (
              <li key={fact} className="flex items-center gap-2">
                <CheckIcon width={16} className="shrink-0 text-orange-400" />
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}
