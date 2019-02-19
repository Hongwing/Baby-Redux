const countReducer = (state = {}, action) => {
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

module.exports = {
    countReducer,
    infoReducer
}