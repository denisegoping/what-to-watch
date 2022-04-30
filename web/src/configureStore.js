import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
const tableDataReducer = require('./ducks/tableData.tsx').tableDataReducer;
const rootSaga = require('./rootSaga.ts').rootSaga;

const sagaMiddleware = createSagaMiddleware();

function createStore() {
    const middlewares = [];

    middlewares.push(sagaMiddleware)

    const store = configureStore({
        reducer: {
            tableData: tableDataReducer
        },
        middleware: middlewares,
    });

    sagaMiddleware.run(rootSaga);

    return store;
}

export const storeInstance = createStore();