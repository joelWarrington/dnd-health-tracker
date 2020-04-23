import _ from 'lodash';
import React, { useState } from 'react';
import { AppContext } from '../AppContext';
import './ActiveMonsters.module.scss';
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
  Container,
  Grid,
  Popup,
  Segment,
} from 'semantic-ui-react';

class ActiveMonsters extends React.Component {
  static contextType = AppContext;
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  handleHPChange = (e: any, value: string, id: string) => {
    const monster = _.filter(this.context.activeMonsters, ['id', id])[0];
    monster.hit_points = value;
    this.context.activeMonstersDispatch({
      type: 'UPDATE_MONSTER',
      id,
      monster,
    });
  };

  handleGroupAddition = (e: any, { value }: { value: any }) => {
    this.context.monsterGroupingsDispatch({
      type: 'ADD_GROUP',
      group: { value, text: value },
    });
  };
  handleGroupChange = (e: any, value: string, id: string) => {
    const monster = _.filter(this.context.activeMonsters, ['id', id])[0];
    monster.group = value;
    this.context.activeMonstersDispatch({
      type: 'UPDATE_MONSTER',
      id,
      monster,
    });
  };

  render() {
    const monsters = _.map(this.context.activeMonsters, (monster, index) => {
      return (
        <Grid.Row key={monster.id}>
          <Grid.Column mobile={16} tablet={16} computer={8}>
            <Popup
              inverted
              trigger={
                <Label
                  as="a"
                  size="large"
                  color="teal"
                  onClick={() => {
                    this.context.updateSelectedMonster(monster);
                    this.context.selectMonsterDetails(true);
                  }}
                >
                  {`${index + 1}. ${monster.details.name}`}
                </Label>
              }
            >
              Click to view the monsters details
            </Popup>
            {monster.details.size !== '' ? (
              <Popup inverted trigger={<Label size="medium" content={monster.details.size} />}>
                Size
              </Popup>
            ) : (
              <></>
            )}
            {monster.armor_class > 0 ? (
              <Popup
                inverted
                trigger={<Label size="medium" icon="shield" content={monster.armor_class} />}
              >
                Armor Class
              </Popup>
            ) : (
              <></>
            )}
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={8} floated="right">
            <Form>
              <Form.Group>
                <Form.Input
                  icon="heart"
                  iconPosition="left"
                  placeholder="HP"
                  type="number"
                  fluid
                  onChange={(e, { value }) => {
                    this.handleHPChange(e, value, monster.id);
                  }}
                  value={monster.hit_points}
                  id={monster.id}
                  width={8}
                />
                <Form.Input
                  additionLabel="Add group: "
                  allowAdditions
                  clearable
                  control={Select}
                  noResultsMessage="Add a new group!"
                  onAddItem={this.handleGroupAddition}
                  onChange={(e: any, { value }) => {
                    this.handleGroupChange(e, value, monster.id);
                  }}
                  options={this.context.monsterGroupings}
                  placeholder="Select grouping"
                  value={monster.group}
                  search
                  width={8}
                />
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid.Row>
      );
    });
    return <Grid divided="vertically">{monsters}</Grid>;
  }
}

export default ActiveMonsters;
