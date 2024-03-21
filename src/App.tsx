import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Header from "./components/Header";
import AddVisitor from './components/AddVisitor';
import VisitorManagement from './components/VisitorManagement';
import { VisitorContextProvider } from './contexts/VisitorContext';

const App: React.FC = () => {
  return (
    <VisitorContextProvider>
      <div>
        <Header />
        <Box padding={[0, '24px']} gap={'24px'} display={'flex'}>
          <AddVisitor />
          <VisitorManagement />
        </Box>
      </div>
    </VisitorContextProvider>
  );
}

export default App;
