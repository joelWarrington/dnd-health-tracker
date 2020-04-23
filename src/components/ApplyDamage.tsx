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
  Container,
  Radio,
} from 'semantic-ui-react';
import { api } from '../api/dndapi';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import ActiveMonsters from './ActiveMonsters';

interface MyProps {}
interface MyState {
  selectedGroups: Array<string>;
  selectedMonsters: Array<string>;
  selectionType: string;
  damageType: string;
  damageTypes: Array<Object>;
  damage: string;
}

class ApplyDamageToMonsters extends React.Component<MyProps, MyState> {
  static contextType = AppContext;
  constructor(props: any) {
    super(props);
    this.state = {
      selectedMonsters: [],
      selectedGroups: [],
      selectionType: 'monster',
      damageType: '',
      damageTypes: [
        { value: 'acid', text: 'Acid' },
        { value: 'bludgeoning', text: 'Bludgeoning' },
        { value: 'cold', text: 'Cold' },
        { value: 'fire', text: 'Fire' },
        { value: 'force', text: 'Force' },
        { value: 'lightning', text: 'Lightning' },
        { value: 'necrotic', text: 'Necrotic' },
        { value: 'piercing', text: 'Piercing' },
        { value: 'poison', text: 'Poison' },
        { value: 'psychic', text: 'Psychic' },
        { value: 'radiant', text: 'Radiant' },
        { value: 'slashing', text: 'Slashing' },
        { value: 'thunder', text: 'Thunder' },
      ],
      damage: '',
    };
  }
  componentDidMount() {}
  formatGroups() {
    return _.map(this.context.monsterGroupings, (group) => {
      return { value: group.value, text: group.text };
    });
  }
  handleGroupChange = (e: any, { value }: { value: any }) => {
    this.setState({ selectedGroups: value });
  };
  formatActiveMonsters() {
    return _.map(this.context.activeMonsters, (monster, index) => {
      return { value: monster.id, text: `${index + 1}. ${monster.details.name}` };
    });
  }
  handleMonsterChange = (e: any, { value }: { value: any }) => {
    this.setState({ selectedMonsters: value });
  };
  handleHPChange = (e: any, { value }: { value: any }) => {
    this.setState({ damage: value });
  };
  handleDamageTypeChange = (e: any, { value }: { value: any }) => {
    this.setState({ damageType: value });
  };
  handleSelectionChange = (e: any, value: any) => {
    this.setState({ selectionType: value });
  };
  handleFormSubmission = (e: any) => {
    let filtered: Array<Object>;
    if (this.state.selectionType == 'monster') {
      _.each(this.state.selectedMonsters, (id) => {
        const monster = _.filter(this.context.activeMonsters, ['id', id])[0];
        monster.hit_points = monster.hit_points - parseInt(this.state.damage);
        this.context.activeMonstersDispatch({ type: 'UPDATE_MONSTER', id, monster });
      });
    } else {
      _.each(this.state.selectedGroups, (group) => {
        const monsters = _.filter(this.context.activeMonsters, ['group', group]);
        _.each(monsters, (monster) => {
          const id = monster.id;
          monster.hit_points = monster.hit_points - parseInt(this.state.damage);
          this.context.activeMonstersDispatch({ type: 'UPDATE_MONSTER', id, monster });
        });
      });
    }
  };

  render() {
    const rowAlignCenter = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
    };
    return (
      <>
        <Header as="h1">Apply damage to monsters</Header>
        <Form onSubmit={this.handleFormSubmission}>
          <Form.Group>
            <Form.Field>
              <Radio
                label="Monster Selection"
                name="radioGroup"
                value="monster"
                defaultChecked
                checked={this.state.selectionType === 'monster'}
                onChange={(e, { value }) => {
                  this.handleSelectionChange(e, value);
                }}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="Group Selection"
                name="selectionType"
                value="group"
                checked={this.state.selectionType === 'group'}
                onChange={(e, { value }) => {
                  this.handleSelectionChange(e, value);
                }}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group style={rowAlignCenter}>
            <Form.Field
              multiple
              clearable
              control={Select}
              noResultsMessage="No results."
              onChange={
                this.state.selectionType === 'monster'
                  ? this.handleMonsterChange
                  : this.handleGroupChange
              }
              options={
                this.state.selectionType === 'monster'
                  ? this.formatActiveMonsters()
                  : this.formatGroups()
              }
              placeholder={
                this.state.selectionType === 'monster' ? 'Select monsters' : 'Select groups'
              }
              value={
                this.state.selectionType === 'monster'
                  ? this.state.selectedMonsters
                  : this.state.selectedGroups
              }
              search
              label={this.state.selectionType === 'monster' ? 'Monsters' : 'Groups'}
            ></Form.Field>
            <Form.Input
              label="Damage Type"
              clearable
              control={Select}
              noResultsMessage="That type doesn't exist!"
              onChange={this.handleDamageTypeChange}
              options={this.state.damageTypes}
              placeholder="Select damage type"
              value={this.state.damageType}
              search
            />
            <Form.Input
              label="Damage"
              icon="heart"
              iconPosition="left"
              onChange={this.handleHPChange}
              placeholder="HP"
              type="number"
              value={this.state.damage}
            />
            <Form.Input control={Button} icon="checkmark" positive circular type="submit" />
          </Form.Group>
        </Form>
        <Divider />
      </>
    );
  }
}

export default ApplyDamageToMonsters;
