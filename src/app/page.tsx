import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <div className="max-w-3xl">
        <h1 className="text-5xl font-extrabold text-gray-800 dark:text-gray-300 mb-6">
          Get Cat 🐾
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-200 mb-10">
          Discover random cute cats to brighten your day. It has never been
          easier to fall in love with these adorable creatures!
        </p>
        <Button
          className="px-6 py-3 rounded-lg font-semibold"
          variant={"default"}
          type="button"
          asChild
        >
          <Link href="/cat">See Cats Now! 😺</Link>
        </Button>
      </div>
      <footer className="absolute bottom-12 dark:text-gray-200 text-gray-500 text-sm">
        Made with ❤️ for cat lovers.
      </footer>
    </main>
  );
}
