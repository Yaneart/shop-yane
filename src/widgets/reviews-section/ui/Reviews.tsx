import { SwiperSlide } from 'swiper/react';
import { ReviewsSection, ReviewCard, mockReviews } from '@/shared/ui/reviews-section';
import { ReviewsSlider } from '@/shared/ui/slider';

export function Reviews() {
  return (
    <ReviewsSection id="reviews" title="Our Happy Customers">
      <ReviewsSlider>
        {mockReviews.map((review) => (
          <SwiperSlide key={review.id} className="!h-auto">
            <ReviewCard
              name={review.name}
              rating={review.rating}
              text={review.text}
            />
          </SwiperSlide>
        ))}
      </ReviewsSlider>
    </ReviewsSection>
  );
}
