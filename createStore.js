/**
 * 
 * Redux 实现 
 * @author: HenryHE
 * @description: Redux状态管理器，Flux思想
 * 
 */

const createStore = (reducer, inititalState, newDispatchAdapter) => {

    // 判断reducer是否是函数
    if (typeof reducer !== 'function') {
        throw new Error('您的reducer不是函数类型');
    }
    
    // 省略initialState
    if (typeof inititalState === 'function') {
        newDispatchAdapter = inititalState;
        inititalState = {};
    }

    // 如果newDispatchAdapter存在，即有新的dispatch需要载入使用
    if (newDispatchAdapter) {
        const newCreateStore = newDispatchAdapter(createStore);
        return newCreateStore(reducer, inititalState);
    }

    // 没有continue
    let state = inititalState;
    let listeners = [];

    /**
     * state 订阅
     */
    subscribe = (listener) => {
        listeners.push(listener)
        // 退订函数
        return function unsubscribe() {
            const id = listeners.indexOf(listener);
            listeners.splice(id, 1);
        }
    }; 

    replaceReducer = (nextReducer) => {
        reducer = nextReducer
        // 刷新state树 添加新的数据状态
        dispatch({ type: Symbol() })
    }

    /**
     * 修改state
     */
    dispatch = (action) => {
        // state = s;
        state = reducer(state, action);

        for (let index = 0; index < listeners.length; index++) {
            const listener = listeners[index];
            listener(); // notify
        }
    };

    /**
     * 获取state
     */
    getState = () => state;

    // 默认返回全部数据结构
    dispatch({ type: Symbol() })

    return {
        subscribe,
        dispatch,
        replaceReducer,
        getState
    }   
}

// export default createStore;
module.exports =  createStore;