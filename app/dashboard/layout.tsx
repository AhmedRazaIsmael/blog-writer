import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 p-6">
        <h2 className="text-2xl font-bold mb-10">
          Blog Writer
        </h2>

        <nav className="flex flex-col gap-4">
          {/* <Link href="/dashboard">
            Dashboard
          </Link>

          <Link href="/dashboard/profile">
            Profile
          </Link>

          <Link href="/dashboard/portfolio">
            Portfolio
          </Link> */}

          <Link href="/dashboard/blog-generator">
            Blog
          </Link>

          <Link href="/dashboard/blog-image">
            Blog Image
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}