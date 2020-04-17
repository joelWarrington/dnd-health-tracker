/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext } from 'react';
import AddMonster from './components/AddMonster';
import './App.scss';
import { AppContextProvider, AppContext } from './AppContext';
import { Menu, Container, Image, Grid, Segment } from 'semantic-ui-react';

function App() {
  return (
    <>
      <AppContextProvider>
        <Menu borderless size="small" fluid inverted>
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
          <Grid columns="equal" padded="horizontally" divided>
            <Grid.Column>
              <Grid.Row>
                <AddMonster />
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Container>
      </AppContextProvider>
    </>
  );
}

export default App;
