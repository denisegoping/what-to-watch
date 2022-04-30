import { put, takeEvery, call } from "redux-saga/effects";
import axios from "axios";

var tableDataActions = require("../ducks/tableData.tsx").tableDataActions;

const url = 'https://what-to-watch-movies.herokuapp.com/'

export const tableDataSagaBuilder = () => {

    function* retrieveTableData() {
        try {
            const getData = async () => {
                try {
                    const { data } = await axios.get(url + 'movieData');
                    return data;
                } catch (e) {
                    console.log(e);
                    return e;
                }
            }
            const data = yield call(getData);
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
        try {
            const addData = async () => {
                try {
                    const { data } = await axios.post(url + 'movieData', action.payload);
                    return data;
                } catch (e) {
                    console.log(e);
                    return e;
                }
            }
            const data = yield call(addData);
            yield put(
                tableDataActions.addTableDataSuccess({
                    id: data.insertId,
                    rowData: action.payload
                })
            );
        } catch (error) {
            yield put(tableDataActions.addTableDataError({ error }));
        }
    }

    function* retrieve25TableData() {
        try {
            const getData = async () => {
                try {
                    const { data } = await axios.get(url + 'limitedMovieData');
                    return data;
                } catch (e) {
                    console.log(e);
                    return e;
                }
            }
            const data = yield call(getData);
            yield put(
                tableDataActions.get25TableDataSuccess({
                    tableData: data
                })
            );
        } catch (error) {
            yield put(tableDataActions.get25TableDataError({ error }));
        }
    }

    function* removeTableData(action) {
        try {
            const removeData = async () => {
                try {
                    const { data } = await axios.delete(url + 'movieData/' + action.payload.movieID);
                    return data;
                } catch (e) {
                    console.log(e);
                    return e;
                }
            }
            const data = yield call(removeData);
            yield put(
                tableDataActions.removeTableDataSuccess(
                    action.payload
                )
            );
        } catch (error) {
            yield put(tableDataActions.removeTableDataError({ error }));
        }
    }

    function* retrieveGenreTableData(action) {
        try {
            const getData = async () => {
                try {
                    const { data } = await axios.get(url + 'movieData/' + action.payload.genre);
                    return data;
                } catch (e) {
                    console.log(e);
                    return e;
                }
            }
            const data = yield call(getData);
            yield put(
                tableDataActions.getGenreTableDataSuccess({
                    tableData: data
                })
            );
        } catch (error) {
            yield put(tableDataActions.getGenreTableDataError({ error }));
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
        yield takeEvery(
            tableDataActions.get25TableDataRequest.toString(),
            retrieve25TableData
        );
        yield takeEvery(
            tableDataActions.removeTableDataRequest.toString(),
            removeTableData
        );
        yield takeEvery(
            tableDataActions.getGenreTableDataRequest.toString(),
            retrieveGenreTableData
        )
    };
}
