const monsterReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'ADD_FETCHED_MONSTERS':
      return action.monsters;
    default:
      return state;
  }
};
export default monsterReducer;
