import {
  GET_BOOKMARKS_REQUEST,
  GET_BOOKMARKS_SUCCESS,
  GET_BOOKMARKS_FAILED,
} from '../actions/types';

const initialState = {
  bookmarksLoading: false,
  bookmarksList: [
    {
      id: 12,
      picture:
        'http://chat-signal.com/public/storage/uploads/users/EJAJtsPfo1bvO7TnZBz5CBD50UkFNRyXGviYLvhZ.jpeg',
      username: 'chink',
      dob: '1989-02-12',
      city: 'barlin',
      postcode_area: '11744',
      country: 'de',
    },
    {
      id: 6,
      picture:
        'http://chat-signal.com/public/storage/uploads/users/c31QKwgBqgnvscP1ddCT2wGPS5h7ZKj142jSyzPe.jpeg',
      username: 'pinki',
      dob: '1989-02-12',
      city: 'barlin',
      postcode_area: '11744',
      country: 'de',
    },
  ],
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
