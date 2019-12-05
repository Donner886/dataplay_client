import { getModels, saveModelInfo, updateModelDeployStatus} from '@/services/config';
import { act } from 'react-dom/test-utils';

export default {
  namespace: 'config',

  state: {
    modelSets: [],
    model:{
    },
    currentStep:0
  },

  effects: {

    *fetchAll(_, { call, put }) {
      // const response = yield call(listConfigs);
      const result = yield call(getModels);
      yield put({
        type:'models',
        payload: result.result
      })
    },


    *saveModel({ payload }, { call, put }) {
      yield call(saveModelInfo, payload);
      yield put({
        type: 'updateValue',
        payload,
      });
    },

    *updateModelInfo({ payload },{ call }){
      yield call(updateModelDeployStatus,payload)
    }
  },

  reducers: {
    models(state,action){
      return {
        ...state,
        modelSets:action.payload
      }
    },

    update(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },

    updateValue(state, action) {
      const { domain, value } = action.payload;
      state[domain] = value;
      return { ...state };
    },

    forward(state) {
      const newStep = state.currentStep + 1;
      return {
        ...state,
        currentStep: newStep,
      };
    },
    backward(state) {
      const newStep = state.currentStep - 1;
      return {
        ...state,
        currentStep: newStep,
      };
    },

    initUploader(state) {
      return {
        ...state,
        currentStep: 0,
        model: {}
      };
    },

    updateModelInfoReduce(state, action) {
      return {
        ...state,
        model: { ...state.model, ...action.payload },
      };
    },


  },
};
