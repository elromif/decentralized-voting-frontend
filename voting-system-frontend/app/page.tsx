import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { inter } from "@/components/ui/fonts";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-24 shrink-0 items-end rounded-lg bg-blue-500 p-4"></div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-6 rounded-lg bg-gray-50 px-6 py-10 md:px-20 w-full">
          <p
            className={`${inter.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            <strong>Welcome to DecentraVote</strong>
          </p>
          <div className="w-5">
            <Link
              href="/election-dashboard"
              className={buttonVariants({ variant: "outline" })}
            >
              <span>Go To Election Dashboard</span>
              <ArrowRightIcon className="w-5 md:w-6 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
