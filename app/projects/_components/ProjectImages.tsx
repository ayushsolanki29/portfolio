"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProjectImages = ({ images }: { images: any }) => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
    >
      <CarouselContent>
        {images.map((image: any, index: number) => (
          <CarouselItem
            key={index}
            className="flex items-center bg-purple-300 justify-center"
          >
            <img
              src={image.imageUrl}
              className="object-scale-down h-96 w-auto"
              alt={image.imageUrl}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ProjectImages;
