import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button,message   } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Users.less';
import { PAGE_SIZE } from '../../constants';
import UserModal from './UserModal';
import UserModalalert from './UserModalalert';




function Users({ props,dispatch,list: dataSource, total, page: current,loading }) {

 var userstoekn ={}
  userstoekn.gettoken = sessionStorage.getItem("token");
  userstoekn.getuserId = sessionStorage.getItem("userId"); 

  if(dataSource.status == 501){
       dispatch(routerRedux.push('/login'));
  }


  function pageChangeHandler(userstoekn,page) {
	    dispatch(routerRedux.push({
	      pathname: '/users',
	      search:'?page='+page,
	    }))
   }

  function deleteHandler(id) {
   		new Promise((resolve, reject) => {
		      	dispatch({
			         type: 'users/remove',
			         payload: {
			         	 id,
			             resolve,
			             reject,
			         },
			      }); 
			   })
   				.then( res => {
				      if(res.data.status == 200){
			      		 message.success(res.data.succMsg);
			      		}
	   			})
		 		.catch( err => {
		      		message.success(err);
		  		})
   }
   function editHandler(id, values) {
   		new Promise((resolve, reject) => {
		      	dispatch({
			         type: 'users/patch',
			         payload: {
			         	 id,
			             values,
			             resolve,
			             reject,
			         },
			      }); 
			   })
   				.then( res => {
				      if(res.data.status == 200){
			      		 message.success(res.data.succMsg);
			      		}
	   			})
		 		.catch( err => {
		      		message.success(err);
		  		})
   }

    function createHandler(userstoekn, values) {
   		new Promise((resolve, reject) => {
		      	dispatch({
			         type: 'users/create',
			         payload: {
			         	 userstoekn,
			             values,
			             resolve,
			             reject,
			         },
			      }); 
			   })
   				.then( res => {
				      if(res.data.status == 200){
			      		 message.success(res.data.succMsg);
			      		}
	   			})
		 		.catch( err => {
		      		message.success(err);
		  		})
   }


  // function createHandler(userstoekn,values) {
  // 		dispatch({
  // 			type:'users/create',
  // 			payload:{userstoekn,values},
  // 		})
  // 		 .then(() => {
		//     message.success('新增成功');
		//   })
  // 		 .catch((reason)=>{
  // 		 	console.log(reason)
		//   	message.success(reason);

  // 		 })
  // }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href={text}>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Operation',
      key: 'operation',
       render: (text, record) => (
        <span className={styles.operation}>
          <UserModal record={record} onOk={editHandler.bind(null, record._id)}>
            <a>Edit</a>
          </UserModal>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record._id)}>
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];


  return (
    <div className={styles.normal}>
      <div>

      	 <div>
      	 	{dataSource.status == 200?
 			  	<UserModalalert></UserModalalert>
      	 		:null
      	 	}
      	 </div>

	      <div className={styles.create}>
		       <UserModal record={{}} record={{}} onOk={createHandler.bind(null,userstoekn)}>
	            	<Button type="primary">Create User</Button>
	           </UserModal>
	       </div>

	        <Table
	          columns={columns}
	          dataSource={dataSource.data}
	          loading={loading}
	          rowKey={record => record._id}
	          pagination={false}
	        />
	        <Pagination
	          className="ant-table-pagination"
	          total={total}
	          current={current}
	          pageSize={PAGE_SIZE}
	          onChange={pageChangeHandler.bind(null,userstoekn)}
	        />
      </div>

    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.users;
  return {
  	loading: state.loading.models.users,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Users);