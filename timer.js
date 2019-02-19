
const timerMiddleware = (store) => (next) => (action) => {
    next(action);
    console.info('time here : - ', new Date(), store.getState())
}

module.exports = timerMiddleware;