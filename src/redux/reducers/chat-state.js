import {
    GET_CHAT_CONVERSATION_REQUEST,
    GET_CHAT_CONVERSATION_SUCCESS,
    GET_CHAT_CONVERSATION_FAILED,
    GET_USER_CHAT_LIST_REQUEST,
    GET_USER_CHAT_LIST_SUCCESS,
    GET_USER_CHAT_LIST_FAIL
} from '../actions/types';

const initialState = {
    isLoadingConversation: false,
    conversation: [],
    loadingChatList: false,
    userChatList: []
};

export default function (state = initialState, action) {
    switch (action.type) {

        //User's Chat List
        case GET_USER_CHAT_LIST_REQUEST:
            return {
                ...state,
                loadingChatList: true
            };

        case GET_USER_CHAT_LIST_SUCCESS:
            console.log("User Chat List Fetched...", action.payload)
            return {
                ...state,
                userChatList: action.payload,
                loadingChatList: false
            };

        case GET_USER_CHAT_LIST_FAIL:
            return {
                ...state,
                loadingChatList: false
            };

        //Get Conversation
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
