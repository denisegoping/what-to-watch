import React from 'react';
import Table from '@material-ui/core/Table'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { TableBody, TableCell, TableContainer, TableRow, TableHead, TextField, Button } from '@material-ui/core';
import { RowData } from '../../ducks/tableData';
const tableDataSelectors = require('../../ducks/tableData.tsx').tableDataSelectors;
var tableDataActions = require('../../ducks/tableData.tsx').tableDataActions;

export function MovieTable() {   
    
    const [isFullHistory, setIsFullHistory] = useState(false);
    const [rowsHaveChanged, setRowsHaveChanged] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(0);
    const [movieState, setMovieState] = useState('');
    const [directorState, setDirectorState] = useState('');
    const [yearState, setYearState] = useState('');
    const [genreState, setGenreState] = useState('');
    
    let tableData: RowData[] = useSelector(tableDataSelectors.selectTableData);
    const [rows, setRows] = useState(tableData);
    const dispatch = useDispatch();

    let requestAction;

    if (isFullHistory === true) {
        requestAction = tableDataActions.getTableDataRequest();
    } else {  
        requestAction = tableDataActions.get25TableDataRequest();
    }

    useEffect(() => {        
        setRows(tableData);
      }, [tableData])

    useEffect(() => {
        console.log(requestAction);
        dispatch(requestAction);
    }, [isFullHistory]);

    useEffect(() => {
        console.log(itemToDelete);
        dispatch(tableDataActions.removeTableDataRequest({movieID: itemToDelete}));
    }, [itemToDelete]);

    useEffect(() => {
        console.log('updating');
        if (movieState !== '' && directorState !== '' && yearState !== '' && genreState !== '') {
            dispatch(tableDataActions.addTableDataRequest({movieTitle: movieState, director: directorState, year: yearState, genre: genreState}));
        }
        setMovieState('');
        setDirectorState('');
        setYearState('');
        setGenreState('');
        setRowsHaveChanged(false);
    }, [rowsHaveChanged]);


    return (
        <div>
        <Button onClick={() => setIsFullHistory(false)}>Latest 25 Movies</Button>
        <Button onClick={() => setIsFullHistory(true)}>Full History</Button>
    <TableContainer style={{maxHeight: '75vh'}}>
        <Table stickyHeader style={{ width: '90%', alignItems: 'center'}}>
        <TableHead>
            <TableRow>
                <TableCell>Movie</TableCell>
                <TableCell align="right">Director</TableCell>
                <TableCell align="right">Year</TableCell>
                <TableCell align="right">Genre</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
                    <TableCell component="th" scope="row">
                        <TextField value={movieState} onChange={(c) => setMovieState(c.target.value)}></TextField>
                    </TableCell>
                    <TableCell align="right"><TextField value={directorState} onChange={(c) => setDirectorState(c.target.value)}></TextField></TableCell>
                    <TableCell align="right"><TextField value={yearState} onChange={(c) => setYearState(c.target.value)}></TextField></TableCell>
                    <TableCell align="right"><TextField value={genreState} onChange={(c) => setGenreState(c.target.value)}></TextField></TableCell>
                    <Button onClick={() => setRowsHaveChanged(true)}>Submit Movie</Button>
            </TableRow>
            {rows.map((row) => (
                <TableRow>
                    <TableCell component="th" scope="row">{row.movieTitle}</TableCell>
                    <TableCell align="right">{row.director}</TableCell>
                    <TableCell align="right">{row.year}</TableCell>
                    <TableCell align="right">{row.genre}</TableCell>
                    <Button onClick={() => setItemToDelete(row.ID)}>Remove</Button>
                </TableRow>
            ))}
        </TableBody>
    </Table>
</TableContainer>
</div>
    )
}
