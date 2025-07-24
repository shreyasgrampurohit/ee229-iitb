
import Link from "next/link";

const topics = [
  {
    id: 1,
    title: "1. Introduction to Signals",
    description: "Understanding continuous and discrete time signals.",
    href: "/topics/introduction-to-signals",
    wip: false,
  },
  {
    id: 2,
    title: "2. LTI Systems",
    description: "Convolution, impulse response, and system properties.",
    href: "/topics/lti-systems",
    wip: false,
  },
  {
    id: 3,
    title: "3. Fourier Series",
    description: "Representing periodic signals.",
    href: "/topics/fourier-series",
    wip: false,
  },
  {
    id: 4,
    title: "4. Fourier Transform",
    description: "Analyzing non-periodic signals.",
    href: "#",
    wip: true,
  },
  {
    id: 5,
    title: "5. Sampling Theorem",
    description: "The bridge between continuous and discrete signals.",
    href: "#",
    wip: true,
  },
  {
    id: 6,
    title: "6. Laplace Transform",
    description: "Analyzing continuous-time systems.",
    href: "#",
    wip: true,
  },
  {
    id: 7,
    title: "7. The z-Transform",
    description: "The discrete-time counterpart to the Laplace Transform.",
    href: "#",
    wip: true,
  },
];

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <header className="row-start-1">
        <h1 className="text-4xl font-bold text-center">Signal Processing - I</h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mt-2">
          An intuitive guide to understanding the fundamentals.
        </p>
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center w-full">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Course Content</h2>
          <p className="max-w-2xl">
            This website is designed to supplement the Signal Processing - I course. Here you will find interactive visualizations and explanations for key concepts to help build your intuition.
          </p>
        </div>
        <div className="w-full max-w-4xl">
          <h3 className="text-xl font-semibold mb-4">Topics</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => (
              <Link href={topic.href} key={topic.id}>
                <div className={`border rounded-lg p-4 h-full ${topic.wip ? 'cursor-not-allowed bg-gray-100 dark:bg-gray-800' : 'hover:shadow-lg transition-shadow cursor-pointer'}`}>
                  <h4 className="font-bold text-lg">{topic.title} {topic.wip && <span className="text-xs font-normal text-gray-500">(WIP)</span>}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {topic.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Created for EE229 @ IIT Bombay
        </p>
      </footer>
    </div>
  );
}
