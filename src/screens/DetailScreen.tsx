import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableHighlight, ToastAndroid } from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import { RootStackScreenProps, IMovie } from '_types';
import MovieService from '../services';
import {
  setFavorite
} from '../state/actions/favorite';
import layout from '../themes/Layout'

interface IMovieData {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: string;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
}

interface RootState {
  station: { 
    favorite: IMovie[]; 
  }; 
}

const mapState = (state: RootState) => ({
  favorite: state.station.favorite
})

const mapDispatch = {
  setFavorite: (data: IMovie[]) => setFavorite(data)
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & RootStackScreenProps<'Detail'>

const DetailScreen = (props: Props) => {
  const route = props.route

  const [isFavorite, setIsFavorite] = useState(props.favorite[route.params.id] !== undefined)
  const [r, reFetch] = useState(false);
  const [data, setData] = useState<IMovieData>()
  const [dataFavorite, setDataFavorite] = useState<IMovie[]>(props.favorite)

  useEffect(() => {
    MovieService.getDetail(route.params.title)
    .then(response => {
      if(response.status === 200){
        setData(response.data)
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
    setDataFavorite(props.favorite)
    // setIsFavorite(props.favorite[route.params.id] !== undefined)
  }, [route.params.title, props.favorite, r])

  return (
    <View style={styles.container}>
        <Image
            source={{ uri: data?.Poster }}
            style={{width: '100%', height: layout.window.height/2}}
        />
        <View style={styles.desc}>
          <Text style={[styles.title, styles.colorFont]}>{data?.Title || ''}</Text>
          <Text style={[styles.colorFont, styles.rating]}>Rating: {data?.Metascore || ''}/100</Text>
          <Text style={[styles.colorFont, styles.plot]}>{data?.Plot || ''}</Text>
        </View>
        <TouchableHighlight style={styles.containerButton} underlayColor="white" 
          onPress={() => {
            if (!isFavorite) {
              const state = dataFavorite
              state[route.params.id] = {
                id: route.params.id,
                Title: data?.Title || '',
                Poster: data?.Poster || '',
                Year: data?.Year || '',
              }
              props.setFavorite(state)
              ToastAndroid.show("Berhasil ditambahkan", ToastAndroid.SHORT);
            } else {
              const state = dataFavorite.filter((value) => value.id !== route.params.id)
              props.setFavorite(state)
              ToastAndroid.show("Berhasil dihapus", ToastAndroid.SHORT);
            }
            setIsFavorite(!isFavorite)
            reFetch(!r)
          }}
          // disabled={
          //   dataFavorite[route.params.id] !== undefined
          // }
        >
          <Text style={styles.textFavor}>{
            isFavorite
            ? 'Delete My Favorite'
            : 'Add My Favorite'
          }</Text>
        </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  desc: {
    position: 'relative',
    top: -50,
    marginHorizontal: 50,
    backgroundColor: '#000',
    padding: 30
  },
  colorFont: {
    color: '#fff',
    marginBottom: 15
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  rating: {
    fontSize: 17
  },
  plot: {
    fontSize: 20,
  },
  textFavor: {
    color: '#000',
    fontSize: 30
  },
  containerButton: {
    position: 'absolute',
    bottom: 30,
    marginHorizontal: 50,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 50,
    padding: 30,
    alignItems: 'center',
    width: '88%'
  }
});

export default connector(DetailScreen);
