import { useState, useEffect } from "react";

type ScreenSize = 1 | 0 | -1;

export const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width > 1000) {
        setScreenSize(1);
      } else if (width > 700) {
        setScreenSize(0);
      } else {
        setScreenSize(-1);
      }
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
};

// Optional: Helper hook that returns dimensions directly
export const useResponsiveDimensions = () => {
  const screenSize = useScreenSize();

  const getDimensions = () => {
    switch (screenSize) {
      case 1:
        return "h-8 w-8";
      case 0:
        return "h-6 w-6";
      case -1:
        return "h-4 w-4";
      default:
        return "h-6 w-6";
    }
  };

  return {
    screenSize,
    dimensions: getDimensions(),
  };
};
