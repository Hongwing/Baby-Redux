// import createStore from './createStore';
const createStore = require('./createStore');

const initialState = {
    count: {
        counter: 0,
    },
    info: {
        name: 'henryhe',
        desc: 'a student',
    }
};

const countReducer = (state = {}, action) => {
    // console.info(state, 'ct reducer')
    switch (action.type) {
        case 'INCREMENT':
            return {
                counter: state.counter + 1,
            };
        case 'DISCREMENT':
            return {
                counter: state.counter - 1,
            };
        default:
            return state;
    }
}

const infoReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.name,
            };
        case 'SET_DESC':
            return {
                ...state,
                desc: action.desc,
            };
        default:
            return state;
    }
}

const combindReducers = (obj) => {
    const keys = Object.keys(obj);
    // console.info(keys)

    return (state, action) => {
        // console.info(state)
        let nextstate = {};

        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            const reducer = obj[key];
            // console.info(key, reducer);

            const currentState = state[key];
            // console.info(currentState, 'currenstate')
            const _state = reducer(currentState, action);

            nextstate[key] = _state;
        }

        return nextstate;
    }
}

const store = createStore(combindReducers(
    {
        count: countReducer,
        info: infoReducer,
    }
), initialState);

store.subscribe(() => {
    console.info(store.getState(), 'notify got');
})


// change state
// store.changeState(2);
// store.changeState('hello');
// store.changeState(3);

// change state
// store.dispatch({
//     type: 'INCREMENT',
// })

// store.dispatch({
//     type: 'SET_NAME',
//     name: 'HE HONGWEI',
// })

// middleware
const next = store.dispatch;

// store.dispatch = (action) => {
//     console.info('action before : + ', store.getState().count);
//     next(action);
//     console.info('time here : - ', new Date())
// }

const loggerMiddleware = (store) => (next) => (action) => {
    console.info('action before : + ', store.getState().count);
    next(action);

}

const timerMiddleware = (store) => (next) => (action) => {
    next(action);
    console.info('time here : - ', new Date())
}

// 加入中间件
const applyMiddlewares = (...middlewares) => {
    console.info(middlewares);
    return function reWriteCreateStore(oldCreateStore) {


        return function newCreateStore(reducers, initialState) {
            const store = oldCreateStore(reducers, initialState);

            const chain = middlewares.map(middleware => middleware(store));
            console.info(chain)

            let dispatch = store.dispatch;
            chain.reverse().map(middleware => {
                dispatch = middleware(dispatch)
            });
            console.info(dispatch)

            // 重写后
            store.dispatch = dispatch; // new dispatch
            return store;
        }
    }
}


// const newCreate = applyMiddlewares(timerMiddleware, loggerMiddleware)(createStore);
// const newstore = newCreate(combindReducers(
//     countReducer,
// ));

const newstore = createStore(
    combindReducers({
        count: countReducer,
    }),
    applyMiddlewares(timerMiddleware, loggerMiddleware)
);



newstore.subscribe(() => {
    console.info(newstore.getState())
})

// 最里面是真正的第一个执行，由内向外
// const logger = loggerMiddleware(store);
// const timer = timerMiddleware(store);
// store.dispatch = timerMiddleware(loggerMiddleware(next));
// store.dispatch = timer(logger(next));


console.info('init store', newstore.getState())

// newstore.dispatch({
//     type: 'INCREMENT',
// })

// newstore.dispatch({
//     type: 'SET_NAME',
//     name: 'HE HONGWEI',
// })