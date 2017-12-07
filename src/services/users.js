import request from '../utils/request';
import { PAGE_SIZE } from '../constants';


//获取
export function fetchs( page,getuserId,gettoken) {

  return request(`/dva/user?_page=${page}&_limit=${PAGE_SIZE}&getuserId=${getuserId}&gettoken=${gettoken}`,{
  	method: 'GET',
  });
}

//新建
export function create(values,getuserId,gettoken){
  return request(`/dva/usercreate?name=${values.name}&email=${values.email}&website=${values.website}&getuserId=${getuserId}&gettoken=${gettoken}`,{
    method:'GET',
  });
}

//删除
export function remove(id) {
  return request(`/dva/userremove/${id}`, {
    method: 'DELETE',
  });
}


//修改
export function patch(id, values) {
  return request(`/dva/userpatch/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
    headers: {
        'Content-Type': 'application/json'
    },
  });
}

