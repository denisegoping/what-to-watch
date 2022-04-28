import { put, takeEvery, call } from "redux-saga/effects";
import axios from "axios";

const tableDataActions = require("../ducks/tableData.tsx").tableDataActions;

const url = 'http://localhost:5000/movieData';

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

    function* addTableData(action) {
        console.log('adding data');
        console.log(action);
        
        try {
            const addData = async () => {
                try {
                    console.log('posting');
                    const { data } = await axios.post(url, action.payload);
                    console.log(data);
                    return data;
                } catch (e) {
                    console.log(e);
                    return e;
                }
            }
            const data = yield call(addData);
            console.log(data);
            yield put(
                tableDataActions.addTableDataSuccess({
                    rowData: action.payload
                })
            );
        } catch (error) {
            yield put(tableDataActions.addTableDataError({ error }));
        }
    }

    return function* tableDataSaga() {
        yield takeEvery(
            tableDataActions.getTableDataRequest.toString(),
            retrieveTableData
        );
        yield takeEvery(
            tableDataActions.addTableDataRequest.toString(),
            addTableData
        );
    };
}