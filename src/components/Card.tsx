import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, GestureResponderEvent, Image, TouchableHighlight } from 'react-native';
import { RootTabScreenProps } from '_types';
import MovieService from '_services';

interface IMovieData {
  Title: string;
  Year: string;
  imdbID?: string;
  Type?: string;
  Poster: string;
  onPress: (event: GestureResponderEvent) => void;
}

const CardItem: React.FC<IMovieData> = ({Title, Year, imdbID, Type, Poster, onPress}) => {

  return (
    <TouchableHighlight underlayColor="white" onPress={onPress}>
    <View style={styles.container}>
        <Image
            source={{ uri: Poster }}
            style={{width: '100%', height: 250}}
        />
        <View style={styles.desc}>
            <Text style={styles.title}>{Title} ({Year})</Text>
        </View>
    </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 7.5
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  desc: {
    width: '100%',
    borderColor: '#000',
    borderWidth: 1,
    padding: 10
  }
});

export default CardItem
