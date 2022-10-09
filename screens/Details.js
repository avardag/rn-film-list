import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import Error from '../components/Error';
import {getMovieDetails} from '../services/api';

import {imageBaseUri} from '../screens/Home';

const placeholderImg = require('../assets/placeholder.jpg');

const screenHeight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: screenHeight / 1.5,
  },
  movieName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default function Details({route}) {
  const {movie} = route.params;
  const [movieDetails, setMovieDetails] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    getMovieDetails(movie.id)
      .then(movieData => {
        setMovieDetails(movieData);
        setLoaded(true);
      })
      .catch(err => {
        console.log(err);
        setError(err);
        setLoaded(true);
      });
  }, [movie.id]);

  return (
    <>
      {movieDetails && loaded && !error && (
        <ScrollView>
          <Image
            style={styles.image}
            source={
              movieDetails.poster_path
                ? {uri: imageBaseUri + movieDetails.poster_path}
                : placeholderImg
            }
            resizeMode="cover"
          />
          <View style={styles.container}>
            <Text style={styles.movieName}>{movieDetails.title}</Text>
          </View>
        </ScrollView>
      )}
      {!loaded && <ActivityIndicator size="large" />}
      {error && <Error />}
    </>
  );
}
