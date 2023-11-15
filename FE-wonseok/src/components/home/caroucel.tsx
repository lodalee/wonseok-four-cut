import { CarouselWrapper, CarouselSlide, CarouselItem } from "@/style/main/home";
import { useEffect, useRef } from "react";

interface CaroucelProp {
  images: string[];
}
const MyCarousel: React.FC<CaroucelProp> = (props) => {
  const { images } = props;
  const slideRef = useRef<HTMLDivElement>(null);
  let slideIndex = 1;
  const slideTo = (idx: number, instant = false) => {
    const slide = slideRef.current!;
    if (instant) {
      slide.style.transition = "none";
    }
    slide.style.transform = `translateX(-${idx * 50}%)`;
    if (instant) {
      slide.getBoundingClientRect();
      slide.style.transition = "transform 0.5s ease-in-out";
    }
  };

  const nextSlide = () => {
    slideIndex += 1;
    if (slideIndex > images.length) {
      slideTo(slideIndex, false);
      setTimeout(() => {
        slideTo(1, true);
      }, 500);
      slideIndex = 1;
    } else {
      slideTo(slideIndex);
    }
  };

  useEffect(() => {
    slideTo(slideIndex);
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <CarouselWrapper>
        <CarouselSlide ref={slideRef}>
          <CarouselItem>
            <img
              src={images[images.length - 1]}
              alt={`carousel_item_${images.length - 1}`}
              style={{ width: "100%" }}
            />
          </CarouselItem>
          {images.map((image, idx) => (
            <CarouselItem key={idx}>
              <img
                src={image}
                alt={`carousel_item_${idx}`}
                style={{ width: "100%", height: "100%" }}
              />
            </CarouselItem>
          ))}
          <CarouselItem>
            <img src={images[0]} alt={`carousel_item_0`} style={{ width: "100%" }} />
          </CarouselItem>
        </CarouselSlide>
      </CarouselWrapper>
    </>
  );
};

export default MyCarousel;
