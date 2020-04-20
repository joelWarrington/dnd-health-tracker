const monsterReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'ADD_FETCHED_MONSTERS':
      return action.monsters;
    case 'ADD_MONSTER':
      return [...state, action.monster];
    default:
      return state;
  }
};
export default monsterReducer;
