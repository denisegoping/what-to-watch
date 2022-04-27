import { put, takeEvery, call } from "redux-saga/effects";
import axios from "axios";

const tableDataActions = require("../../ducks/tableData.tsx").tableDataActions;

const url = 'http://localhost:5000/musicData';

export const tableDataSagaBuilder = () => {

    function* retrieveTableData() {
        try {
            const getData = async () => {
                try {
                    const { data } = await axios.get(url);
                    return data;
                } catch (e) {
                    console.log(e);
                    return e;
                }
            }
            const data = yield call(getData);
            console.log(data);
            yield put(
                tableDataActions.getTableDataSuccess({
                    tableData: data
                })
            );
        } catch (error) {
            yield put(tableDataActions.getTableDataError({ error }));
        }
    }

    return function* tableDataSaga() {
        yield takeEvery(
            tableDataActions.getTableDataRequest.toString(),
            retrieveTableData
        );
    };
}