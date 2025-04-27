import React, { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation, Autoplay, EffectFade, EffectCards } from "swiper";
// import type { SwiperOptions } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";

interface CarouselProps {
  spaceBetween?: number;
  slidesPerView?: number;
  onSlideChange?: (swiper: any) => void;
  onSwiper?: (swiper: any) => void;
  children?: ReactNode;
  // pagination?: SwiperOptions["pagination"];
  // className?: string;
  // navigation?: SwiperOptions["navigation"];
  // autoplay?: SwiperOptions["autoplay"];
  effect?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  spaceBetween = 20,
  slidesPerView = 1,
  onSlideChange = () => {},
  onSwiper,
  children,
  // pagination,
  // className = "main-caro",
  // navigation,
  // autoplay,
  effect,
}) => {
  return (
    <div>
      <Swiper
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        onSlideChange={onSlideChange}
        onSwiper={onSwiper}
        // modules={[Pagination, Navigation, Autoplay, EffectFade, EffectCards]}
        // pagination={pagination}
        // navigation={navigation}
        // className={className}
        // autoplay={autoplay}
        effect={effect}
      >
        {children}
      </Swiper>
    </div>
  );
};

export default Carousel;
