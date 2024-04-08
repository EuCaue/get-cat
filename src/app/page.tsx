"use server";
import ImageContainer from "@/components/image-container";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ImageContainer />
    </main>
  );
}
