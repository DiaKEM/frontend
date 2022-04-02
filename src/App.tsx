import { PhotoCamera } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './core/redux/store';

export const App = () => (
  <Provider store={store}>
    <div className="App">
      <Button variant="contained" color="secondary">
        ASD
      </Button>
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        size="small"
      >
        <PhotoCamera />
      </IconButton>
    </div>
  </Provider>
);
