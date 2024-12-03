"use client";
import { Button } from "@/components/ui/button";
import { Loader2, PawPrintIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import useScratchCanvas from "@/hooks/useScratchCanvas";

export default function Page() {
  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  const { resetCanvas } = useScratchCanvas({
    width: 250,
    height: 350,
    canvasRef,
    colors: ["#ffffff", "#000000"],
    textOptions: {
      content: "Scratch Me!",
      font: "32px system-ui",
      color: "#f2f2f2",
      center: true,
    },
    canvasOptions: { shouldAnimateClear: true },
  });
  const { isError, isFetching, data, refetch } = useQuery({
    queryKey: ["meow-fact"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const res = await fetch("api/random-meow-fact");
      const { meowFact } = await res.json();
      return meowFact;
    },
  });

  function getRandowMeowFact() {
    try {
      resetCanvas();
      refetch();
    } catch (err) {
      resetCanvas()
      console.error(err);
    }
  }


  return (
    <main className="flex items-center justify-center h-screen w-screen flex-col ">
      <Card
        className="w-[250px] h-[350px] flex items-center justify-center flex-col mb-4 relative z-20"
      >
        <CardHeader className="">
          <CardTitle>Your meow fact</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 justify-center items-center w-full overflow-y-auto">
          <p className="font-sans font-medium overflow-y-auto max-h-full show-scroll leading-relaxed tracking-wide">
            {data}
          </p>
        </CardContent>
        <canvas
          className="absolute top-0 start-0"
          style={{
            cursor: isFetching ? "not-allowed" : "auto",
            pointerEvents: isFetching ? "none" : "auto",
          }}
          ref={canvasRef}
          id="scratch"
          width="250"
          height="350"
        ></canvas>
      </Card>
      <Button
        className="text-md"
        onClick={getRandowMeowFact}
        disabled={isFetching}
        title="Get a meow fact!"
      >
        {isFetching ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span className="text-">
              You&apos;re about to know more about cats!!
            </span>
          </>
        ) : (
          <>
            Get your meow fact! <PawPrintIcon className="ml-4" />
          </>
        )}
      </Button>
      <small style={{display: isError ? "block" : "none"}}>There&apos;s an error, please try again! =]</small>
    </main>
  );
}
