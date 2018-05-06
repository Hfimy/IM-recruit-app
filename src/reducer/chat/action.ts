import {
  GET_MSGLIST_SUCCESS,
  REC_MSG_SUCCESS,
  UPDATE_MSG_SUCCESS
} from './actionType';
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

interface UpdateMsgSuccess {
  type: UPDATE_MSG_SUCCESS;
  from: string;
  to: string;
}

export const getMsgListSuccess = (list: Array<object>): GetMsgListSuccess => ({
  type: GET_MSGLIST_SUCCESS,
  list
});

export const recMsgSuccess = (data: object): RecMsgSuccess => ({
  type: REC_MSG_SUCCESS,
  data
});

export const updateMsgSuccess = (from: string, to: string) => ({
  type: UPDATE_MSG_SUCCESS,
  from,
  to
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

export const onReadMsg = ({ from, to }) => {
  return dispatch => {
    socket.emit('readMsg', { from, to });
  };
};

export const onUpdateMsg = () => {
  return dispatch => {
    socket.on('updateMsg', ({ from, to }) => {
      dispatch(updateMsgSuccess(from, to));
    });
  };
};

export const onRecMsg = () => {
  return (dispatch, getState) => {
    socket.on('recMsg', data => {
      const _id = getState() && getState().user && getState().user._id;
      if (data.from === _id || data.to === _id) {
        dispatch(recMsgSuccess(data));
      }
    });
  };
};
