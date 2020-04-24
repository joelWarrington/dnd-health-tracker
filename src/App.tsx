/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext } from 'react';
import AddMonster from './components/AddMonster';
import './App.scss';
import { AppContextProvider, AppContext } from './AppContext';
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
} from 'semantic-ui-react';
import ActiveMonsters from './components/ActiveMonsters';
import MonsterDetailsModal from './components/MonsterDetailsModal';
import ApplyDamageToMonsters from './components/ApplyDamage';

function App() {
  const context = useContext(AppContext);
  return (
    <>
      <Menu borderless size="small" fluid inverted className="topMenu">
        <Container>
          <Menu.Item content="D&D Health Tracker" header />
          <Menu.Item
            as="a"
            position="right"
            href="https://github.com/joelWarrington/dnd-health-tracker"
            target="_blank"
          >
            <Image
              size="mini"
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              circular
            ></Image>
          </Menu.Item>
        </Container>
      </Menu>
      <Container>
        <Dimmer active={!context?.loadedMonsters}>
          <Loader indeterminate>Fetching Monsters & Dice</Loader>
        </Dimmer>
        {context?.selectedMonsterDetails != null ? <MonsterDetailsModal /> : <> </>}

        <Grid divided="vertically" container doubling>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <Grid.Row>
              <AddMonster />
            </Grid.Row>
            <Grid.Row>
              <ApplyDamageToMonsters />
            </Grid.Row>
            <Grid.Row>
              <ActiveMonsters />
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
}

export default App;
