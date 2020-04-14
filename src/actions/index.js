
//外部との非同期処理を行うパッケージ
import axios from 'axios'

//状態遷移を管理する
export const READ_EVENTS = 'READ_EVENTS'
export const CREATE_EVENT = 'CREATE_EVENTS'
export const DELETE_EVENT = 'DELETE_EVENTS'
export const GET_EVENT = 'GET_EVENT'
export const UPDATE_EVENT = 'UPDATE_EVENT'

const ROOT_URL = 'https://udemy-utils.herokuapp.com/api/v1'
const QUERYSTRING = '?token=token123'

//actionをdispatchでreducerに渡していく
//thunkを導入すると、actionの代わりに関数を返すことができるようになる
export const readEvents = () => async dispatch => {
    const response = await axios.get(`${ROOT_URL}/events${QUERYSTRING}`)
    dispatch({type: READ_EVENTS, response})
}

export const postEvent = values => async dispatch => {
    const response = await axios.post(`${ROOT_URL}/events${QUERYSTRING}`, values)
    dispatch({type: CREATE_EVENT, response})
}

export const deleteEvent = id => async dispatch => {
    await axios.delete(`${ROOT_URL}/events/${id}${QUERYSTRING}`)
    dispatch({type: DELETE_EVENT, id})
}

export const getEvent = id => async dispatch => {
    const response = await axios.get(`${ROOT_URL}/events/${id}${QUERYSTRING}`)
    dispatch({type: GET_EVENT, response})
}

export const putEvent = values => async dispatch => {
    const response = await axios.put(`${ROOT_URL}/events/${values.id}${QUERYSTRING}`, values)
    dispatch({type: UPDATE_EVENT, response})
}
