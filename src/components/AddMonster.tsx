import React from 'react';
import { AppContext } from '../AppContext';
import {
  Form,
  Header,
  Dropdown,
  Label,
  Input,
  Icon,
  Select,
  Button,
  Message,
  Divider,
} from 'semantic-ui-react';
import { api } from '../api/dndapi';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

interface MyProps {}
interface MyState {
  selectedMonster: string;
  selectedGroup: Object;
  hitPoints: string;
}

class AddMonster extends React.Component<MyProps, MyState> {
  static contextType = AppContext;
  constructor(props: any) {
    super(props);
    this.state = {
      selectedMonster: '',
      selectedGroup: '',
      hitPoints: '',
    };
  }
  componentDidMount() {
    this.fetch();
  }
  async fetch() {
    const response = await api.getMonsters();
    const monsters = _.map(response, (monster) => {
      return this.renameKeys({ slug: 'value', name: 'text' }, monster);
    });
    this.context.monsterDispatch({ type: 'ADD_FETCHED_MONSTERS', monsters });
    this.context.monsterLoadingComplete(true);
  }
  renameKeys = (keysMap: any, obj: any) =>
    Object.keys(obj).reduce(
      (acc, key) => ({
        ...acc,
        ...{ [keysMap[key] || key]: obj[key] },
      }),
      {}
    );
  handleMonsterChange = async (e: any, { value }: { value: any }) => {
    try {
      this.setState({ selectedMonster: value });
      if (value != '') {
        const monster = await api.getMonster(value);
        if (monster != null) this.setState({ hitPoints: monster.hit_points.toString() });
      } else {
        this.setState({ hitPoints: '0' });
      }
    } catch (e) {}
  };
  handleMonsterAddition = (e: any, { value }: { value: any }) => {
    this.context.monsterDispatch({
      type: 'ADD_MONSTER',
      monster: { value, text: value },
    });
  };
  handleHPChange = (e: any, { value }: { value: any }) => {
    this.setState({ hitPoints: value });
  };

  handleGroupAddition = (e: any, { value }: { value: any }) => {
    this.context.monsterGroupingsDispatch({
      type: 'ADD_GROUP',
      group: { value, text: value },
    });
  };
  handleGroupChange = (e: any, { value }: { value: any }) => {
    this.setState({ selectedGroup: value });
  };

  handleFormSubmission = async () => {
    let monster;
    if (this.state.selectedMonster != '') {
      monster = await api.getMonster(this.state.selectedMonster);
      if (monster == null) {
        monster = {
          name: this.state.selectedMonster,
          size: '',
          hit_points: this.state.hitPoints,
          armor_class: 0,
          strength: 10,
          dexterity: 10,
          constitution: 10,
          intelligence: 10,
          wisdom: 10,
          charisma: 10,
          custom: 'yes',
        };
      }
      this.context.activeMonstersDispatch({
        type: 'ADD_MONSTER',
        monster: {
          id: uuidv4(),
          details: monster,
          hit_points: this.state.hitPoints,
          armor_class: monster.armor_class,
          group: this.state.selectedGroup,
        },
      });
    }
  };

  render() {
    const { selectedMonster, selectedGroup } = this.state;
    const rowAlignCenter = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
    };
    return (
      <>
        <Header as="h1">Add a monster to encounter</Header>
        <Form onSubmit={this.handleFormSubmission}>
          <Form.Group style={rowAlignCenter}>
            <Form.Field
              additionLabel="Add monster: "
              allowAdditions
              clearable
              control={Select}
              noResultsMessage="Add a new monster!"
              onAddItem={this.handleMonsterAddition}
              onChange={this.handleMonsterChange}
              options={this.context.monsters}
              placeholder="Select a monster"
              value={selectedMonster}
              search
              label="Monster"
            ></Form.Field>
            <Form.Input
              label="Hit Points"
              icon="heart"
              iconPosition="left"
              onChange={this.handleHPChange}
              placeholder="HP"
              type="number"
              value={this.state.hitPoints}
            />
            <Form.Input
              label="Group"
              additionLabel="Add group: "
              allowAdditions
              clearable
              control={Select}
              noResultsMessage="Add a new group!"
              onAddItem={this.handleGroupAddition}
              onChange={this.handleGroupChange}
              options={this.context.monsterGroupings}
              placeholder="Select grouping"
              value={selectedGroup}
              search
            />
            <Form.Input control={Button} icon="checkmark" positive circular type="submit" />
          </Form.Group>
        </Form>
        <Divider />
      </>
    );
  }
}

export default AddMonster;
