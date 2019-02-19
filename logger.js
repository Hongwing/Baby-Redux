
const loggerMiddleware = (store) => (next) => (action) => {
    console.info('action before : + ', store.getState());
    next(action);
}

module.exports = loggerMiddleware;