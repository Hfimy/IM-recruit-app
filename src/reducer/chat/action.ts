import { GET_MSGLIST_SUCCESS, REC_MSG_SUCCESS } from './actionType';
import { ResponseData, getMsgList } from 'src/api';

import io from 'socket.io-client';
const socket = io('http://localhost:3002');

interface GetMsgListSuccess {
  type: GET_MSGLIST_SUCCESS;
  list: Array<object>;
  unread: number;
}

interface RecMsgSuccess {
  type: REC_MSG_SUCCESS;
  data: object;
  unreadAdd: number;
}

export const getMsgListSuccess = (
  list: Array<object>,
  unread: number
): GetMsgListSuccess => ({
  type: GET_MSGLIST_SUCCESS,
  list,
  unread
});

export const recMsgSuccess = (
  data: object,
  unreadAdd: number
): RecMsgSuccess => ({
  type: REC_MSG_SUCCESS,
  data,
  unreadAdd
});

export const onGetMsgList = (
  fail: (msg: string, duration?: number) => void
) => {
  return (dispatch, getState) => {
    getMsgList(({ code, data, msg }: ResponseData) => {
      if (code === 0) {
        const to = getState() && getState().user && getState().user._id;
        const unread = data.filter(item => item.to === to && !item.read).length;
        dispatch(getMsgListSuccess(data, unread));
        return;
      }
      fail(msg, 1);
    });
  };
};

export const onSendMsg = ({ from, to, content }) => {
  return dispatch => {
    socket.emit('sendMsg', { from, to, content });
  };
};

export const onRecMsg = () => {
  return (dispatch, getState) => {
    socket.on('recMsg', data => {
      const _id = getState() && getState().user && getState().user._id;
      if (data.from === _id || data.to === _id) {
        let unreadAdd = 0;
        if (data.to === _id) {
          unreadAdd = 1;
        }
        dispatch(recMsgSuccess(data, unreadAdd));
      }
    });
  };
};
