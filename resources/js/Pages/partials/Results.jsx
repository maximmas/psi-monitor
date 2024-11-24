import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function Results({results, url}) {

    return (
        <TableContainer component={Paper} sx={{mt: 3}}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>URL</TableCell>
                        <TableCell align="right">Largest&nbsp;Contentful&nbsp;Paint</TableCell>
                        <TableCell align="right">First&nbsp;Contentful&nbsp;Paint</TableCell>
                        <TableCell align="right">Total&nbsp;Blocking&nbsp;Time</TableCell>
                        <TableCell align="right">Speed&nbsp;Index</TableCell>
                        <TableCell align="right">Cumulative&nbsp;Layout&nbsp;Shift</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                        <TableCell component="th" scope="row">
                            {url}
                        </TableCell>
                        <TableCell align="right">{results.lcp}</TableCell>
                        <TableCell align="right">{results.fcp}</TableCell>
                        <TableCell align="right">{results.tbt}</TableCell>
                        <TableCell align="right">{results.si}</TableCell>
                        <TableCell align="right">{results.cls}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
