import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f8f8f8]">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center">

          <span className="inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-[#FF6B35]">
            🚀 AI Powered Developer Tool
          </span>

          <h1 className="mt-8 text-6xl font-extrabold tracking-tight text-gray-900">
            Elite AI
            <br />
            Code Reviews
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-500">
            Upload your project, connect your AI provider, and receive
            intelligent code reviews focused on security, performance,
            architecture, and maintainability.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link href="/register">
              <button className="rounded-full bg-[#FF6B35] px-8 py-4 font-semibold text-white transition hover:bg-[#E85A29]">
                Get Started
              </button>
            </Link>

            <Link href="/login">
              <button className="rounded-full border border-gray-300 bg-white px-8 py-4 font-semibold text-gray-800 transition hover:border-[#FF6B35] hover:text-[#FF6B35]">
                Login
              </button>
            </Link>
          </div>
        </div>

        {/* Hero Card */}
        <div className="mt-20 flex justify-center">
          <div className="w-full max-w-5xl rounded-[32px] border border-gray-200 bg-white p-10 shadow-sm">
            <div className="grid gap-8 md:grid-cols-3">

              <div className="rounded-2xl bg-gray-50 p-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Security Review
                </h3>

                <p className="mt-3 text-gray-500">
                  Detect vulnerabilities, secrets, and authentication issues.
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Performance Review
                </h3>

                <p className="mt-3 text-gray-500">
                  Find bottlenecks, inefficient algorithms, and slow queries.
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Architecture Review
                </h3>

                <p className="mt-3 text-gray-500">
                  Improve scalability, maintainability, and project structure.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}