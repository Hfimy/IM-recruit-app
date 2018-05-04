import { GET_MSGLIST_SUCCESS, REC_MSG_SUCCESS } from './actionType';

export interface ChatState {
  msgList: Array<any>;
  unread: number;
}

const initialState = {
  msgList: [],
  unread: 0
};

export const ChatReducer = (state: ChatState = initialState, action) => {
  switch (action.type) {
    case GET_MSGLIST_SUCCESS:
      return {
        msgList: action.list,
        unread: action.list.filter(v => !v.read).length
      };
    case REC_MSG_SUCCESS:
      return {
        msgList: [...state.msgList, action.data],
        unread: state.unread + 1
      };
    // case GET_MSG_READ:
    default:
      return state;
  }
};
