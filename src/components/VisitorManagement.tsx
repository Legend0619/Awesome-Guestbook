import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import { useVisitorContext } from '../contexts/VisitorContext';

const bgColor = {
  IT: '#7B1FA2',
  Management:'#1E88E5',
  Accounting: '#1B5E20',
  Marketing: '#EF6C00',
  Sales:'#01579B',
}

const VisitorManagement: React.FC = () => {
  const { visitors, setVisitors } = useVisitorContext();

  const [selected, setSelected] = React.useState<readonly string[]>([]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = visitors.map((visitor) => visitor.id);
      setSelected(newSelecteds);
    }
    else {
      setSelected([]);
    }
  }

  const handleClick = (_event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  }

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const onDelete = () => {
    let tmpVisitors = visitors.filter(visitor => selected.indexOf(visitor.id) === -1);
    setVisitors(tmpVisitors);
    setSelected([]);
  }

  return (
    <Box width={'calc(100% - 474px)'}>
      <Card
        elevation={3}
        sx={{
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <Box sx={{padding: '16px'}}>
          <Typography variant='h4'>
            Visitor Management
          </Typography>
        </Box>
        <Box>
          <Checkbox sx={{padding: '12px'}} color="primary" />
          <Button
            variant='contained'
            color='error'
            sx={{
              borderRadius: '30px',
              padding: '6px 16px'
            }}
            onClick={onDelete}
          >
            Remove
          </Button>
        </Box>
        <Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding='checkbox'>
                    <Checkbox
                      color='primary'
                      indeterminate={selected.length > 0 && selected.length < visitors.length}
                      checked={visitors.length > 0 && visitors.length === selected.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell align='left'>Visitor</TableCell>
                  <TableCell align='left'>Email</TableCell>
                  <TableCell align='right'>Department</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visitors.map(visitor => (
                  <TableRow
                    key={visitor.id}
                    hover
                    selected={isSelected(visitor.id)}
                    onClick={(event) => handleClick(event, visitor.id)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox color='primary' checked={isSelected(visitor.id)} />
                    </TableCell>
                    <TableCell align='left'>{visitor.name}</TableCell>
                    <TableCell align='left'>{visitor.email}</TableCell>
                    <TableCell align='right'>
                      <Box display={'flex'} justifyContent={'flex-end'}>
                        <Box
                          display={'flex'}
                          alignItems={'center'}
                          color={'white'}
                          padding={'3px 6px'}
                          bgcolor={bgColor[visitor.department]}
                          height={'24px'}
                          minWidth={'24px'}
                          maxWidth={'fit-content'}
                          borderRadius={'24px'}
                          fontSize={'13px'}
                          boxSizing={'border-box'}
                        >
                          {visitor.department}
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Card>
    </Box>
  );
}

export default VisitorManagement;