import React, { useState, createContext, useReducer } from 'react';
import monsterReducer from './reducers/monsterReducer';
import activeMonsterReducer from './reducers/activeMonsterReducer';

export interface AppContextInterface {
  monsters: Array<Object | null>;
  activeMonsters: Array<Object | null>;
  monsterDispatch: any;
  activeMonsterDispatch: any;
}
export const AppContext = createContext<AppContextInterface | null>(null);

export const AppContextProvider = (props: { children: React.ReactNode }) => {
  const [monsters, monsterDispatch] = useReducer(monsterReducer, []);
  const [activeMonsters, activeMonsterDispatch] = useReducer(activeMonsterReducer, []);

  return (
    <AppContext.Provider
      value={{ monsters, monsterDispatch, activeMonsters, activeMonsterDispatch }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
