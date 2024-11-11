// src/redux/actions/pointActions.js

// Экшен для добавления новой точки
export const addPoint = (point) => {
    return {
        type: 'ADD_POINT',
        payload: point,
    };
};

// Экшен для очистки всех точек
export const clearPoints = () => {
    return {
        type: 'CLEAR_POINTS',
    };
};
