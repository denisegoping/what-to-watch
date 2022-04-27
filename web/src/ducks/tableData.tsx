import { createSlice, PayloadAction} from '@reduxjs/toolkit'

export type TableData = {
    tableData: RowData[];
    isLoading: boolean;
    error?: Error | null;
}

export type RowData = {
    songName: string,
    album: string,
    artist: string,
    genre: string,
}

export const initialState: TableData = {
    tableData: [],
    isLoading: false,
    error: null,
};

export type TableDataSuccessPayload = {
    tableData: [];
}

export type TableDataErrorPayload = {
    error: Error;
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
            action: PayloadAction<TableDataSuccessPayload>
        ) {
            state.tableData = action.payload.tableData;
            state.isLoading = false;
            state.error = null;
        },
        getTableDataError(
            state,
            action: PayloadAction<TableDataErrorPayload>
        ) {
            state.error = action.payload.error;
            state.isLoading = false;
        }
    }
});

const { actions, reducer } = tableData;

export const tableDataActions = actions;
export const tableDataReducer = reducer;

const topSelect: (state) => TableData = (state) => state.tableData;
export const tableDataSelectors = {
    selectTableData: (state) => topSelect(state).tableData,
};
