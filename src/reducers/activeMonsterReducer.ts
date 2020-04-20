const activeMonsterReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'ADD_MONSTER':
      return [...state, action.monster];
    default:
      return state;
  }
};
export default activeMonsterReducer;
