import { gatewayHelper } from "../utils";

async function getAllArtist() {
  const body = {};
  const response = await gatewayHelper.http("GET", "artist", body);
  return response;
}

async function getArtistById(id) {
  const body = {};
  const response = await gatewayHelper.http("GET", "artist/" + id, body);
  return response;
}

async function getAllArtistWithSongs(id) {
  const body = {};
  const response = await gatewayHelper.http("GET", "artist/songs/" + id, body);
  return response;
}

async function postArtist(data) {
  const body = {};
  const response = await gatewayHelper.http("POST", "artist", body, data);
  return response;
}

export const artistService = {
  getArtistById,
  getAllArtist,
  getAllArtistWithSongs,
  postArtist,
};
