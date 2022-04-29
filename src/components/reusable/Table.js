import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Grid, TablePagination, Typography} from "@mui/material";
import PropTypes from "prop-types";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const CustomizedTable = (props) => {

    const columns = props.columns || []
    const rows = props.rows || []

    return (
        <Paper sx={{ width: '100%', height: props.height || 650, justifyContent: 'space-between' }}>
            <Grid container justifyContent={'space-between'} sx={{ width: '100%', height: props.height || 650 }}>
                <TableContainer sx={{ maxHeight: '100%' }}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {
                                    columns.map((column, i) => {
                                        return <StyledTableCell
                                            key={i}
                                            align={column.align || 'left'}
                                            sx={{ minWidth: column.minWidth || 150 }}
                                        >
                                            {column.headerName}
                                        </StyledTableCell>
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ overflow: 'auto' }}>
                            {
                                rows.map((row, index) => (
                                    <StyledTableRow key={index}>
                                        {
                                            columns.map((column, i) => {
                                                return <StyledTableCell
                                                    key={i}
                                                    align={column.align || 'left'}
                                                    sx={{ minWidth: column.minWidth || 150 }}
                                                >
                                                    {row[column.field]}
                                                </StyledTableCell>
                                            })
                                        }
                                    </StyledTableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                {!(rows && rows.length > 0) && (
                    <Grid
                        container
                        justifyContent='center'
                        sx={{ p: 2 }}
                    >
                        <Typography
                            component='h6'
                            variant='subtitle1'
                            align='center'
                        >
                            {props.noDataMessage || 'No Data Found'}
                        </Typography>
                    </Grid>
                )}
            </Grid>
            {props.enablePagination && (
                <Grid>
                    <TablePagination
                        rowsPerPageOptions={props.rowsPerPageOptions || [10, 25, 50]}
                        component='div'
                        count={props.rowCount || rows.length}
                        rowsPerPage={props.pageSize || 10}
                        page={props.page || 0}
                        onPageChange={props.onPageChange || (() => {})}
                        onRowsPerPageChange={props.onPageSizeChange || (() => {})}
                    />
                </Grid>
            )}
        </Paper>

    );
}
CustomizedTable.propTypes = {
    columns: PropTypes.array,
    rows: PropTypes.array,
    height: PropTypes.number,
    noDataMessage: PropTypes.string,
    enablePagination: PropTypes.bool,
    rowsPerPageOptions: PropTypes.array,
    rowCount: PropTypes.number,
    pageSize: PropTypes.number,
    page: PropTypes.number,
    onPageChange: PropTypes.func,
    onPageSizeChange: PropTypes.func,
};

export default CustomizedTable;
