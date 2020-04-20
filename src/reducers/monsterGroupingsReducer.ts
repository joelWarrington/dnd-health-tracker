const monsterGroupingsReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'ADD_GROUP':
      return [...state, action.group];
    default:
      return state;
  }
};
export default monsterGroupingsReducer;
