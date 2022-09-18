import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import Card from './Card';

const styles = StyleSheet.create({
  titleWrapper: {
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
});

export default function List({title, content}) {
  const renderItem = ({item}) => <Text>aaa</Text>;

  return (
    <>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View>
        <FlatList
          data={content}
          renderItem={({item}) => <Card movie={item} />}
          horizontal
        />
      </View>
    </>
  );
}
