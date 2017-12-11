import React from 'react';
import PropTypes from 'prop-types'
import { routerRedux,Router,Redirect, Switch, Route } from 'dva/router';
import dynamic from 'dva/dynamic';
const { ConnectedRouter } = routerRedux

function RouterConfig({ history ,app  }) {

	const routes =[

		{
			path:'/index',
			component:() => import('./routes/IndexPage'),
		},
		{
			path:'/users',
			models: () => [import('./models/users')],
			component:() => import('./routes/Users'),
		},{
			path:'/login',
			models: () => [import('./models/Login')],
			component:()=> import('./routes/Login'),

		}
	]

  return (

    <ConnectedRouter history={history}>
       <Switch>
	        <Route exact path="/" render={()=>(<Redirect to='/index'/>)} />
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
	      
       </Switch>
     
    </ConnectedRouter >
  );
  	routes.PropTypes={
		history:PropTypes.object,
		app:PropTypes.object
	}
}



export default RouterConfig;



