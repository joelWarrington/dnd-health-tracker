/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext } from 'react';
import { AppContextProvider, AppContext } from '../AppContext';
import {
  Menu,
  Container,
  Image,
  Grid,
  Segment,
  Dimmer,
  Loader,
  Header,
  Modal,
  Button,
  Icon,
  Form,
  Card,
  Statistic,
  Divider,
  Label,
  Popup,
  Placeholder,
} from 'semantic-ui-react';
import _ from 'lodash';

function MonsterDetailsModal() {
  const context = useContext(AppContext);
  const selectedMonster = context?.selectedMonsterDetails;

  return (
    <Modal
      open={context?.monsterDetailsSelected}
      onClose={() => {
        context?.selectMonsterDetails(false);
      }}
      dimmer
      closeIcon
    >
      <Modal.Header>{selectedMonster?.details.name}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {selectedMonster?.details?.custom != 'yes' ? (
            <p style={{ fontStyle: 'italic' }}>
              {selectedMonster?.details?.size} {selectedMonster?.details?.type},{' '}
              {selectedMonster?.details?.alignment}
            </p>
          ) : (
            <p style={{ fontStyle: 'italic' }}>Custom monster</p>
          )}

          {/* <Form>
            <Form.Group>
              <Form.Input icon="shield" iconPosition="left" />
              <Form.Input icon="heart" iconPosition="left" />
              <Form.Input icon="tachometer alternate" iconPosition="left" />
            </Form.Group>
          </Form> */}
          <Popup
            inverted
            trigger={
              <Label size="large">
                <Icon name="shield" />
                {selectedMonster.details?.armor_class}
              </Label>
            }
          >
            Armor Class
          </Popup>
          <Popup
            inverted
            trigger={
              <Label size="large">
                <Icon name="heart" />
                {selectedMonster.details?.hit_points}
              </Label>
            }
          >
            Hit Points
          </Popup>
          {/* <Popup
            inverted
            trigger={
              <Label size="large">
                <Icon name="tachometer alternate" />
                {JSON.stringify(selectedMonster.details?.speed)}
              </Label>
            }
          >
            Speed
          </Popup> */}
          <Divider />
          <Container textAlign="center">
            <Statistic size="tiny">
              <Statistic.Label>STR</Statistic.Label>
              <Statistic.Value>
                {selectedMonster.details?.strength} (+
                {_.floor((selectedMonster.details?.strength - 10) / 2)})
              </Statistic.Value>
            </Statistic>
            <Statistic size="tiny">
              <Statistic.Label>DEX</Statistic.Label>
              <Statistic.Value>
                {selectedMonster.details?.dexterity} (+
                {_.floor((selectedMonster.details?.dexterity - 10) / 2)})
              </Statistic.Value>
            </Statistic>
            <Statistic size="tiny">
              <Statistic.Label>CON</Statistic.Label>
              <Statistic.Value>
                {selectedMonster.details?.constitution} (+
                {_.floor((selectedMonster.details?.constitution - 10) / 2)})
              </Statistic.Value>
            </Statistic>
            <Statistic size="tiny">
              <Statistic.Label>INT</Statistic.Label>
              <Statistic.Value>
                {selectedMonster.details?.intelligence} (+
                {_.floor((selectedMonster.details?.intelligence - 10) / 2)})
              </Statistic.Value>
            </Statistic>
            <Statistic size="tiny">
              <Statistic.Label>WIS</Statistic.Label>
              <Statistic.Value>
                {selectedMonster.details?.wisdom} (+
                {_.floor((selectedMonster.details?.wisdom - 10) / 2)})
              </Statistic.Value>
            </Statistic>
            <Statistic size="tiny">
              <Statistic.Label>CHA</Statistic.Label>
              <Statistic.Value>
                {selectedMonster.details?.charisma}(+
                {_.floor((selectedMonster.details?.charisma - 10) / 2)})
              </Statistic.Value>
            </Statistic>
          </Container>
          {/* <Form>
            <Form.Group widths="equal">
              <Form.Input fluid label="Strength" type="number" />
              <Form.Input fluid label="Dexterity" type="number" />
              <Form.Input fluid label="Constitution" type="number" />
              <Form.Input fluid label="Intelligence" type="number" />
              <Form.Input fluid label="Wisdom" type="number" />
              <Form.Input fluid label="Charisma" type="number" />
            </Form.Group>
          </Form> */}
          <Divider />
          <Header size="medium">Reactions</Header>
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
          <Header size="medium">Actions</Header>
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
          <Header size="medium">Legendary Actions</Header>
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        {/* <Button
          positive
          icon
          labelPosition="right"
          onClick={() => {
            context?.selectMonsterDetails(false);
          }}
        >
          Edit <Icon name="pencil" />
        </Button>
        <Button
          positive
          icon
          labelPosition="right"
          onClick={() => {
            context?.selectMonsterDetails(false);
          }}
        >
          Save <Icon name="check" />
        </Button>
        <Button
          negative
          icon
          labelPosition="right"
          onClick={() => {
            context?.selectMonsterDetails(false);
          }}
        >
          Cancel <Icon name="delete" />
        </Button>
        <Button
          negative
          icon
          labelPosition="right"
          onClick={() => {
            context?.selectMonsterDetails(false);
          }}
        >
          Delete <Icon name="trash" />
        </Button> */}
      </Modal.Actions>
    </Modal>
  );
}
export default MonsterDetailsModal;
