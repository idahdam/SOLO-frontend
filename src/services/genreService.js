import { gatewayHelper } from "../utils";

async function getAllGenres() {
  const body = {};
  const response = await gatewayHelper.http("GET", "genre", body);
  return response;
}

export const genreService = {
  getAllGenres,
};
