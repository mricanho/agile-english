import { SET_LECTURES } from '../actions/types';

const initialState = {
  loading: true,
  lectures: [],
};

const lectureReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LECTURES:
      return {
        loading: false,
        lectures: action.payload,
      };
    default:
      return state;
  }
};

export default lectureReducer;
