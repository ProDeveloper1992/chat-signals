import {
  GET_FLIRTS_REQUEST,
  GET_FLIRTS_SUCCESS,
  GET_FLIRTS_FAILED,
} from '../actions/types';

const initialState = {
  flirtsLoading: false,
  flirtsList: [],
  flirtsData: [
    {
      moderator_id: 1,
      is_online: false,
      name: 'Loria Rae',
      image_url:
        'https://i.pinimg.com/736x/13/67/b3/1367b38982223d2c570f6b8d5d9cc2cc.jpg',
      is_super_flirt: true,
      moderator_photos: [
        {
          image:
            'https://i.pinimg.com/736x/13/67/b3/1367b38982223d2c570f6b8d5d9cc2cc.jpg',
        },
        {
          image: 'https://www.marieclaire.com.au/media/43584/heidi-klum.jpg',
        },
      ],
    },
    {
      moderator_id: 2,
      is_online: true,
      name: 'Sheila Gomez',
      image_url:
        'https://redhot-society.com/wp-content/uploads/2016/12/A4Q7980a.jpg',
      is_super_flirt: false,
      moderator_photos: [
        {
          image:
            'https://i.pinimg.com/736x/13/67/b3/1367b38982223d2c570f6b8d5d9cc2cc.jpg',
        },
        {
          image: 'https://www.marieclaire.com.au/media/43584/heidi-klum.jpg',
        },
      ],
    },
    {
      moderator_id: 3,
      is_online: false,
      name: 'Marie Claire',
      image_url: 'https://www.marieclaire.com.au/media/43584/heidi-klum.jpg',
      is_super_flirt: false,
      moderator_photos: [
        {
          image:
            'https://i.pinimg.com/736x/13/67/b3/1367b38982223d2c570f6b8d5d9cc2cc.jpg',
        },
        {
          image: 'https://www.marieclaire.com.au/media/43584/heidi-klum.jpg',
        },
      ],
    },
    {
      moderator_id: 4,
      is_online: false,
      name: 'Esther Heesch',
      image_url:
        'https://i.pinimg.com/originals/09/bf/ed/09bfed066c665bef40ee1b67404de9a1.jpg',
      is_super_flirt: false,
      moderator_photos: [
        {
          image:
            'https://i.pinimg.com/736x/13/67/b3/1367b38982223d2c570f6b8d5d9cc2cc.jpg',
        },
        {
          image: 'https://www.marieclaire.com.au/media/43584/heidi-klum.jpg',
        },
      ],
    },
    {
      moderator_id: 5,
      is_online: true,
      name: 'Ellisa Backer',
      image_url:
        'https://suburbanmen.com/wp-content/uploads/2019/10/instagram-crush-elisa-becker-20191007-1002.jpg',
      is_super_flirt: true,
      moderator_photos: [
        {
          image:
            'https://i.pinimg.com/736x/13/67/b3/1367b38982223d2c570f6b8d5d9cc2cc.jpg',
        },
        {
          image: 'https://www.marieclaire.com.au/media/43584/heidi-klum.jpg',
        },
      ],
    },
    {
      moderator_id: 6,
      is_online: false,
      name: 'Ailsa Rourke',
      image_url:
        'https://i.pinimg.com/originals/ee/15/9c/ee159cef6473505cdb56c6f43664fea8.jpg',
      is_super_flirt: false,
      moderator_photos: [
        {
          image:
            'https://i.pinimg.com/736x/13/67/b3/1367b38982223d2c570f6b8d5d9cc2cc.jpg',
        },
        {
          image: 'https://www.marieclaire.com.au/media/43584/heidi-klum.jpg',
        },
      ],
    },
    {
      moderator_id: 7,
      is_online: true,
      name: 'Lorena Rae',
      image_url:
        'https://i.pinimg.com/originals/d3/87/e8/d387e8bd1849759b6e94d18a19232b1f.jpg',
      is_super_flirt: false,
      moderator_photos: [
        {
          image:
            'https://i.pinimg.com/736x/13/67/b3/1367b38982223d2c570f6b8d5d9cc2cc.jpg',
        },
        {
          image: 'https://www.marieclaire.com.au/media/43584/heidi-klum.jpg',
        },
      ],
    },
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FLIRTS_REQUEST:
      return {
        ...state,
        flirtsLoading: true,
      };

    case GET_FLIRTS_SUCCESS:
      return {
        ...state,
        flirtsLoading: false,
        flirtsList: action.payload,
      };

    case GET_FLIRTS_FAILED:
      return {
        ...state,
        flirtsLoading: false,
      };

    default:
      return state;
  }
}
