import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Button from './Button';

interface ImageCarouselProps {
  images: string[];
  className?: string;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    if (images.length <= 1) return;
    
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return images.length - 1;
      if (nextIndex >= images.length) return 0;
      return nextIndex;
    });
  };

  if (!images || images.length === 0) {
    return (
      <div className={`relative w-full h-64 bg-gray-200 rounded-lg ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          No images available
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <div className="aspect-w-16 aspect-h-9 relative">
        <AnimatePresence initial={false} custom={1}>
          <motion.div
            key={currentIndex}
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full h-full"
          >
            <Image
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={currentIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
              onClick={() => paginate(-1)}
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
              onClick={() => paginate(1)}
            >
              <ChevronRightIcon className="w-6 h-6" />
            </Button>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-white scale-125'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};