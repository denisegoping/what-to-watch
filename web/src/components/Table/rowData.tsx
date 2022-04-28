import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
// import { tableDataSelectors } from '../../ducks/tableData';

var tableDataActions = require('../../ducks/tableData.tsx').tableDataActions;
const tableDataSelectors = require('../../ducks/tableData.tsx').tableDataSelectors;

// export const RowHandler = () => {
//     console.log('in the get row handler');
    
//     const tableData = useSelector(tableDataSelectors.selectTableData);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(tableDataActions.getTableDataRequest());
//     }, []);

//     return tableData? tableData : [];
// }

export const AddRowDataHandler = (
    songTitle: string,
    album: string,
    artist: string,
    genre: string,
) => {
    console.log('in the add row handler');

    const dispatch = useDispatch();

    dispatch(tableDataActions.addTableDataRequest({songTitle, album, artist, genre}));
    return(useSelector(tableDataSelectors.selectTableData))
}

// export const currentRows = RowHandler();
