/**
 * redux 使用
 */
const createStore = require('./createStore');

const applyMiddleware = require('./applyMiddleware');
const combineReducers = require('./combineReducers');
const bindActionCreators = require('./bindActionCreators'); // action整合 bindActionCreators({ countAction, infoAction }, dispatch)


const initialState = {
    countdata: {
        counter: 0,
    },
    infodata: {
        name: 'henryhe',
        desc: 'a student',
    }
};
const { infoReducer, countReducer } = require('./reducers');
// middlewares
const logger = require('./logger');
const timer = require('./timer');

const store = createStore(combineReducers({
    infodata: infoReducer,
    countdata: countReducer,
}), applyMiddleware(timer, logger));

store.subscribe = (() => {
    console.info(store.getState())
})



console.info('init store', store.getState())
store.dispatch({
    type: 'INCREMENT'
})
store.dispatch({
    type: 'SET_NAME',
    name: 'GOOD JOB'
})