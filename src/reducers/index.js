//全てのreducerを一つのreducerに結合する役割のファイル

import { combineReducers } from 'redux'
//redux-formが提供するreducerのインポート
import { reducer as form } from 'redux-form'

import events from './events'

//複数存在する場合は、ここにそのコンポーネントを列挙する
//例　：　export default combineReducers({count, time})
export default combineReducers({events, form})