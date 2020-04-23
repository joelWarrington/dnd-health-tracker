import React, { createContext, useReducer, useState } from 'react';
import monsterReducer from './reducers/monsterReducer';
import activeMonsterReducer from './reducers/activeMonsterReducer';
import monsterGroupingsReducer from './reducers/monsterGroupingsReducer';

export interface AppContextInterface {
  monsters: Array<Object | null>;
  activeMonsters: Array<Object | null>;
  monsterGroupings: Array<string | null>;
  loadedMonsters: boolean;
  monsterLoadingComplete: any;
  monsterDispatch: any;
  activeMonstersDispatch: any;
  monsterGroupingsDispatch: any;
  selectedMonsterDetails: any;
  updateSelectedMonster: any;
  monsterDetailsSelected: boolean;
  selectMonsterDetails: any;
}
export const AppContext = createContext<AppContextInterface | null>(null);

export const AppContextProvider = (props: { children: React.ReactNode }) => {
  const [monsters, monsterDispatch] = useReducer(monsterReducer, []);
  const [activeMonsters, activeMonstersDispatch] = useReducer(activeMonsterReducer, []);
  const [monsterGroupings, monsterGroupingsDispatch] = useReducer(monsterGroupingsReducer, []);
  const [selectedMonsterDetails, updateSelectedMonster] = useState(null);
  const [monsterDetailsSelected, selectMonsterDetails] = useState(false);
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
        selectMonsterDetails,
        updateSelectedMonster,
        selectedMonsterDetails,
        monsterDetailsSelected,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
