import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Segment, Header, Card, Icon, Button } from 'semantic-ui-react';
import { getClasses, selectClassStateById, selectClassStateByName } from './classSlice';
import TopicsShow from './topic/TopicsShow.jsx';
import { changeNavbarPage } from '@components/navbar/navbarSlice';

// this is the base for the class, shows ways to study it and general information
export default function ClassShow() {
  const dispatch = useDispatch();

  const { class_name: name } = useParams();
  const { classes: curClass } = useSelector(selectClassStateByName(name));
  // get class data for my class if none

  if (!curClass) return null;
  return (
    <Segment>
      <Header as='h2' icon>
        {curClass.name}
        <Header.Subheader>Category: {curClass.category}</Header.Subheader>
      </Header>

      <p>{curClass.description}</p>

      <Header as='h3'>Choose your way to Study</Header>
      <Button onClick={() => dispatch(changeNavbarPage('topic'))}>By Topic</Button>
    </Segment>
  );
}
