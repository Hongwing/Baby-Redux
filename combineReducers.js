
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

module.exports = combindReducers;