import _ from 'lodash';

const activeMonsterReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'ADD_MONSTER':
      return [...state, action.monster];
    case 'UPDATE_MONSTER':
      return _.map(state, (monster, index) => {
        if (monster.id === action.id) return action.monster;
        else return monster;
      });
    default:
      return state;
  }
};
export default activeMonsterReducer;
