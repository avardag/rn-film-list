import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {getMovies} from '../services/api';

export default function Home() {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMovies('popular')
      .then(movies => setMovie(movies[0]))
      .catch(err => setError(err));
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Movie name: {movie?.original_title}</Text>
      <Text>Release date: {movie?.release_date}</Text>
      {error && <Text style={{color: 'red'}}>Server error</Text>}
    </View>
  );
}
