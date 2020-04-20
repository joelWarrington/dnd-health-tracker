import React, { createContext, useReducer, useState } from 'react';
import monsterReducer from './reducers/monsterReducer';
import activeMonsterReducer from './reducers/activeMonsterReducer';
import monsterGroupingsReducer from './reducers/monsterGroupingsReducer';

export interface AppContextInterface {
  monsters: Array<Object | null>;
  activeMonsters: Array<Object | null>;
  monsterGroupings: any;
  loadedMonsters: boolean;
  monsterLoadingComplete: any;
  monsterDispatch: any;
  activeMonstersDispatch: any;
  monsterGroupingsDispatch: any;
}
export const AppContext = createContext<AppContextInterface | null>(null);

export const AppContextProvider = (props: { children: React.ReactNode }) => {
  const [monsters, monsterDispatch] = useReducer(monsterReducer, []);
  const [activeMonsters, activeMonstersDispatch] = useReducer(activeMonsterReducer, []);
  const [monsterGroupings, monsterGroupingsDispatch] = useReducer(monsterGroupingsReducer, []);
  const [loadedMonsters, monsterLoadingComplete] = useState(false);

  return (
    <AppContext.Provider
      value={{
        monsters,
        monsterDispatch,
        activeMonsters,
        activeMonstersDispatch,
        monsterGroupings,
        monsterGroupingsDispatch,
        loadedMonsters,
        monsterLoadingComplete,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
