import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import History from '@mui/icons-material/History';
import Person from '@mui/icons-material/Person';
import { useForm, Controller } from 'react-hook-form';
import { useVisitorContext } from '../contexts/VisitorContext';
import { v4 as uuidv4 } from 'uuid';
import { Visitor } from '../types';

type FormValues = {
  name: string;
  email: string;
  department: string;
  agree: boolean;
};

const AddVisitor: React.FC = () => {
  const { visitors, setVisitors } = useVisitorContext();

  const { control, register, reset, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      department: '',
      agree: false
    }
  });

  const onReset = () => {
    reset({
      name: '',
      email: '',
      department: '',
      agree: false
    });
  }

  const onSubmit = (
    params: {
      name: string;
      email: string;
      department: string;
    }
  ) => {
    setVisitors([...visitors, {...params, id: uuidv4()} as Visitor]);
    onReset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box width={'450px'}>
        <Card
          elevation={3}
          sx={{
            width: '100%',
            padding: '16px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}
        >
          <Box>
            <Typography variant='h6'>
              Add new visitor
            </Typography>
            <Typography
              variant='h6'
              sx={{
                fontSize: '16px',
                fontWeight: 400
              }}
            >
              Fill name, email address and the department.
            </Typography>
          </Box>
          <TextField
            {...register('name', {
              required: 'Full name is required'
            })}
            label='Full name'
            name='name'
            variant='outlined'
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            {...register('email', {
              required: 'Email address is required'
            })}
            label='Email address'
            name='email'
            variant='outlined'
            type='email'
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Controller
            name="department"
            control={control}
            defaultValue=""
            rules={{ required: 'Department is required' }}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id="select-department" error={!!errors.department}>Department</InputLabel>
                <Select
                  {...field}
                  label='Department'
                  variant='outlined'
                  error={!!errors.department}
                >
                  <MenuItem value=''>&nbsp;</MenuItem>
                  <MenuItem value='IT'>IT</MenuItem>
                  <MenuItem value='Management'>Management</MenuItem>
                  <MenuItem value='Accounting'>Accounting</MenuItem>
                  <MenuItem value='Marketing'>Marketing</MenuItem>
                  <MenuItem value='Sales'>Sales</MenuItem>
                </Select>
                {!!errors.department && <FormHelperText id="select-department-error" error>
                  {errors.department?.message}
                </FormHelperText>}
              </FormControl>
            )}
          />

          <Controller
            name='agree'
            control={control}
            defaultValue={false}
            rules={{ required: 'Please check to add visitor' }}
            render={({ field }) => (
              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      color="primary"
                    />
                  }
                  label="I agree to be added to the table."
                />
                {!!errors.agree && <FormHelperText id="select-department-error" error>
                  {errors.agree?.message}
                </FormHelperText>}
              </FormControl>
            )}
          />
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Button
              color='warning'
              variant='outlined'
              startIcon={<History />}
              sx={{
                borderRadius: '30px',
                width: '155px',
                borderColor: '#EF5742',
                color: '#EF5742'
              }}
              type='button'
              onClick={onReset}
            >
              RESET FORM
            </Button>
            <Button
              color='warning'
              variant='contained'
              startIcon={<Person />}
              sx={{
                borderRadius: '30px',
                width: '247px',
                backgroundColor: '#EF5742'
              }}
              type='submit'
            >
              ADD NEW VISITOR
            </Button>
          </Box>
        </Card>
      </Box>
    </form>
  );
}

export default AddVisitor;