import { queryDatasets, queryDataset, deleteDataset,getService,getPredictResult,getConnectionDataInfo} from '@/services/dataset';
import convertDataset from '@/utils/dataset';
import { act } from 'react-dom/test-utils';

export default {
  namespace: 'dataset',

  state: {
    list: [], // list of datasets id
    currentDataset: {
      name: '',
      startTime:'',
      endTime:'',
      timeRangeColumn:''
    }, // current selected dataset
    selectedDataSetDesc: [],

    modelList: [],
    selectedModel: {},

    currentQueryResult: { dataSource: null, columns: null },

  },

  effects: {
    *fetch( payload, { call, put }) {
      const response = yield call(queryDatasets,payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchSelected({ payload }, { call, put }) {
      const response = yield call(queryDataset, payload);
      const responseWithName = { ...response, ...{ name: payload } };
      yield put({
        type: 'getDataset',
        payload: responseWithName,
      });
    },
    *getService({payload},{call,put}){
      const resopnse = yield call(getService,payload)
      const params = {
        ...payload,
        predictSetId:resopnse.result
      }
      const predict_result = yield call(getPredictResult,params)
      yield put({
        type: 'getQuery',
        payload: predict_result
      })

    },
    *deleteSelected({ payload }, { call, put }) {
      yield call(deleteDataset, payload);
      yield put({
        type: 'deleteDataset',
        payload,
      });
    },

    *getDatasetDesc({payload},{call,put}){
      const response = yield call(getConnectionDataInfo,payload)
      yield put({
        type:'updateSelectedDatasetDesc',
        payload:Object.keys(response.result)
      })

      yield put({
        type:'updateSelectedDataset',
        payload:response.dataset
      })

    }

  },


  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload.datasets,
        modelList: action.payload.models
      };
    },
    getDataset(state, action) {
      // Convert the array datamodel to object data model
      const convertedDataset = convertDataset(action.payload);
      if (action.payload.name) {
        convertedDataset.name = action.payload.name;
      }
      return {
        ...state,
        currentDataset: convertedDataset,
      };
    },
    updateSelected(state, action) {
      return {
        ...state,
        currentDataset: action.payload,
      };
    },
    updateSelectedDataset(state,action){
      return{
        ...state,
        currentDataset: {
          name: action.payload,

        }
      }
    },

    updateSelectedDateTime(state,action){
      return {
        ...state,
        currentDataset: {
          name:state.currentDataset.name,
          startTime: action.payload.startTime,
          endTime: action.payload.endTime,
          timeRangeColumn:state.currentDataset.timeRangeColumn
        }
      }
    },

    updateSelectedDateTimeColumnChange(state,action){
      return {
        ...state,
        currentDataset: {
          name:state.currentDataset.name,
          startTime: state.currentDataset.startTime,
          endTime: state.currentDataset.endTime,
          timeRangeColumn: action.payload
        }
      }
    },

    updateSelectedDatasetDesc(state,action){
      const selectDataSetDesc = action.payload
      return{
        ...state,
        selectedDataSetDesc: selectDataSetDesc
      }
    },


    updateSelectedModel(state,action){
        let selectedModel = {}
        state.modelList.forEach( item => {
          if(item.id === action.payload){
            selectedModel = item
          }
        }
      );
      return{
        ...state,
        selectedModel: selectedModel
      }
    },

    getQuery(state, action) {
      const convertedDataset = convertDataset(action.payload);

      return {
        ...state,
        currentQueryResult: convertedDataset,
        canSave: true,
      };
    },



    deleteDataset(state, action) {
      const newList = state.list.filter(function(value) {
        return value.id !== action.payload;
      });
      return {
        ...state,
        list: newList,
      };
    },
  },
};
