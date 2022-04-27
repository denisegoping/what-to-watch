import { fork, all } from "redux-saga/effects";

const tableDataSagaBuilder = require("./components/sagas/tableData.tsx").tableDataSagaBuilder;

const tableDataSaga = tableDataSagaBuilder();

export function* rootSaga() {
    yield all([
        fork(tableDataSaga)
    ]);
}
