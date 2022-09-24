import axios from 'axios';
import {REACT_APP_API_KEY} from '@env';

const apiUrl = 'https://api.themoviedb.org/3';

/**
 *
 * @param {String} category - ex:popular, family, upcoming,
 * @param {String} platform - ex:tv, movie, tv
 * @returns
 */
export async function getMovies(category, platform = 'movie') {
  const resp = await axios.get(
    `${apiUrl}/${platform}/${category}?api_key=${REACT_APP_API_KEY}`,
  );
  return resp.data.results;
}

export async function getFamilyMovies() {
  const resp = await axios.get(
    `${apiUrl}/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=10751`,
  );

  return resp.data.results;
}
