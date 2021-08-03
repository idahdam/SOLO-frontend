import { gatewayHelper } from "../utils";

async function getAllArtist() {
  const body = {};
  const response = await gatewayHelper.http("GET", "artist", body);
  return response;
}

async function getAllArtistWithSongs(id) {
  const body = {};
  const response = await gatewayHelper.http("GET", "artist/" + id, body);
  return response;
}

async function postArtist() {
  const body = {};
  const response = await gatewayHelper.http("POST", "artist", body);
  return response;
}

export const artistService = {
  getAllArtist,
  getAllArtistWithSongs,
  postArtist,
};
