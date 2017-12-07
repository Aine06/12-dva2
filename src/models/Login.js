import * as loginService from '../services/login';


export default {
  namespace: 'login',
  state: {
    list: [],
  },
  reducers: {
    save(state, { payload: {data:list} }) {
    return { ...state, list };

  },
},

effects: {
*login({ payload: values }, { call, put }) {
    const { data, } = yield call(loginService.login, values);
    yield put({
      type: 'save',
      payload: {
        data
      },
    });
  }

},
};
