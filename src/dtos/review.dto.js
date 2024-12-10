export const responseFromReviewList = (reviews) => {
    return {
      data: reviews,
      pagination: {
        cursor: reviews.length ? reviews[reviews.length - 1].id : null,
      },
    };
  };
  
  export const bodyToReview = (body) => {
    return {
      memberId: body.memberId,
      star: body.star,
      content: body.content,
    };
  };
  
  export const responseFromReview = (review) => {
    return {
      id: review.id,
      star: review.star,
      content: review.content,
    };
  };
  