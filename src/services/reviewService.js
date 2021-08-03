import { gatewayHelper } from "../utils";

async function getAllReviews() {
  const body = {};
  const response = await gatewayHelper.http("GET", "review", body);
  return response;
}
async function getAllReviewsById(id) {
  const body = {};
  const response = await gatewayHelper.http("GET", "review/" + id, body);
  return response;
}
async function postReview() {
  const body = {};
  const response = await gatewayHelper.http("POST", "review", body);
  return response;
}

export const reviewService = {
  getAllReviews,
  getAllReviewsById,
  postReview,
};
