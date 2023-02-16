import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const headCells = [
    {
      id: 'username',
      numeric: false,
      disablePadding: true,
      label: 'Username',
    },
    {
        id: 'firstName',
        numeric: false,
        disablePadding: true,
        label: 'First Name',
    },
    {
        id: 'lastName',
        numeric: false,
        disablePadding: true,
        label: 'Last Name',
    },
    {
      id: 'admin',
      numeric: true,
      disablePadding: false,
      label: 'Adminstrator',
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

export const UsersTable = ({users})=> {
    const [rows, setRows] = useState([])
    
    useEffect(() => {
      setRows(users);
    },[users])
  
    const handleDelete = async (event, row) => {
        console.log(row._id, row.profile.admin);
        const {_id, profile: {admin}}= row;
        Meteor.call("user.deleteUser", _id, admin, (err,res) => {
            if(!err){
                return res
            }
            else {
                console.log(err)
            }
        });
    
    };
  
    return (
    <>
       <Typography
            variant="h4"
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'secondary',
              textDecoration: 'none',
            }}
          >
            Users
        </Typography> 
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
                        onClick={(event) => handleDelete(event, row)}
                        key={row._id} 
                      >
                        <TableCell padding="checkbox">
                            <Button>
                                <DeleteIcon />
                            </Button>
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.username}
                        </TableCell>
                        <TableCell 
                          align="left" 
                          padding={'normal'}
                        >
                          {row.firstName }
                        </TableCell>
                        <TableCell 
                          align="left" 
                          padding={'normal'}
                        >
                          {row.lastName }
                        </TableCell>
                        <TableCell 
                          align="left" 
                          padding={'normal'}
                        >
                          {row.profile.admin ? ("true"):("false") }
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
    );
  }

