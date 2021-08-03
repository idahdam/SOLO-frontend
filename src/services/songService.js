import { gatewayHelper } from "../utils";

async function getAllSong() {
  const body = {};
  const response = await gatewayHelper.http("GET", "song", body);
  return response;
}

async function getReviewsSongById(id) {
  const body = {};
  const response = await gatewayHelper.http(
    "GET",
    "song/" + id + "/reviews",
    body
  );
  return response;
}

async function getSongById(id) {
  const body = {};
  const response = await gatewayHelper.http("GET", "song/" + id, body);
  return response;
}

async function getSongByGenre(genre) {
  const body = {};
  const response = await gatewayHelper.http("GET", "song/" + genre, body);
  return response;
}

async function postSong() {
  const body = {};
  const response = await gatewayHelper.http("POST", "song", body);
  return response;
}

export const songService = {
  getAllSong,
  getSongById,
  getSongByGenre,
  getReviewsSongById,
  postSong,
};
