import request from '@/utils/request';
import { serverUri }from '../defaultSettings'

export async function listConfigs() {
  //return request('/api/confs');  // Return a Promise object
  return request('/api/confs')
}

export async function getConfig(domain) {
  return request(`/api/confs/${domain}`);
}

export async function saveConfig(params) {
  const { domain, value } = params;
  return request(`/api/confs/${domain}`, {
    method: 'POST',
    body: value,
  });
}

export async function saveModelInfo(param) {
  request(serverUri + '/api/saveModel',{
    method: 'POST',
    body: param
  })
}

export async function getModels(){
  return request(serverUri + '/api/getAllModels')
}


export async function updateModelDeployStatus(param){
  return request(serverUri + '/api/updateDeployStatus',{
    method:'POST',
    body:param
  })
}


export async function getModelsByDepartAndTeam(param) {
  return request(serverUri + '/api/getModelByDepartAndTeam',{
    method: 'POST',
    body: param
  })
}
