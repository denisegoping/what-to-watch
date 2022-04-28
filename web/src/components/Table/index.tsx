import React from 'react';
import Table from '@material-ui/core/Table'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { TableBody, TableCell, TableContainer, TableRow, TableHead, TextField, Button } from '@material-ui/core';
import { RowData } from '../../ducks/tableData';
const tableDataSelectors = require('../../ducks/tableData.tsx').tableDataSelectors;
var tableDataActions = require('../../ducks/tableData.tsx').tableDataActions;

export function MovieTable() {   
    
    const [isFullHistory, setIsFullHistory] = useState(false);
    const [rowsHaveChanged, setRowsHaveChanged] = useState(false);
    const [itemToDelete, setItemToDelete] = useState({movieID: 0, genre: ''});
    const [genreSearch, setGenreSearch] = useState(null);

    const [movieState, setMovieState] = useState('');
    const [directorState, setDirectorState] = useState('');
    const [yearState, setYearState] = useState('');
    const [genreState, setGenreState] = useState('');
    
    let tableData: RowData[] = useSelector(tableDataSelectors.selectTableData);
    let genreList: string[] = useSelector(tableDataSelectors.selectGenreList);
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
        console.log(genreSearch);
        if (genreSearch) {
            dispatch(tableDataActions.getGenreTableDataRequest({genre: genreSearch}));
        } else {
            dispatch(requestAction);
        }
    }, [genreSearch]);

    useEffect(() => {
        console.log(itemToDelete);
        dispatch(tableDataActions.removeTableDataRequest({movieID: itemToDelete.movieID, genre: itemToDelete.genre}));
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
        <Button onClick={() => {setIsFullHistory(false); setGenreSearch(null);}}>Latest 25 Movies</Button>
        <Button onClick={() => {setIsFullHistory(true); setGenreSearch(null);}}>All Movies/Edit List</Button>
        {(() => {
            if (isFullHistory) {
                return <Autocomplete
                            value={genreSearch}
                            disablePortal
                            options={genreList}
                            style={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Latest 25 Movies Per Genre" />}
                            onChange={(_event, newGenre) => {setGenreSearch(newGenre)}}
                            />
                        }
        })()}
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
            {(() => {
                if (isFullHistory && genreSearch === null) {
                    return <TableRow>
                            <TableCell component="th" scope="row">
                                <TextField value={movieState} onChange={(c) => setMovieState(c.target.value)}></TextField>
                            </TableCell>
                            <TableCell align="right"><TextField value={directorState} onChange={(c) => setDirectorState(c.target.value)}></TextField></TableCell>
                            <TableCell align="right"><TextField value={yearState} onChange={(c) => setYearState(c.target.value)}></TextField></TableCell>
                            <TableCell align="right"><TextField value={genreState} onChange={(c) => setGenreState(c.target.value.replace(/\/+$/, '-'))}></TextField></TableCell>
                            <Button onClick={() => setRowsHaveChanged(true)}>Submit Movie</Button>
                    </TableRow>
                }
            })()}
            {rows.map((row) => (
                <TableRow>
                    <TableCell component="th" scope="row">{row.movieTitle}</TableCell>
                    <TableCell align="right">{row.director}</TableCell>
                    <TableCell align="right">{row.year}</TableCell>
                    <TableCell align="right">{row.genre}</TableCell>
                    {(() => {
                        if (isFullHistory && genreSearch === null) {
                            return <Button onClick={() => setItemToDelete({movieID: row.ID, genre: row.genre})}>Remove</Button>
                        }
                    })()}
                </TableRow>
            ))}
        </TableBody>
    </Table>
</TableContainer>
</div>
    )
}
