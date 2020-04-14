import _ from 'lodash'
import { 
    READ_EVENTS,
    DELETE_EVENT,
    GET_EVENT,
    UPDATE_EVENT,
    CREATE_EVENT,
} from '../actions'

export default (events = {}, action) => {
    switch (action.type) {
        case READ_EVENTS:
        case CREATE_EVENT:
        case UPDATE_EVENT:
            return _.mapKeys(action.response.data, 'id')
        case GET_EVENT:
            const data = action.response.data
            return {...events, [data.id]: data}
        case DELETE_EVENT:
            //delete完了後のイベントを返す
            delete events[action.id]
            return { ...events}
        default:
            return events
    }
}