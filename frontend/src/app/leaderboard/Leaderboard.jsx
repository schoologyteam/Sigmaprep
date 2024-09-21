import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Container, Header, Icon, Image, Grid } from 'semantic-ui-react';
import { getTopStreaks, getWhichUsersAnsweredMostQuestions, selectLeaderboardState } from './leaderboardSlice';
import './leaderboard.css';

const TOP_X_AMT = 5;

function createTableForLeaderboard(array, specializeItemName, headerElement) {
  // Improved styling
  const cellStyle = { width: '33%', textAlign: 'center' };

  return (
    <Grid.Column>
      {headerElement}
      <Table celled striped textAlign='center' size='large'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={cellStyle}>Rank</Table.HeaderCell>
            <Table.HeaderCell style={cellStyle}>Username</Table.HeaderCell>
            <Table.HeaderCell style={cellStyle}>{specializeItemName}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {array &&
            array.map((data, index) => (
              <Table.Row key={data.user_id}>
                <Table.Cell style={cellStyle}>{index + 1}</Table.Cell>
                <Table.Cell style={cellStyle}>{data.username}</Table.Cell>
                <Table.Cell style={cellStyle}>{data[specializeItemName]}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </Grid.Column>
  );
}

export default function Leaderboard() {
  const dispatch = useDispatch();
  const { streaks } = useSelector(selectLeaderboardState).leaderboard;
  const { questionsAnswered } = useSelector(selectLeaderboardState).leaderboard;

  useEffect(() => {
    if (!streaks) dispatch(getTopStreaks(TOP_X_AMT));
    if (!questionsAnswered) dispatch(getWhichUsersAnsweredMostQuestions());
  }, []);
  return (
    <Container>
      <Header as={'h1'} textAlign='center'>
        Leaderboard
        <Icon size='mini' name='trophy' color='yellow' className='cool-hover cool-click' />{' '}
      </Header>
      <Grid columns={2} stackable>
        {createTableForLeaderboard(
          streaks,
          'current_streak',
          <Header style={{ textAlign: 'center' }}>
            Highest Streak Holders <Icon name='fire' color='red' />
          </Header>,
        )}

        {createTableForLeaderboard(
          questionsAnswered,
          'questions_answered',
          <Header style={{ textAlign: 'center' }}>
            Most Questions Answered <Icon name='question' color='blue' />
          </Header>,
        )}
      </Grid>
    </Container>
  );
}
