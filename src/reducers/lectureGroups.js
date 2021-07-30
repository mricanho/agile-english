import { SET_LECTURE_GROUPS } from '../actions/types';

const initialState = {
  loading: true,
  lectureGroups: [],
};

const lectureGroupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LECTURE_GROUPS:
      return {
        loading: false,
        lectureGroups: action.payload,
      };
    default:
      return state;
  }
};

export default lectureGroupsReducer;
