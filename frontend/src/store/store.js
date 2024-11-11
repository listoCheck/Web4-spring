// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Создаем слайс для состояния `Body`
const bodySlice = createSlice({
    name: 'body',
    initialState: {
        selectedX: '0',
        selectedY: '0',
        selectedR: '1',
    },
    reducers: {
        setX: (state, action) => {
            state.selectedX = action.payload;
        },
        setY: (state, action) => {
            state.selectedY = action.payload;
        },
        setR: (state, action) => {
            state.selectedR = action.payload;
        },
    },
});

export const { setX, setY, setR } = bodySlice.actions;

export const store = configureStore({
    reducer: {
        body: bodySlice.reducer,
    },
});
