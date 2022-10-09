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

/**
 *
 * @param {Number} movieId
 * @returns
 */
export async function getMovieDetails(movieId) {
  console.log(
    '🚀 ~ file: api.js ~ line 33 ~ getMovieDetails ~ movieId',
    movieId,
  );
  try {
    const resp = await axios.get(
      `${apiUrl}/movie/${movieId}?api_key=${REACT_APP_API_KEY}`,
    );
    return resp.data;
  } catch (error) {
    console.log('🚀 ~ file: api.js ~ line 43 ~ getMovieDetails ~ error', error);
  }
}
