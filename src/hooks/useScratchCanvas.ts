import { useEffect, useRef, useCallback } from "react";

type TextOptions = {
  content: string;
  x?: number;
  y?: number;
  font?: string;
  color?: string;
  center?: boolean;
};

type CanvasOptions = {
  percentage?: number;
  duration?: number; 
  shouldAnimateClear?: boolean;
};

type ScratchCanvasParams = {
  width: number;
  height: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  colors: Array<string>;
  textOptions?: TextOptions;
  canvasOptions?: CanvasOptions;
};

const useScratchCanvas = ({
  width,
  height,
  canvasRef,
  colors,
  textOptions,
  canvasOptions,
}: ScratchCanvasParams) => {
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const initCanvas = useCallback(() => {
    if (canvasRef.current) {
      canvasRef.current.style.setProperty("pointer-events", "auto");
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        // Reset the canvas dimensions
        canvasRef.current.width = width;
        canvasRef.current.height = height;

        // Clear any existing drawing
        ctx.clearRect(0, 0, width, height);

        const gradient = ctx.createLinearGradient(0, 0, width, height);
        colors.forEach((color, index) => {
          gradient.addColorStop(index, color);
        });
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        if (textOptions) {
          const font = textOptions.font || "16px Arial";
          const color = textOptions.color || "#000";
          ctx.font = font;
          ctx.fillStyle = color;
          ctx.textBaseline = "middle";

          let x = textOptions.x || 0;
          let y = textOptions.y || 0;

          if (textOptions.center) {
            // If "center" is true, calculate the center position
            const textWidth = ctx.measureText(textOptions.content).width;
            x = (width - textWidth) / 2; // Center horizontally
            y = height / 2; // Center vertically
          }

          ctx.fillText(textOptions.content, x, y);
        }
        // Store context reference for drawing operations
        ctxRef.current = ctx;
      }
    }
  }, [canvasRef, width, height]);

  const scratch = (x: number, y: number) => {
    if (ctxRef.current) {
      ctxRef.current.globalCompositeOperation = "destination-out";
      ctxRef.current.beginPath();
      ctxRef.current.arc(x, y, 24, 0, 2 * Math.PI);
      ctxRef.current.fill();
    }
  };

  const getMouseCoordinates = (event: MouseEvent | TouchEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    let x: number, y: number;
    if (event instanceof MouseEvent) {
      x = event.pageX - rect.left;
      y = event.pageY - rect.top;
    } else if (event instanceof TouchEvent) {
      x = event.touches[0].pageX - rect.left;
      y = event.touches[0].pageY - rect.top;
    } else {
      throw new Error("Unsupported event type");
    }
    return { x, y };
  };
  function getCanvasFillPercentage(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");

    if (ctx) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let filledPixels = 0;
      let totalPixels = data.length / 4; // Each pixel has 4 values (R, G, B, A)

      for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3]; // Alpha channel (opacity)

        if (alpha > 0) {
          filledPixels++;
        }
      }

      // Calculate the fill percentage
      const fillPercentage = (filledPixels / totalPixels) * 100;
      return fillPercentage;
    }
    return -1;
  }
  function animateCanvasClear(
    canvas: HTMLCanvasElement,
    duration: number = 300,
  ) {
    const ctx = canvas.getContext("2d");
    const totalHeight = canvas.height;
    let currentHeight = 0;

    const startTime = Date.now();

    function clearAnimation() {
      const elapsedTime = Date.now() - startTime;
      currentHeight = (elapsedTime / duration) * totalHeight;

      ctx!.clearRect(0, 0, canvas.width, currentHeight);

      if (elapsedTime < duration) {
        requestAnimationFrame(clearAnimation);
      } else {
        ctx!.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    clearAnimation();
  }

  function handleClearCanvas(canvas: HTMLCanvasElement) {
    const percentage = getCanvasFillPercentage(canvas);
    if (percentage <= 0) {
      canvas.style.setProperty("pointer-events", "none");
    }
    if (canvasOptions && canvasOptions.shouldAnimateClear) {
      if (percentage <= (canvasOptions.percentage || 60)) {
        animateCanvasClear(canvas, canvasOptions.duration || 300);
      }
    }
  }

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    let isDragging = false;

    const handleMouseDown = (event: MouseEvent | TouchEvent) => {
      isDragging = true;
      const { x, y } = getMouseCoordinates(event);
      scratch(x, y);
      handleClearCanvas(canvas);
    };

    const handleMouseMove = (event: MouseEvent | TouchEvent) => {
      if (isDragging) {
        event.preventDefault();
        const { x, y } = getMouseCoordinates(event);
        scratch(x, y);
        handleClearCanvas(canvas);
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      handleClearCanvas(canvas);
    };

    const handleMouseLeave = () => {
      isDragging = false;
      handleClearCanvas(canvas);
    };

    const isTouchDevice = "ontouchstart" in window;

    canvas.addEventListener(
      isTouchDevice ? "touchstart" : "mousedown",
      handleMouseDown,
    );
    canvas.addEventListener(
      isTouchDevice ? "touchmove" : "mousemove",
      handleMouseMove,
    );
    canvas.addEventListener(
      isTouchDevice ? "touchend" : "mouseup",
      handleMouseUp,
    );
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Initialize the canvas
    initCanvas();

    return () => {
      canvas.removeEventListener(
        isTouchDevice ? "touchstart" : "mousedown",
        handleMouseDown,
      );
      canvas.removeEventListener(
        isTouchDevice ? "touchmove" : "mousemove",
        handleMouseMove,
      );
      canvas.removeEventListener(
        isTouchDevice ? "touchend" : "mouseup",
        handleMouseUp,
      );
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [canvasRef, initCanvas]);

  return { resetCanvas: initCanvas };
};

export default useScratchCanvas;
