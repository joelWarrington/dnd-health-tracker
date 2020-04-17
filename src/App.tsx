/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import AddMonster from './components/AddMonster';
import './App.scss';
import { AppContextProvider } from './AppContext';

function App() {
  return (
    <AppContextProvider>
      <AddMonster />
    </AppContextProvider>
  );
}

export default App;
