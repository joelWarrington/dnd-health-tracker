import _ from 'lodash';
import React, { useState } from 'react';
import { AppContext } from '../AppContext';
import './ActiveMonsters.scss';
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

  render() {
    const monsters = _.map(this.context.activeMonsters, (monster, index) => {
      console.log(monster);
      return (
        <Grid.Row key={monster.id}>
          <Grid.Column mobile={16} computer={8}>
            <Popup
              inverted
              trigger={
                <Label
                  as="a"
                  size="large"
                  color="teal"
                  onClick={() => {
                    console.log('hi');
                  }}
                >
                  {`${index + 1}. ${monster.details.name}`}
                </Label>
              }
            >
              View Monster Details
            </Popup>
            <Popup inverted trigger={<Label size="medium" content={monster.details.size} />}>
              Size
            </Popup>
            <Popup
              inverted
              trigger={<Label size="medium" icon="shield" content={monster.details.armor_class} />}
            >
              Armor Class
            </Popup>
          </Grid.Column>
          <Grid.Column mobile={16} computer={8} floated="right">
            <Form>
              <Form.Group>
                <Form.Input
                  icon="heart"
                  iconPosition="left"
                  placeholder="HP"
                  type="number"
                  fluid
                  onChange={(e, obj) => {
                    console.log(e);
                    console.log(obj);
                  }}
                  value={monster.hitPoints}
                  id={monster.id}
                  width={8}
                />
                <Form.Input
                  additionLabel="Add group: "
                  allowAdditions
                  clearable
                  control={Select}
                  noResultsMessage="Add a new group!"
                  // onAddItem={this.handleGroupAddition}
                  // onChange={this.handleGroupChange}
                  options={this.context.monsterGroupings}
                  placeholder="Select grouping"
                  value={monster.group}
                  search
                  width={8}
                />
                {/* <Form.Input
                  icon="shield"
                  iconPosition="left"
                  placeholder="AC"
                  type="number"
                  fluid
                  value={monster.details.armor_class}
                  id={monster.id}
                  onChange={(e, obj) => {
                    console.log(index);
                    console.log(e);
                    console.log(obj);
                  }}
                /> */}
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid.Row>
      );
    });
    return <Grid>{monsters}</Grid>;
  }
}

export default ActiveMonsters;
