import { IMovie } from '_types';

interface IPayload {
    type: string;
    payload: IMovie[]
}

let initialState = {
    favorite: []
}

const station = (state = initialState, action: IPayload) => {
    switch (action.type) {
        case 'SET_FAVORITE':
          return {
            ...state,
            favorite: action.payload,
          };
        default:
          return state;
    }
};

export default station;