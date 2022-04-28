import { createSlice, PayloadAction} from '@reduxjs/toolkit'

export type TableData = {
    tableData: RowData[];
    isLoading: boolean;
    error?: Error | null;
    isFullTable: boolean;
    genreList: string[];
}

export type RowData = {
    ID: number,
    movieTitle: string,
    director: string,
    year: string,
    genre: string,
}

export const initialState: TableData = {
    tableData: [],
    isLoading: false,
    error: null,
    isFullTable: false,
    genreList: [],
};

export type GetTableDataSuccessPayload = {
    tableData: [];
}

export type TableDataErrorPayload = {
    error: Error;
}

export type AddTableDataRequestPayload = {
    rowData: RowData;
}

const tableData = createSlice({
    name: 'tableData',
    initialState,
    reducers: {
        getTableDataRequest(
            state
        ) {
            state.isLoading = true;
        },
        getTableDataSuccess(
            state,
            action: PayloadAction<GetTableDataSuccessPayload>
        ) {
            state.tableData = action.payload.tableData;
            state.isLoading = false;
            state.error = null;
            state.isFullTable = true;
            state.genreList = [];
            state.tableData.forEach((movie) => {
            if (!state.genreList.includes(movie.genre)) {
                state.genreList.push(movie.genre);
            }})
            console.log(state.genreList);
        },
        getTableDataError(
            state,
            action: PayloadAction<TableDataErrorPayload>
        ) {
            state.error = action.payload.error;
            state.isLoading = false;
        },
        addTableDataRequest(
            state,
            action: PayloadAction<RowData>
        ) {
            state.isLoading = true;
        },
        addTableDataSuccess(
            state,
            action: PayloadAction<AddTableDataRequestPayload>
        ) {
            if (!state.isFullTable && state.tableData.length === 25) {
                state.tableData.pop();
                state.tableData.unshift(action.payload.rowData);
            } else {
                state.tableData = [action.payload.rowData, ...state.tableData];
            }
            state.isLoading = false;
            state.error = null;
            if (!state.genreList.includes(action.payload.rowData.genre)) {
                    state.genreList.push(action.payload.rowData.genre);
                }
                console.log(state.genreList);
        },
        addTableDataError(
            state,
            action: PayloadAction<TableDataErrorPayload>
        ) {
            state.error = action.payload.error;
            state.isLoading = false;
        },
        get25TableDataRequest(
            state
        ) {
            state.isLoading = true;
        },
        get25TableDataSuccess(
            state,
            action: PayloadAction<GetTableDataSuccessPayload>
        ) {
            state.tableData = action.payload.tableData;
            state.isLoading = false;
            state.error = null;
            state.isFullTable = false;
        },
        get25TableDataError(
            state,
            action: PayloadAction<TableDataErrorPayload>
        ) {
            state.error = action.payload.error;
            state.isLoading = false;
        },
        removeTableDataRequest(
            state,
            action: PayloadAction<{movieID: number, genre: string}>
        ) {
            state.isLoading = true;
        },
        removeTableDataSuccess(
            state,
            action: PayloadAction<{movieID: number, genre: string}>
        ) {
            const filteredTableData = state.tableData.filter((movie) => movie.ID !== action.payload.movieID);            
            state.tableData = filteredTableData;
            state.isLoading = false;
            state.error = null;
            const filteredGenreList = state.genreList.filter((genre) => genre !== action.payload.genre)
            state.genreList = filteredGenreList;
            state.tableData.forEach((movie) => {
                if (!state.genreList.includes(movie.genre)) {
                    state.genreList.push(movie.genre);
                }})
                console.log(state.genreList);
        },
        removeTableDataError(
            state,
            action: PayloadAction<TableDataErrorPayload>
        ) {
            state.error = action.payload.error;
            state.isLoading = false;
        },
        getGenreTableDataRequest(
            state,
            action: PayloadAction<{genre: string}>,
        ) {
            state.isLoading = true;
        },
        getGenreTableDataSuccess(
            state,
            action: PayloadAction<GetTableDataSuccessPayload>
        ) {
            state.tableData = action.payload.tableData;
            state.isLoading = false;
            state.error = null;
            state.isFullTable = true;
        },
        getGenreTableDataError(
            state,
            action: PayloadAction<TableDataErrorPayload>
        ) {
            state.error = action.payload.error;
            state.isLoading = false;
        },
    }
});

const { actions, reducer } = tableData;

export const tableDataActions = actions;
export const tableDataReducer = reducer;

const topSelect: (state) => TableData = (state) => state.tableData;
export const tableDataSelectors = {
    selectTableData: (state) => topSelect(state).tableData,
    selectGenreList: (state) => topSelect(state).genreList,
};
