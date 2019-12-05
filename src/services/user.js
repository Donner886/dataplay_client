import request from '@/utils/request';
import { serverUri } from '../defaultSettings';


export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}
