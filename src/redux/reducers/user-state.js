import {GET_APP_STRINGS_REQUEST} from '../actions/types';

// import {client} from '../../helpers/api';

const initialState = {
  appStrings: {app_name: 'Chat Signal'},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_APP_STRINGS_REQUEST:
      return {
        ...state,
      };

    default:
      return state;
  }
}

// export const getCourseLeaders = (courseId, data) => (dispatch) =>
//   new Promise(function (resolve, reject) {
//     client
//       .post(`/leaderboard/${courseId}`, data)
//       .then((res) => {
//         resolve(res);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });

// const getCourseLeadersSuccess = (data) => ({
//   type: GET_APP_STRINGS_REQUEST,
//   payload: {
//     leaders: data,
//   },
// });
