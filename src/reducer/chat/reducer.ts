import {
  GET_MSGLIST_SUCCESS,
  REC_MSG_SUCCESS,
  UPDATE_MSG_SUCCESS
} from './actionType';

export interface ChatState {
  msgList: Array<any>;
}

const initialState = {
  msgList: []
};

export const ChatReducer = (state: ChatState = initialState, action) => {
  switch (action.type) {
    case GET_MSGLIST_SUCCESS:
      return {
        msgList: action.list
      };
    case REC_MSG_SUCCESS:
      return {
        msgList: [...state.msgList, action.data]
      };
    case UPDATE_MSG_SUCCESS:
      return {
        msgList: state.msgList.map(item => {
          if (item.from === action.from && item.to === action.to) {
            item.read = true;
          }
          return item;
        })
      };
    default:
      return state;
  }
};
