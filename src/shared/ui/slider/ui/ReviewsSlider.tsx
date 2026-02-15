import { type ReactNode } from 'react';
import { Swiper } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

interface SliderProps {
  children: ReactNode;
  slidesPerView?: number;
}

export function ReviewsSlider({ children, slidesPerView = 1 }: SliderProps) {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={16}
      slidesPerView={slidesPerView}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="!items-stretch"
    >
      {children}
    </Swiper>
  );
}
