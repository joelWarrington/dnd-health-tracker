import React, { useState, createContext } from 'react';

export interface AppContextInterface {
  monsters: Array<Object | null>;
  activeMonsters: Array<Object | null>;
  fetchMonsters: any;
  addMonster: any;
}
export const AppContext = createContext<AppContextInterface | null>(null);

export const AppContextProvider = (props: { children: React.ReactNode }) => {
  const [monsters, fetchMonsters] = useState([]);
  const [activeMonsters, addMonster] = useState([]);

  return (
    <AppContext.Provider value={{ monsters, fetchMonsters, activeMonsters, addMonster }}>
      {props.children}
    </AppContext.Provider>
  );
};
