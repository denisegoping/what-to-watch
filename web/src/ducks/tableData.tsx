import { createSlice, PayloadAction} from '@reduxjs/toolkit'

export type TableData = {
    tableData: RowData[];
    isLoading: boolean;
    error?: Error | null;
}

export type RowData = {
    movieTitle: string,
    director: string,
    year: string,
    genre: string,
}

export const initialState: TableData = {
    tableData: [],
    isLoading: false,
    error: null,
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
            if (state.tableData.length === 25) {
                state.tableData.shift();
                state.tableData.push(action.payload.rowData);
            } else {
                state.tableData = [...state.tableData, action.payload.rowData];
            }
            state.isLoading = false;
            state.error = null;
        },
        addTableDataError(
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
