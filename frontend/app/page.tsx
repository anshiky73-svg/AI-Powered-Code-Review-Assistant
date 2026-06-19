export default function HomePage() {
  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold">
        AI Powered Code Review Assistant
      </h1>

      <div className="mt-6 flex gap-4">
        <a href="/login">
          <button>Login</button>
        </a>

        <a href="/register">
          <button>Register</button>
        </a>
      </div>
    </main>
  );
}