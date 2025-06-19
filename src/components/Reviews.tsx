import React from 'react';
import { useGetReviewsQuery } from '../services/reviewsApi';
import ReviewCard from './ReviewCard';

const ReviewsSection = () => {
  const { data, isLoading, error } = useGetReviewsQuery();

  if (isLoading) {
    return <div className='text-center'>Загрузка отзывов...</div>;
  }

  if (error) {
    return <div className='text-center'>Ошибка при загрузке отзывов</div>;
  }

  return (
    <div className="">
      <div className="flex justify-center gap-5 m-5  p-5 flex-col md:flex-row items-center">
        {data?.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;