import {
  GET_BOOKMARKS_REQUEST,
  GET_BOOKMARKS_SUCCESS,
  GET_BOOKMARKS_FAILED,
} from '../actions/types';

const initialState = {
  bookmarksLoading: false,
  bookmarksList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BOOKMARKS_REQUEST:
      return {
        ...state,
        bookmarksLoading: true,
      };

    case GET_BOOKMARKS_SUCCESS:
      return {
        ...state,
        bookmarksLoading: false,
        bookmarksList: action.payload
      };

    case GET_BOOKMARKS_FAILED:
      return {
        ...state,
        bookmarksLoading: false,
      };

    default:
      return state;
  }
}
