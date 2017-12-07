import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button, Alert } from 'antd';
import { routerRedux , History } from 'dva/router';
import styles from './Login.less';
import LoginForm from './LoginForm';
import { address } from '../../constants';



function Login({ props, dispatch, list: dataSource, loading, total }) {
	sessionStorage.setItem("userId", dataSource.userId)
	sessionStorage.setItem("token",dataSource.token)
	

	if(dataSource.status==200){
	    dispatch(routerRedux.push({pathname: '/'}))
	}
 	function loginUserList(values) {
	    dispatch({
	      type: 'login/login',
	      payload: values,
	    });
  	}
  	
return (
	<div className={styles.normal}>
		<div className={styles.create}>
			<LoginForm onOkList={loginUserList}>
		    </LoginForm> 
	    </div>	    
    </div>
	)
}


function mapStateToProps(state) {
   const { list } = state.login;
   return {
    loading: state.loading.models.login,
    list,
  };
}

export default connect(mapStateToProps)(Login);
