import React from 'react';
import Table from '@material-ui/core/Table'
import { TableBody, TableCell, TableContainer, TableRow, TableHead, TextField, Button } from '@material-ui/core';
var RowHandler = require('./rowData.tsx').RowHandler;

export function MusicTable() {
    const rows = RowHandler();

    return (
    <TableContainer>
        <Table stickyHeader>
        <TableHead>
            <TableRow>
                <TableCell>Song Title</TableCell>
                <TableCell align="right">Album</TableCell>
                <TableCell align="right">Artist</TableCell>
                <TableCell align="right">Genre</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {rows.map((row) => (
                <TableRow>
                    <TableCell component="th" scope="row">{row.songName}</TableCell>
                    <TableCell align="right">{row.album}</TableCell>
                    <TableCell align="right">{row.artist}</TableCell>
                    <TableCell align="right">{row.genre}</TableCell>
                </TableRow>
            ))}
            <TableRow>
                    <TableCell component="th" scope="row">
                        <TextField></TextField>
                    </TableCell>
                    <TableCell align="right"><TextField></TextField></TableCell>
                    <TableCell align="right"><TextField></TextField></TableCell>
                    <TableCell align="right"><TextField></TextField></TableCell>
                    <Button>Submit Song</Button>
            </TableRow>
        </TableBody>
    </Table>
</TableContainer>
    )
}
