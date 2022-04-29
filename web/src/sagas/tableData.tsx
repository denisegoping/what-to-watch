import { put, takeEvery, call } from "redux-saga/effects";
import axios from "axios";

const tableDataActions = require("../ducks/tableData.tsx").tableDataActions;

// const url = 'http://localhost:5000/';
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
                    const { data } = await axios.post(url + 'movieData', action.payload);
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
            console.log(data);
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
        console.log('removing data');
        console.log(action);

        try {
            const removeData = async () => {
                try {
                    const { data } = await axios.delete(url + 'movieData/' + action.payload.movieID);
                    console.log(data);
                    return data;
                } catch (e) {
                    console.log(e);
                    return e;
                }
            }
            const data = yield call(removeData);
            console.log(data);
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
            console.log(data);
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