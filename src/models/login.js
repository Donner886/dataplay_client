import { routerRedux } from 'dva/router';
import { parse, stringify } from 'qs';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { getPageQuery } from '@/utils/utils'

import { authority } from '../components/Authorized/AuthorizedRoute';
import renderAuthorize from '@/components/Authorized';

export default {
  namespace: 'login',  //  model name of login

  // state of model,
  state: {
    status: undefined,
  },

  effects: { // *function is a generator function
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      // yield put({
      //   type: 'changeLoginStatus',
      //   payload: response,
      // });
      // Login successfully

      if (response.sid !== undefined) {
        // reloadAuthorized();
        const auth = response.department + "_" + response.team;
        renderAuthorize(auth)
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        // const params = parse(window.location.href.split('?')[1]);
        let { redirect } = params;
        console.log(redirect)
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
              console.log('here is redirect with #-------')
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }else{
          redirect = '/dataset/view'
        }
        yield put(routerRedux.replace(redirect));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
