import React, { useState, useContext } from 'react';
import { Form, Header, Dropdown, Label, Input, Icon, Select, Button } from 'semantic-ui-react';

class AddMonster extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
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
              options={[]}
              placeholder="Select a monster"
              width={2}
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
              width={2}
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
