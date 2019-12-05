import request from '@/utils/request';
import { serverUri } from '../defaultSettings';

export async function queryDatasets(params) {
  let url = serverUri + '/api/datasets';
  return request(url,{
    method:'POST',
    body: params
  });
};

export async function queryDataset(id) {
  return request( serverUri + `/api/datasets/${id}`);
};

export async function runDatasetQuery(params) {
  const { dataset, ...restParams } = params;
  return request(`/api/datasets/${dataset}/query`, {
    method: 'POST',
    body: restParams,
  });
};

export async function createModel(params) {
  return request(serverUri + `/api/saveModel`, {
    method: 'POST',
    body: params,
  });
};

export async function addDatasetInfo(params) {
  return request(serverUri + `/api/registeDataSet`, {
    method: 'POST',
    body: params,
  });
};

export async function deleteDataset(id) {
  return request(`/api/datasets/${id}`, {
    method: 'DELETE',
  });
}

export async function query2dataset(params) {
  return request(`/api/query2dataset`, {
    method: 'POST',
    body: params,
  });
}


export async function getService(params){
  return request(serverUri + '/api/getService',{
    method: 'POST',
    body: params
  });
}

export async function getPredictResult(params) {
  return request(serverUri + '/api/getPredictResult',{
    method: 'POST',
    body: params
  });
}

export async function getPredictedDataLists(params) {
  return request(serverUri + '/api/getPredictsList',{
    method: 'POST',
    body: params
  })
}


export async function getConnectionDataInfo(params){
  return request(serverUri + '/api/getDescriptionOfConnection',{
    method: 'POST',
    body: params
  })
}


export async function multiDimensionAnalysis(params) {
  return request(serverUri + '/api/multiDimensionAnalysis',{
    method: 'POST',
    body: params
  })
}


export async function drawWordCloud(params){
  return request(serverUri + '/api/drawWordCloud',{
    method:'POST',
    body:params
  })
}
