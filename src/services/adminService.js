import { gatewayHelper } from "../utils";

async function updateArtistById(id) {
  const body = {};
  const response = await gatewayHelper.http("PUT", "artist/" + id, body);
  return response;
}

async function deleteArtistById(id) {
  const body = {};
  const response = await gatewayHelper.http("DELETE", "artist/" + id, body);
  return response;
}

async function updateReviewById(id) {
  const body = {};
  const response = await gatewayHelper.http("PUT", "review/" + id, body);
  return response;
}

async function deleteReviewById(id) {
  const body = {};
  const response = await gatewayHelper.http("DELETE", "review/" + id, body);
  return response;
}

async function updateSongById(id) {
  const body = {};
  const response = await gatewayHelper.http("PUT", "song/" + id, body);
  return response;
}

async function deleteSongById(id) {
  const body = {};
  const response = await gatewayHelper.http("DELETE", "song/" + id, body);
  return response;
}

export const adminService = {
  updateArtistById,
  deleteArtistById,
  updateReviewById,
  deleteReviewById,
  updateSongById,
  deleteSongById,
};
