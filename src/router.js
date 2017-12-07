import React from 'react';
import { routerRedux,Router, Switch, Route } from 'dva/router';
import dynamic from 'dva/dynamic';

const { ConnectedRouter } = routerRedux


function RouterConfig({ history ,app  }) {

	const IndexPage = dynamic({
    	app,
    	component:() => import('./routes/IndexPage'),
  	});

	const Users = dynamic({
	    app,
	    models: () => [],
	    component:() => import('./routes/Users'),
  	});

	const Login = dynamic({
	    app,
	    models: ()=>[],
	    component:()=> import('./routes/Login'),
	  });

  return (

    <ConnectedRouter  history={history}>
       <Switch>
	        <Route exact path="/" exact component={IndexPage} />
	        <Route path="/users" component={Users} />
	        <Route path="/login" component={Login} />
       </Switch>
     
    </ConnectedRouter >
  );
}

export default RouterConfig;
