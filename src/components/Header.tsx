import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Favorite from '@mui/icons-material/Favorite';

const Header = () => {
  return (
    <AppBar position='static'>
      <Paper elevation={0}>
        <Toolbar sx={{
          backgroundColor: '#EF5742',
          color: 'white'
        }}>
          <Favorite />
          <Typography variant='h6' ml={'8px'}>
            Application
          </Typography>
        </Toolbar>
      </Paper>
    </AppBar>
  );
}

export default Header;