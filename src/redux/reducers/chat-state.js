import {
    GET_CHAT_CONVERSATION_REQUEST,
    GET_CHAT_CONVERSATION_SUCCESS,
    GET_CHAT_CONVERSATION_FAILED
} from '../actions/types';

const initialState = {
    isLoadingConversation: false,
    conversation: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CHAT_CONVERSATION_REQUEST:
            return {
                ...state,
                isLoadingConversation: true,
            };

        case GET_CHAT_CONVERSATION_SUCCESS:
            console.log("GET_CHAT_CONVERSATION_SUCCESS", action.payload)
            return {
                ...state,
                conversation: action.payload,
                isLoadingConversation: false,
            };

        case GET_CHAT_CONVERSATION_FAILED:
            return {
                ...state,
                isLoadingConversation: false,
            };

        default:
            return state;
    }
}
