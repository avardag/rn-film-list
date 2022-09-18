import axios from 'axios';
import {REACT_APP_API_KEY} from '@env';

const apiUrl = 'https://api.themoviedb.org/3';

/**
 *
 * @param {String} category - ex:popular, family, upcoming, tv
 * @returns
 */
export async function getMovies(category) {
  const resp = await axios.get(
    `${apiUrl}/movie/${category}?api_key=${REACT_APP_API_KEY}`,
  );
  return resp.data.results;
}
