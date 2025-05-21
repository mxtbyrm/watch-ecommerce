"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImageGalleryProps {
  images: string[];
}

const ZOOM_LEVEL = 2.5;
const ZOOM_PANE_DIMENSION = 400;
const LENS_SIZE = ZOOM_PANE_DIMENSION / ZOOM_LEVEL;

export default function ProductImageGallery({
  images,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  // Renamed state for clarity: controls visibility of both lens and zoom pane
  const [showLensAndPane, setShowLensAndPane] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mainImageDimensions, setMainImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const mainImageContainerRef = useRef<HTMLDivElement>(null);

  const displayImages =
    images?.length > 0
      ? images
      : ["https://picsum.photos/1280/720?height=800&width=800"];

  useEffect(() => {
    const imageContainer = mainImageContainerRef.current;
    if (!imageContainer) return;

    const updateDimensions = () => {
      setMainImageDimensions({
        width: imageContainer.clientWidth,
        height: imageContainer.clientHeight,
      });
    };
    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(imageContainer);
    return () => {
      if (mainImageContainerRef.current) {
        resizeObserver.unobserve(mainImageContainerRef.current);
      }
    };
  }, [selectedImage]);

  const handlePrevious = () => {
    setSelectedImage((prev) =>
      prev === 0 ? displayImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedImage((prev) =>
      prev === displayImages.length - 1 ? 0 : prev + 1
    );
  };

  // Helper to check if event target is a navigation button
  const isEventOverNavButton = (
    event: React.MouseEvent<HTMLDivElement>
  ): boolean => {
    const target = event.target as HTMLElement;
    return !!target.closest(
      'button[aria-label="Previous image"], button[aria-label="Next image"]'
    );
  };

  const handleMouseEnterContainer = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (
      mainImageContainerRef.current &&
      (mainImageDimensions.width === 0 || mainImageDimensions.height === 0)
    ) {
      setMainImageDimensions({
        width: mainImageContainerRef.current.clientWidth,
        height: mainImageContainerRef.current.clientHeight,
      });
    }
    if (!isEventOverNavButton(event) && mainImageDimensions.width > 0) {
      setShowLensAndPane(true);
    }
  };

  const handleMouseMoveContainer = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (mainImageContainerRef.current) {
      const rect = mainImageContainerRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setMousePosition({ x, y });

      if (isEventOverNavButton(event)) {
        if (showLensAndPane) setShowLensAndPane(false); // Hide if over button
      } else {
        if (!showLensAndPane && mainImageDimensions.width > 0)
          setShowLensAndPane(true); // Show if over image
      }
    }
  };

  const handleMouseLeaveContainer = () => {
    setShowLensAndPane(false);
  };

  let lensX = mousePosition.x - LENS_SIZE / 2;
  let lensY = mousePosition.y - LENS_SIZE / 2;

  if (mainImageDimensions.width > 0 && mainImageDimensions.height > 0) {
    lensX = Math.max(0, Math.min(lensX, mainImageDimensions.width - LENS_SIZE));
    lensY = Math.max(
      0,
      Math.min(lensY, mainImageDimensions.height - LENS_SIZE)
    );
  } else {
    lensX = 0;
    lensY = 0;
  }

  const magnifiedImageOffsetX = -lensX * ZOOM_LEVEL;
  const magnifiedImageOffsetY = -lensY * ZOOM_LEVEL;
  const magnifiedImageWidth = mainImageDimensions.width * ZOOM_LEVEL;
  const magnifiedImageHeight = mainImageDimensions.height * ZOOM_LEVEL;

  // Condition for rendering the lens and zoom pane
  const shouldRenderZoomElements =
    showLensAndPane &&
    mainImageDimensions.width > 0 &&
    mainImageDimensions.height > 0;

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
        <div className="w-full space-y-4 flex-shrink-0">
          <div
            ref={mainImageContainerRef}
            className="relative aspect-square overflow-hidden rounded-lg bg-card cursor-crosshair"
            onMouseEnter={handleMouseEnterContainer}
            onMouseLeave={handleMouseLeaveContainer}
            onMouseMove={handleMouseMoveContainer}
          >
            <Image
              src={
                displayImages[selectedImage] || "https://picsum.photos/1280/720"
              }
              alt="Product image"
              fill
              priority
              className="object-cover"
            />

            {displayImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  className="absolute left-4 top-1/2 z-20 h-9 w-9 -translate-y-1/2 rounded-full bg-card/80 text-foreground backdrop-blur-sm hover:bg-secondary"
                  aria-label="Previous image" // Used by isEventOverNavButton
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 top-1/2 z-20 h-9 w-9 -translate-y-1/2 rounded-full bg-card/80 text-foreground backdrop-blur-sm hover:bg-secondary"
                  aria-label="Next image" // Used by isEventOverNavButton
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}

            {/* Lens Element */}
            {shouldRenderZoomElements && (
              <div
                className="absolute border-2 border-primary bg-white/30 pointer-events-none z-10"
                style={{
                  width: `${LENS_SIZE}px`,
                  height: `${LENS_SIZE}px`,
                  top: `${lensY}px`,
                  left: `${lensX}px`,
                }}
              />
            )}
          </div>

          {displayImages.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {displayImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-md transition-all duration-200 ${
                    selectedImage === index
                      ? "ring-2 ring-primary"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`Select image ${index + 1}`}
                >
                  <Image
                    src={image || "https://picsum.photos/1280/720"}
                    alt={`Product thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Zoom Pane */}
        {shouldRenderZoomElements && (
          <div
            className="hidden md:block absolute border border-border bg-background shadow-xl rounded-lg overflow-hidden pointer-events-none"
            style={{
              top: `${mainImageContainerRef.current?.offsetTop ?? 0}px`,
              left: `${
                (mainImageContainerRef.current?.offsetLeft ?? 0) +
                (mainImageContainerRef.current?.offsetWidth ?? 0) +
                16
              }px`,
              width: `${ZOOM_PANE_DIMENSION}px`,
              height: `${ZOOM_PANE_DIMENSION}px`,
              zIndex: 30,
            }}
            aria-hidden="true"
          >
            <Image
              src={
                displayImages[selectedImage] || "https://picsum.photos/1280/720"
              }
              alt=""
              className="absolute object-cover"
              style={{
                top: `${magnifiedImageOffsetY}px`,
                left: `${magnifiedImageOffsetX}px`,
                width: `${magnifiedImageWidth}px`,
                height: `${magnifiedImageHeight}px`,
                maxWidth: "none",
              }}
              width={Math.max(1, magnifiedImageWidth)}
              height={Math.max(1, magnifiedImageHeight)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
