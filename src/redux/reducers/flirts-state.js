import {
    GET_FLIRTS_REQUEST,
    GET_FLIRTS_SUCCESS,
    GET_FLIRTS_FAILED,
} from '../actions/types';

const initialState = {
    flirtsLoading: false,
    flirtsData: [
        { moderator_id: 1, is_online: false, name: 'Elley Johnson', image_url: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', is_super_flirt: true },
        { moderator_id: 2, is_online: true, name: 'Scarlet Whistely', image_url: null, is_super_flirt: false },
        { moderator_id: 3, is_online: false, name: 'Sophia Root', image_url: null, is_super_flirt: false },
        { moderator_id: 4, is_online: false, name: 'Elley Johnson', image_url: null, is_super_flirt: false },
        { moderator_id: 5, is_online: true, name: 'Elley Johnson', image_url: null, is_super_flirt: false },
        { moderator_id: 6, is_online: false, name: 'Elley Johnson', image_url: null, is_super_flirt: false },
        { moderator_id: 7, is_online: true, name: 'Elley Johnson', image_url: null, is_super_flirt: false },
    ]
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_FLIRTS_REQUEST:
            return {
                ...state,
                flirtsLoading: true
            };

        case GET_FLIRTS_SUCCESS:
            return {
                ...state,
                flirtsLoading: false
            }

        case GET_FLIRTS_FAILED:
            return {
                ...state,
                flirtsLoading: false
            };

        default:
            return state;
    }
}
