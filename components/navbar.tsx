import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="border-b px-4">
      <div className="flex items-center justify-between mx-auto max-w-4xl h-16">
        <Link href="/">
          <span>nextsecure.com</span>
        </Link>
        <div>
          {session ? (
            <form
              action={async () => {
                "use server";
                await auth.api.signOut({
                  headers: await headers(),
                });
                redirect("/");
              }}
            >
              <button type="submit"> Sign Out</button>
            </form>
          ) : (
            <Link
              href="/sign-in"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
