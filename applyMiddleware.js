// 加入中间件
const applyMiddlewares = (...middlewares) => {
    return function reWriteCreateStore(oldCreateStore) {


        return function newCreateStore(reducers, initialState) {
            const store = oldCreateStore(reducers, initialState);

            const chain = middlewares.map(middleware => middleware(store));

            let dispatch = store.dispatch;
            // 合并middlewares
            chain.reverse().map(middleware => {
                dispatch = middleware(dispatch)
            });
            // redux 官方
            const compose = (...funcs) => {
                if (funcs.length === 1) {
                    return funcs[0]
                }
                return funcs.reduce((a, b) => (...args) => a(b(...args)))
            }

            // 重写后
            store.dispatch = dispatch; // new dispatch
            // store.dispatch = compose(chain)(dispatch); //  官方
            return store;
        }
    }
}

module.exports = applyMiddlewares;