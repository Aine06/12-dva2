import request from '../utils/request';

export function login(values) {
  return request(`/dva/logins`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
        'Content-Type': 'application/json'
    }
  });

}
