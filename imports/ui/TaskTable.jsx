import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { Task } from '../api/TasksCollection';

const headCells = [
  {
    id: 'text',
    numeric: false,
    disablePadding: true,
    label: 'Task',
  },
  {
    id: 'completed',
    numeric: true,
    disablePadding: false,
    label: 'Completed',
  }
];

function EnhancedTableHead() {

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" />
          
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left'
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >{headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function TaskTable({tasks}) {
  const [rows, setRows] = useState([])
  
  useEffect(() => {
    setRows(tasks);
  },[tasks])

  const handleClick = async (event, row) => {

    const taskToUpdate = await Task.findOne(row._id)
    await taskToUpdate.toggleComplete();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead/>
            <TableBody>
              {rows.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row._id}
                      selected={row.completed}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={row.completed}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        width='40%'
                      >
                        {row.text}
                      </TableCell>
                      <TableCell 
                        align="left" 
                        padding={'normal'}
                        width='50%'
                      >
                        {row.completed ? "done" : "needs to be done" }
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

