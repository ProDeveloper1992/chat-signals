import {
    GET_BOOKMARKS_REQUEST,
    GET_BOOKMARKS_SUCCESS,
    GET_BOOKMARKS_FAILED,
} from '../actions/types';

const initialState = {
    bookmarksLoading: false,
    bookmarksList: [
        { moderator_id: 1, is_online: false, name: 'Loria Rae', image_url: 'https://i.pinimg.com/736x/13/67/b3/1367b38982223d2c570f6b8d5d9cc2cc.jpg', is_super_flirt: true },
        { moderator_id: 2, is_online: true, name: 'Sheila Gomez', image_url: 'https://redhot-society.com/wp-content/uploads/2016/12/A4Q7980a.jpg', is_super_flirt: false },
    ]
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_BOOKMARKS_REQUEST:
            return {
                ...state,
                bookmarksLoading: true
            };

        case GET_BOOKMARKS_SUCCESS:
            return {
                ...state,
                bookmarksLoading: false
            }

        case GET_BOOKMARKS_FAILED:
            return {
                ...state,
                bookmarksLoading: false
            };

        default:
            return state;
    }
}
