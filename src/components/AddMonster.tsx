import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext';
import { Form, Header, Dropdown, Label, Input, Icon, Select, Button } from 'semantic-ui-react';
import { api } from '../api/dndapi';
import _ from 'lodash';

class AddMonster extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  static contextType = AppContext;
  componentDidMount() {
    this.fetch();
  }

  async fetch() {
    const monsters = await api.getMonsters();
    const monstersAfterMap = _.map(monsters, (monster) => {
      return this.renameKeys({ index: 'value', name: 'text' }, monster);
    });
    this.context.monsterDispatch({ type: 'ADD_FETCHED_MONSTERS', monsters: monstersAfterMap });
  }

  renameKeys = (keysMap: any, obj: any) =>
    Object.keys(obj).reduce(
      (acc, key) => ({
        ...acc,
        ...{ [keysMap[key] || key]: obj[key] },
      }),
      {}
    );

  render() {
    return (
      <section>
        <Header as="h1">Add a monster to encounter</Header>
        <Form>
          <Form.Group>
            <Form.Field
              control={Select}
              fluid
              search
              allowAdditions
              clearable
              options={this.context.monsters}
              placeholder="Select a monster"
              width={4}
              onChange={(evt: any, data: any) => {
                console.log(data.value);
              }}
            ></Form.Field>
            <Form.Input icon="heart" placeholder="HP" iconPosition="left" width={2} fluid />
            <Form.Input
              control={Select}
              fluid
              search
              allowAdditions
              clearable
              options={[]}
              placeholder="Select grouping"
              width={4}
            />
            <Form.Input control={Button} icon="checkmark" positive circular />
            <Form.Input control={Button} icon="cancel" negative circular />
          </Form.Group>
        </Form>
      </section>
    );
  }
}

export default AddMonster;
