import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';
import {getMovies} from '../services/api';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';

export const imageBaseUri = 'https://image.tmdb.org/t/p/w500';
const dimensions = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderDotStyle: {
    display: 'none',
  },
});
export default function Home() {
  const [popularMovies, setPopularMovies] = useState(null);
  const [moviesImages, setMoviesImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMovies('upcoming')
      .then(movies => {
        const images = movies.map(movie => imageBaseUri + movie.poster_path);
        setMoviesImages(images);
      })
      .catch(err => setError(err));
    getMovies('popular')
      .then(movies => setPopularMovies(movies))
      .catch(err => setError(err));
  }, []);

  return (
    <>
      <View style={styles.container}>
        <SliderBox
          images={moviesImages}
          circleLoop
          pagingEnabled
          sliderBoxHeight={dimensions.height / 1.5}
          dotStyle={styles.sliderDotStyle}
          onCurrentImagePressed={index => console.log(`image ${index} pressed`)}
        />
      </View>
      <View style={styles.container}>
        <List title="Popular Films" content={popularMovies} />
      </View>
    </>
  );
}
