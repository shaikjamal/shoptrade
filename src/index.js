

import React from 'react';
import ReactDOM from 'react-dom';
// import { ThemeProvider } from '@material-ui/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import history from './store/history';
import App from './App';
import configureStore from './store/configureStore';
// import theme from './theme';
import './App.css';

// const theme = createMuiTheme(customTheme);
const initialState = {};
const store = configureStore(initialState, history);

const Root = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            {/* <ThemeProvider theme={theme}> */}
                {/* <CssBaseline /> */}
                <App />
            {/* </ThemeProvider> */}
        </ConnectedRouter>
    </Provider>
);
// eslint-disable-next-line no-undef
ReactDOM.render(<Root />, document.getElementById('root'));