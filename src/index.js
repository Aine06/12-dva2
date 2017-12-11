import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva();

app.use(createLoading());

// 2. Plugins
// app.use({});


// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
