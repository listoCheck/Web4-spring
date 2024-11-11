// src/redux/reducers/pointReducer.js
const initialState = {
    points: [],
};

const pointReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_POINT':
            return {
                ...state,
                points: [...state.points, action.payload],
            };
        case 'CLEAR_POINTS':
            return {
                ...state,
                points: [],
            };
        default:
            return state;
    }
};

export default pointReducer;
