import { Segment, Header, Container, Grid, Card } from 'semantic-ui-react';
import libraryComputerDucks from '/img/home/library_computer_ducks.webp';
import extensiveDucks from '/img/home/extensive_ducks.webp';
import kiteDuck from '/img/home/duck_kite.webp';
export default function KeyFeatures() {
  const features = [
    {
      icon: extensiveDucks,
      title: 'Extensive Exam Bank',
      description: 'Access exams from various schools and classes.',
    },
    {
      icon: libraryComputerDucks,
      title: 'Effective Studying',
      description: 'Study relevant exam questions from past exams with ease.',
    },
    {
      icon: kiteDuck,
      title: 'AI Exam Parser',
      description: 'Easily convert past exams into studyable content.',
    },
  ];
  return (
    <Segment style={{ padding: '8em 1em', backgroundColor: '#f9f9f9' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em', textAlign: 'center' }}>
          Key Features
        </Header>
        <Grid stackable columns={3} style={{ marginTop: '3em' }} divided='vertically'>
          {features.map((feature, index) => (
            <Grid.Column key={index}>
              <Card fluid raised>
                <img
                  alt='quackprep informative'
                  height={215}
                  width={215}
                  loading='lazy'
                  src={feature.icon}
                  style={{
                    width: '100%',
                    maxHeight: '215px',
                    objectFit: 'cover',
                  }}
                />
                <Card.Content textAlign='center'>
                  <Card.Header>{feature.title}</Card.Header>
                  <Card.Description>{feature.description}</Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid>
      </Container>
    </Segment>
  );
}
