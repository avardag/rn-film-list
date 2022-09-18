import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import {imageBaseUri} from '../screens/Home';

const placeholderImg = require('../assets/placeholder.jpg');

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
    height: 200,
  },
  image: {
    height: 200,
    width: 120,
    borderRadius: 16,
  },
  movieName: {
    position: 'absolute',
    width: 100,
    textAlign: 'center',
    alignSelf: 'center',
    bottom: 20,
  },
});
export default function Card({movie}) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        style={styles.image}
        source={
          movie.poster_path
            ? {uri: imageBaseUri + movie.poster_path}
            : placeholderImg
        }
        resizeMode="cover"
      />
      {!movie.poster_path && (
        <Text style={styles.movieName}>{movie.title}</Text>
      )}
    </TouchableOpacity>
  );
}
