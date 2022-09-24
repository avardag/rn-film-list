import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
});

export default function Error({errorLine1, errorLine2}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{errorLine1}</Text>
      <Text style={styles.text}>{errorLine2}</Text>
    </View>
  );
}

Error.defaultProps = {
  errorLine1: 'Oops, something went wrong',
  errorLine2: 'Could not load movies',
};
