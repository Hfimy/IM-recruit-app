import { GET_MSGLIST_SUCCESS, REC_MSG_SUCCESS } from './actionType';
import { ResponseData, getMsgList } from 'src/api';

import io from 'socket.io-client';
const socket = io('http://localhost:3002');

interface GetMsgListSuccess {
  type: GET_MSGLIST_SUCCESS;
  list: Array<object>;
}

interface RecMsgSuccess {
  type: REC_MSG_SUCCESS;
  data: object;
}

export const getMsgListSuccess = (list: Array<object>): GetMsgListSuccess => ({
  type: GET_MSGLIST_SUCCESS,
  list
});

export const recMsgSuccess = (data: object): RecMsgSuccess => ({
  type: REC_MSG_SUCCESS,
  data
});

export const onGetMsgList = (
  fail: (msg: string, duration?: number) => void
) => {
  return dispatch => {
    getMsgList(({ code, data, msg }: ResponseData) => {
      if (code === 0) {
        dispatch(getMsgListSuccess(data));
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
  return dispatch => {
    socket.on('recMsg', data => {
      dispatch(recMsgSuccess(data));
    });
  };
};
