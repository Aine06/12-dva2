import queryString from 'query-string';
import * as usersService from '../services/users';

export default {
  namespace: 'users',
  state: {
  	list:[],
  	total:null,
  	page:null,
  },
  reducers: {
  	save(state,{payload:{data:list,total,page}}){
  		return{...state,list,total,page}
  	}
  },
  effects: {
    *fetch({ payload: { page = 1 } }, { call, put }) {
    	 let gettoken = sessionStorage.getItem("token");
     	 let getuserId = sessionStorage.getItem("userId");  
	    const { data , headers } = yield call(usersService.fetchs, page ,getuserId,gettoken);
  		
  		yield put({
  			type:'save',
  			payload:{
  				data,
			    total: parseInt(headers['x-total-count'], 10),
      			page: parseInt(page, 10),
  			}
  		})

  	},
  	*remove({ payload }, { call, put }) {
  			const { id, resolve, reject } = payload;
		    var success = yield call(usersService.remove, id);
		      if (success) {
		     	resolve(success);
			  } else {
			     reject('崩溃啦');
			  }
    		yield put({ type: 'reload' });
	},

	*patch({ payload}, { call, put }) {
		const { id, values,resolve, reject } = payload;
		var success = yield call(usersService.patch, id, values);
		  if (success) {
		     resolve(success);
		  } else {
		     reject('崩溃啦');
		  }
		  yield put({ type: 'reload' });

	},
	*create({ payload }, { call, put }) {
		   const { userstoekn, values,resolve, reject } = payload;
	       let getuserId = userstoekn.getuserId
		   let gettoken = userstoekn.gettoken
		   var success = yield call(usersService.create, values ,getuserId,gettoken);
		    if (success) {
		    	 resolve(success);
			 } else {
			     reject('崩溃啦');
			 }

	       yield put({ type: 'reload' });
    },
    *reload(action, { put, select }) {
	      const page = yield select(state => state.users.page);
	      yield put({ type: 'fetch', payload: { page } });
    },

  },
  subscriptions: {
  	setup({dispatch,history}){
  		 return history.listen(({ pathname, search }) => {

  		 	const query = queryString.parse(search);

  		 	  if (pathname === '/users') {
          			dispatch({ type: 'fetch', payload: query });
      			}
		 });
  	}
  },
};
