import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import { RootTabScreenProps, IMovie } from '_types';
import {
  CardItem
} from '../components';

interface RootState {
  station: { 
    favorite: IMovie[]; 
  }; 
}

const mapState = (state: RootState) => ({
  favorite: state.station.favorite
})

const connector = connect(mapState)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & RootTabScreenProps<'Favorite'>

const FavoriteScreen = (props: Props) => {

  const [r, reFetch] = useState(false)
  const [data, setData] = useState<IMovie[]>(props.favorite);

  useEffect(() => {
    console.log(props.favorite)
    setData(props.favorite)
  }, [props.favorite, r])

  useEffect(() => {
    props.navigation.addListener('focus', () => {
        reFetch(!r)
        console.log('Refreshed!');
    });
  }, [props.navigation]);

  return (
    <ScrollView style={styles.container}>
      {data.map(({Title, Year, Poster, id}, index) => (
        <CardItem
          key={index}
          Title={Title}
          Year={Year}
          Poster={Poster}
          onPress={() => 
            props.navigation.navigate('Detail', {
              title: Title,
              id: id || 0
            })
          }
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default connector(FavoriteScreen)
