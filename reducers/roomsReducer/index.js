import ROOMS_TYPE from 'constant/roomsTypes';

const initialState = {
  messageEditName: '',
  error: null
};

const RoomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROOMS_TYPE.EDIT_ROOM_NAME_SUCCESS: {
      return { ...state, messageEditName: action.payload };
    }
    case 'DEFAULT_ROOMS_ACTION': {
      return {
        ...state,
        messageEditName: '',
        error: null
      };
    }
    default:
      return { ...state };
  }
};

export default RoomsReducer;