import React from 'react';
import { connect } from 'dva';
import styles from './Login.css';
import Login from '../components/Login/Login';

function Logins({ location }) {
  return (
      <div className={styles.normal}>
         <Login />
      </div>
  );
}

export default connect()(Logins);
