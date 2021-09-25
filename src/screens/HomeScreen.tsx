import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, BackHandler } from 'react-native';
import { RootTabScreenProps } from '_types';
import MovieService from '../services';
import {
  CardItem
} from '../components';

interface IMovieData {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  id?: number;
}

const HomeScreen = ({ navigation }: RootTabScreenProps<'Home'>) => {

  const [data, setData] = useState<IMovieData[]>([]);

  const backAction = () => {
    BackHandler.exitApp()
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction)
    MovieService.getList()
      .then(response => {
        if(response.status === 200){
          const convert_data = response?.data?.Search?.map((element: IMovieData, index: number) => {
            return {
                ...element,
                id: index
            }
        })
        setData(convert_data);
        }
      })
      .catch(err => {
        if (err.response) {
            console.log('Response', err.response.data.message)
        } else if (err.request) {
            console.log('Request', err.request)
        } else {
            console.log('Error', err.message)
        }
      })

    return () => BackHandler.removeEventListener("hardwareBackPress", backAction)
  }, [])

  return (
    <ScrollView style={styles.container}>
      {data.map(({Title, Year, imdbID, Type, Poster, id}, index) => (
        <CardItem
          key={index}
          Title={Title}
          Year={Year}
          imdbID={imdbID}
          Type={Type}
          Poster={Poster}
          onPress={() => 
            navigation.navigate('Detail', {
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

export default HomeScreen
