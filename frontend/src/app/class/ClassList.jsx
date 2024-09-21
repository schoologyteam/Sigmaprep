import { Segment, Grid, Header } from 'semantic-ui-react';
import ClassCard from './ClassCard';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectClassState } from './classSlice';

function mapClassesToClassCard(classes) {
  if (!classes) return null;
  return classes.map((cl) => (
    <Grid.Column style={{ maxWidth: 300 }} key={cl.id}>
      <ClassCard name={cl.name} desc={cl.description} category={cl.category} id={cl.id} />
    </Grid.Column>
  ));
}

export default function ClassList() {
  const { classes } = useSelector(selectClassState);

  return (
    <Segment
      basic
      style={{
        padding: '20px',
      }}
    >
      <Header>Choose One To Study</Header>
      <Grid
        columns={3}
        stackable
        style={{
          marginTop: '5px',
          marginBottom: '0px',
        }}
      >
        <Grid.Row
          style={{
            gap: '5px',
            padding: '0px',
          }}
        >
          {classes ? mapClassesToClassCard(classes) : null}
        </Grid.Row>
      </Grid>
    </Segment>
  );
}
