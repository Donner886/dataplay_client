import { queryDatasets, queryDataset ,getPredictedDataLists,getConnectionDataInfo,drawWordCloud} from '@/services/dataset';
import convertDataset from '@/utils/dataset';
import { serverUri } from '@/defaultSettings';

const uri = serverUri + '/api/getfile/'

export default {
  namespace: 'tchart',

  state: {
    list: [],
    grammar: {},
    currentDataset: {
      name:'',
      sentiment:'',
      startTime:'',
      endTime:'',
      channel:'',
      appname:'',
      keywordColumn:''
    },
    selectedDataSetDesc: [],
    wordCloud:'',

    chartType: null,
    feeds: {},
    export: {
      visible: false,
      title: '',
      description: '',
    },
  },

  effects: {
    * fetchAll(payload, { call, put }) {
      const response = yield call(getPredictedDataLists, payload);
      yield put({
        type: 'updateDatasetList',
        payload: response.result,
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
    },
    *getWordCloud({payload},{call,put}){
      const response = yield call(drawWordCloud,payload)
      yield put({
        type:'updateWordCloud',
        payload:response.result
      })
    }


  },

  reducers: {

    updateWordCloud(state,action){
      return {
        ...state,
        wordCloud: uri + action.payload
      }
    },
    updateDatasetList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },

    save(state, action) {
      return {
        ...state,
        list: action.payload,
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
        currentDataset:
          {name: action.payload,
          sentiment: '',
          startTime: '',
          endTime: '',
          channel: '',
          appname:'',
          keywordColumn:''
          }
      };
    },

    updateSelectedSentiment(state,action){
      return{
        ...state,
        currentDataset:
          { name: state.currentDataset.name,
            sentiment: action.payload,
            startTime:state.currentDataset.startTime,
            endTime:state.currentDataset.endTime,
            channel:state.currentDataset.channel,
            appname: state.currentDataset.appname,
            keywordColumn: state.currentDataset.keywordColumn
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
          sentiment:state.currentDataset.sentiment,
          channel:state.currentDataset.channel,
          appname:state.currentDataset.appname,
          keywordColumn:state.currentDataset.keywordColumn
        }
      }
    },

    updateSelectedChannel(state,action){
      return {
        ...state,
        currentDataset: {
          name:state.currentDataset.name,
          startTime: state.currentDataset.startTime,
          endTime: state.currentDataset.endTime,
          sentiment:state.currentDataset.sentiment,
          channel:action.payload,
          appname:'',
          keywordColumn:''
        }
      }
    },

    updateSelectedKeyWordsColumn(state,action){
      return {
        ...state,
        currentDataset: {
          name:state.currentDataset.name,
          startTime: state.currentDataset.startTime,
          endTime: state.currentDataset.endTime,
          sentiment:state.currentDataset.sentiment,
          channel:state.currentDataset.channel,
          appname:state.currentDataset.appname,
          keywordColumn:action.payload
        }
      }
    },



    updateAppName(state,action){
      return {
        ...state,
        currentDataset: {
          name:state.currentDataset.name,
          startTime: state.currentDataset.startTime,
          endTime: state.currentDataset.endTime,
          sentiment:state.currentDataset.sentiment,
          channel:state.currentDataset.channel,
          appname:action.payload
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

    updateType(state, action) {
      return {
        ...state,
        chartType: action.payload,
      };
    },
    updateFeeds(state, action) {
      return {
        ...state,
        feeds: {
          ...state.feeds,
          ...action.payload,
        },
      };
    },
    updateGrammar(state, action) {
      return {
        ...state,
        grammar: action.payload,
      };
    },
    exportUpdate(state, action) {
      return {
        ...state,
        export: { ...state.export, ...action.payload },
      };
    },
    clearGrammar(state) {
      return {
        ...state,
        grammar: {},
        feeds: {},
      };
    },
  },
};
