import { runDatasetQuery } from '@/services/dataset';
import convertDataset from '@/utils/dataset';
import { getModelsByDepartAndTeam } from '@/services/config';


export default {
  namespace: 'query',

  state: {
    savedQuery: {},
    currentQuery: {},
    currentQueryResult: { dataSource: null, columns: null },
    canSave: false,

    modellist: [], // list of model id
    currentModel: {}, // current selected model

  },

  effects: {
    *fetchQuery({ payload }, { call, put }) {
      const response = yield call(runDatasetQuery, payload);
      yield put({
        type: 'getQuery',
        payload: response,
      });
    },
  },

  *fetchModels({payload},{call,put}){
    const response = yield call(getModelsByDepartAndTeam,payload)
    yield put({
      type:'save',
      payload: response
    })
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        modellist: action.payload,
      };
    },

    getQuery(state, action) {
      const convertedDataset = convertDataset(action.payload);

      return {
        ...state,
        currentQueryResult: convertedDataset,
        canSave: true,
      };
    },
    addQueryResult(state, action) {
      return {
        ...state,
        savedQuery: { ...state.savedQuery, ...action.payload },
        canSave: false,
      };
    },
    deleteQuery(state, action) {
      delete state.savedQuery[action.payload];
      return {
        ...state,
      };
    },
  },
};
