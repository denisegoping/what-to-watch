import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
// import { tableDataSelectors } from '../../ducks/tableData';

var tableDataActions = require('../../ducks/tableData.tsx').tableDataActions;
const tableDataSelectors = require('../../ducks/tableData.tsx').tableDataSelectors;

export const RowHandler = () => {
    console.log('in here once');
    
    const tableData = useSelector(tableDataSelectors.selectTableData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tableDataActions.getTableDataRequest());
    }, []);

    return tableData? tableData : [];
}

const addRowData = (
    songTitle,
    album,
    artist,
    genre,
) => {
    return {songTitle, album, artist, genre};
}
