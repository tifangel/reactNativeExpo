import { IMovie } from '_types';

export const setFavorite = (data: IMovie[]) => {
    return {
      type: 'SET_FAVORITE',
      payload: data,
    };
};