import React from 'react';
import PropTypes from 'prop-types'
import { routerRedux,Router,Redirect, Switch, Route } from 'dva/router';
import dynamic from 'dva/dynamic';
const { ConnectedRouter } = routerRedux
import MainLayout from './components/MainLayout/MainLayout';


function RouterConfig({ history ,app  }) {

	const routes =[
		{
			path:'/users',
			models: () => [import('./models/users')],
			component:() => import('./components/Users/Users'),
		},{
			path:'/login',
			models: () => [import('./models/Login')],
			component:()=> import('./components/Login/Login'),

		}
	]



  return (

    <ConnectedRouter history={history}>
       <Switch>
       	<MainLayout>
		        <Route exact path="/" render={()=>(<Redirect to='/users'/>)} />
		        {
		        	routes.map(({path,...dynamics},key)=>(
		        			<Route key ={key} exact
		        			path ={path}
		        			component={dynamic({
		        				app,
		        				...dynamics
		        			})}
		        			/>
		        		))
		        }
	        </MainLayout>
	      
       </Switch>
     
    </ConnectedRouter >
  );
  	routes.PropTypes={
		history:PropTypes.object,
		app:PropTypes.object
	}
}

export default RouterConfig;



