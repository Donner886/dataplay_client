import { getPredictedDataLists, getConnectionDataInfo, multiDimensionAnalysis } from '@/services/dataset';
import convertDataset from '@/utils/dataset';
import { isPascalCased } from 'tslint/lib/utils';

export default {
  namespace: 'analysis',

  state: {
    datasetsList: [], // get the datasets to be analysis
    selectedDataset: '',
    selectedDatasetProperties: { // This dictionary container the columns name, value type, value range accordingly.
    },// NOTE: Those properties are extracted from specified date range
    // So when selected one dataset, there will be a trigger to update 'selectedDatesetProperties'
    conditions: {
      dataset: '',
      dataRange: [],
      filters: [],
      groups: [],
      metric: [],
    },


    querySet: [],

  },


  effects: {
    * fetchAll(payload, { call, put }) {
      const response = yield call(getPredictedDataLists, payload);
      yield put({
        type: 'updateDatasetList',
        payload: response.result,
      });

      yield put({
        type:'initialState'
      })
    },
    * getDataSetInfo(payload, { call, put }) {
      const response = yield call(getConnectionDataInfo, payload);
      console.log(response);
      yield put({
        type: 'updateDatasetDesciption',
        payload: response.result,
      });


      yield put({
        type: 'updateSelectedDataset',
        payload: response.dataset,
      });


    },

    * multiDimensionAnalysis(payload, { call, put }) {
      const response = yield call(multiDimensionAnalysis, payload);
      yield put(
        {
          type: 'updateCondition',
          payload: payload.payload,
        },
      );

      yield put({
        type: 'updateQuerySet',
        payload: response.message,
      });

    },


  },

  reducers: {

    initialState(state,action){
      return {
        ...state,
        selectedDataset: '',
        selectedDatasetProperties: {},
      conditions: {
          dataset: '',
          dataRange: [],
          filters: [],
          groups: [],
          metric: [],
      },
      querySet: [],
      }

    },
    updateDatasetList(state, action) {
      return {
        ...state,
        datasetsList: action.payload,
      };
    },

    updateDatasetDesciption(state, action) {
      return {
        ...state,
        selectedDatasetProperties: action.payload,
      };
    },

    updateSelectedDataset(state, action) {
      return {
        ...state,
        selectedDataset: action.payload,
      }
    },

    updateConditionDataSet(state,action){
      state.conditions.dataset = action.payload.payload
      return {
        ...state
      }
    },

    updateCondition(state, action) {
      return {
        ...state,
        conditions: action.payload,
      };
    },

    updateQuerySet(state, action) {
      return {
        ...state,
        querySet: action.payload,
      };
    },

  },

};
