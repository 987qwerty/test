import React from 'react';

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-[#D9D9D9] text-black p-5  rounded-lg w-full md:w-90 md:h-100 overflow-auto ">
      <h3>Отзыв {review.id}</h3>
      <p dangerouslySetInnerHTML={{ __html: review.text }}></p>
    </div>
  );
};

export default ReviewCard;