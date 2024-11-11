// src/redux/reducers/index.js
import { combineReducers } from 'redux';
import pointReducer from './pointReducer';  // Создадим этот редьюсер ниже

// Комбинируем все редьюсеры в один
const rootReducer = combineReducers({
    points: pointReducer
});

export default rootReducer;
