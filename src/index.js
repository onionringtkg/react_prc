import React from 'react';
import ReactDOM from 'react-dom';

//Provider などに必要な要素のインポート
import { createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

import thunk from 'redux-thunk'
//デバック
import { composeWithDevTools } from 'redux-devtools-extension'
//リンクボタンの設定
import { BrowserRouter, Route, Switch} from 'react-router-dom'

import './index.css';
import EventsIndex from './components/events_index';
import EventsNew from './components/events_new';
import EventsShow from './components/events_show';
import * as serviceWorker from './serviceWorker';

//このstoreはアプリ内で唯一のもの。全てのstateはこのstoreに集約されている。
const enhancer = process.env.NODE_ENV === 'development' ?
  composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)
const store = createStore(reducer, enhancer)

ReactDOM.render(
  //Providerでくくることで、どこからでもstore(state)にアクセスできるようになる
  //コンポーネント間の分岐を行う
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/events/new" component={EventsNew} />
          <Route path="/events/:id" component={EventsShow} />
          <Route exaxt path="/" component={EventsIndex} />
          <Route exaxt path="/events" component={EventsIndex} />
        </Switch>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
