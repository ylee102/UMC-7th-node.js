import { prisma } from "../db.config.js";

export const getStoreReviewList = async (storeId, cursor) => {
  const reviews = await prisma.Review.findMany({
    select: {
      id: true,
      content: true,
      store: true,
      member: true,
    },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};

export const addReview = async (data) => {
  const created = await prisma.Review.create({
    data: data,
  });

  return created.id;
};

export const getReview = async (reviewId) => {
  const review = await prisma.Review.findFirstOrThrow({
    where: { id: reviewId },
  });

  return review;
};
