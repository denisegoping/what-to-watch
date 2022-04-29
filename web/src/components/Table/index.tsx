import React from 'react';
import Table from '@material-ui/core/Table'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useEffect, useState } from 'react';
import { TableBody, TableCell, TableContainer, TableRow, TableHead, TextField, Button } from '@material-ui/core';
import { RowData } from '../../ducks/tableData';
import styled from 'styled-components';
var { useSelector, useDispatch } = require('react-redux');
const tableDataSelectors = require('../../ducks/tableData.tsx').tableDataSelectors;
var tableDataActions = require('../../ducks/tableData.tsx').tableDataActions;

export const BodyContainer = styled.div`
  justify-content: center;
  align-items: center;
  font-family: Georgia;
  margin-bottom: 10px;
`;

export function MovieTable() {

    const [isFullHistory, setIsFullHistory] = useState(false);
    const [rowsHaveChanged, setRowsHaveChanged] = useState(false);
    const [itemToDelete, setItemToDelete] = useState({ movieID: 0, genre: '' });
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
        console.log(genreSearch);
        if (genreSearch) {
            dispatch(tableDataActions.getGenreTableDataRequest({ genre: genreSearch }));
        } else {
            dispatch(requestAction);
        }
    }, [genreSearch, isFullHistory]);

    useEffect(() => {
        console.log(itemToDelete);
        dispatch(tableDataActions.removeTableDataRequest({ movieID: itemToDelete.movieID, genre: itemToDelete.genre }));
    }, [itemToDelete]);

    useEffect(() => {
        console.log('updating');
        if (movieState !== '' && directorState !== '' && yearState !== '' && genreState !== '') {
            dispatch(tableDataActions.addTableDataRequest({ movieTitle: movieState, director: directorState, year: yearState, genre: genreState }));
        }
        setMovieState('');
        setDirectorState('');
        setYearState('');
        setGenreState('');
        setRowsHaveChanged(false);
    }, [rowsHaveChanged]);

    return (
        <BodyContainer>
            <Button onClick={() => { setIsFullHistory(false); setGenreSearch(null); }}
                style={{ background: "#fcf2b1", margin: "5px 5px 10px 5%" }}>
                Latest 25 Movies
            </Button>
            <Button onClick={() => { setIsFullHistory(true); setGenreSearch(null); }}
                style={{ background: "#fcf2b1", margin: "5px 5px 10px 5px" }}>
                All Movies/Edit List
            </Button>
            {(() => {
                if (isFullHistory) {
                    return <div style={{ marginLeft: '5%', marginBottom: '10px', width: 300 }}><Autocomplete
                        value={genreSearch}
                        disablePortal={true}
                        options={genreList}
                        renderInput={(params) => <TextField {...params} label="Latest 25 Movies Per Genre" />}
                        onChange={(_event, newGenre) => { setGenreSearch(newGenre) }}
                    /></div>
                }
            })()}
            <div style={{ marginLeft: '5%', marginRight: '5%' }}>
                <TableContainer style={{ maxHeight: '78vh', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Movie</TableCell>
                                <TableCell align="right">Director</TableCell>
                                <TableCell align="right">Year</TableCell>
                                <TableCell align="right">Genre</TableCell>
                                {(() => {
                                    if (isFullHistory && genreSearch === null) {
                                        return <TableCell align="right">Action</TableCell>
                                    }
                                })()}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(() => {
                                if (isFullHistory && genreSearch === null) {
                                    return <TableRow>
                                        <TableCell style={{ background: '#ffffff' }} component="th" scope="row">
                                            <TextField value={movieState} onChange={(c) => setMovieState(c.target.value)}></TextField>
                                        </TableCell>
                                        <TableCell style={{ background: '#ffffff' }} align="right">
                                            <TextField value={directorState} onChange={(c) => setDirectorState(c.target.value)}></TextField>
                                        </TableCell>
                                        <TableCell style={{ background: '#ffffff' }} align="right">
                                            <TextField value={yearState} onChange={(c) => setYearState(c.target.value)}></TextField>
                                        </TableCell>
                                        <TableCell style={{ background: '#ffffff' }} align="right">
                                            <TextField value={genreState} onChange={(c) => setGenreState(c.target.value.replace(/\/+$/, '-'))}></TextField>
                                        </TableCell>
                                        {(() => {
                                            if (isFullHistory && genreSearch === null) {
                                                return <TableCell style={{ background: '#ffffff' }} align="right">
                                                    <Button style={{ background: '#fcf2b1', marginLeft: '10px' }} onClick={() => setRowsHaveChanged(true)}>Submit Movie</Button>
                                                </TableCell>
                                            }
                                        })()}
                                    </TableRow>
                                }
                            })()}
                            {rows.map((row) => (
                                <TableRow>
                                    <TableCell style={{ background: '#ffffff' }} component="th" scope="row">{row.movieTitle}</TableCell>
                                    <TableCell style={{ background: '#ffffff' }} align="right">{row.director}</TableCell>
                                    <TableCell style={{ background: '#ffffff' }} align="right">{row.year}</TableCell>
                                    <TableCell style={{ background: '#ffffff' }} align="right">{row.genre}</TableCell>
                                    {(() => {
                                        if (isFullHistory && genreSearch === null) {
                                            return <TableCell style={{ background: '#ffffff' }} align="right">
                                                <Button style={{ background: '#fcf2b1' }} onClick={() => setItemToDelete({ movieID: row.ID, genre: row.genre })}>Remove</Button>
                                            </TableCell>
                                        }
                                    })()}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </BodyContainer>
    )
}
