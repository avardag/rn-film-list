import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {getMovies, getFamilyMovies} from '../services/api';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';
import Error from '../components/Error';

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
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [familyMovies, setFamilyMovies] = useState([]);
  const [moviesImages, setMoviesImages] = useState([]);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const getInitialDataFromApi = () => {
    return Promise.all([
      getMovies('upcoming'),
      getMovies('popular'),
      getMovies('popular', 'tv'),
      getFamilyMovies(),
    ]);
  };

  useEffect(() => {
    getInitialDataFromApi()
      .then(([upcoming, popularMov, popularT, familyMov]) => {
        const images = upcoming.map(movie => imageBaseUri + movie.poster_path);
        setMoviesImages(images);
        setPopularMovies(popularMov);
        setPopularTV(popularT);
        setFamilyMovies(familyMov);
        setLoaded(true);
      })
      .catch(err => setError(err));
  }, []);

  return (
    <>
      {loaded && !error && (
        <ScrollView>
          {moviesImages.length > 0 && (
            <View style={styles.container}>
              <SliderBox
                images={moviesImages}
                circleLoop
                pagingEnabled
                sliderBoxHeight={dimensions.height / 1.5}
                dotStyle={styles.sliderDotStyle}
              />
            </View>
          )}

          {popularMovies.length > 0 && (
            <View style={styles.container}>
              <List title="Popular Films" content={popularMovies} />
            </View>
          )}

          {popularTV.length > 0 && (
            <View style={styles.container}>
              <List title="Popular TV Shows" content={popularTV} />
            </View>
          )}

          {familyMovies.length > 0 && (
            <View style={styles.container}>
              <List title="Family Movies" content={familyMovies} />
            </View>
          )}
        </ScrollView>
      )}
      {!loaded && !error && <ActivityIndicator size="large" />}
      {error && (
        <Error errorLine1="Error happened" errorLine2="Failed to load films" />
      )}
    </>
  );
}
