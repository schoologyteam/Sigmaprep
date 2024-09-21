import './home.css';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Header, Button, Icon, Grid, Segment, Card, Image } from 'semantic-ui-react';
import horse from '/img/horse.webp';
import { changeNavbarPage } from '@components/navbar/navbarSlice';
export default function Home() {
  const dispatch = useDispatch();
  return (
    <div style={{ width: '100%' }}>
      <div className='hero-section'>
        <Container textAlign='center'>
          <Header as='h1' className='hero-header'>
            Master Your Exams with Ease
          </Header>
          <p className='hero-subheader'>Practice questions, detailed explanations, and personalized learning just for you.</p>
          <Button color='purple' size='huge' onClick={() => dispatch(changeNavbarPage('/class'))}>
            Start Practicing
            <Icon name='right arrow' />
          </Button>
        </Container>
      </div>

      <Container className='features-section'>
        <Header as='h2' textAlign='center' style={{ color: '#9370db' }}>
          Key Features
        </Header>
        <Grid stackable columns={3}>
          <Grid.Column>
            <Card className='feature-card'>
              <Image src={horse} />
              <Card.Content>
                <Card.Header>Extensive Question Bank</Card.Header>
                <Card.Description>
                  Access a wide range of questions across multiple subjects to test your knowledge.
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card className='feature-card'>
              <Image src={horse} />{' '}
              <Card.Content>
                <Card.Header>Video Tutorials</Card.Header>
                <Card.Description>Learn from expert explanations and step-by-step video guides.</Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card className='feature-card'>
              <Image src={horse} />{' '}
              <Card.Content>
                <Card.Header>Track Your Progress</Card.Header>
                <Card.Description>Monitor your learning journey and identify areas for improvement.</Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </Container>

      <Segment inverted vertical className='testimonial-section'>
        <Container textAlign='center'>
          <Header as='h2' className='what-our-users-say-header'>
            What Our Users Say
          </Header>
          <p>
            "This platform has transformed the way I prepare for exams. The practice questions are top-notch!" - A Satisfied User
          </p>
          <p>"The video tutorials helped me understand complex topics with ease. Highly recommended!" - Another Happy Learner</p>
        </Container>
      </Segment>

      {/* Footer */}
      <Segment inverted vertical style={{ padding: '5em 0em' }}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={7}>
                <Header as='h4' inverted>
                  Follow Us
                </Header>
                <p>Stay connected on social media for updates and tips.</p>
              </Grid.Column>
              <Grid.Column width={7} textAlign='right'>
                <Button circular color='facebook' icon='facebook' />
                <Button circular color='twitter' icon='twitter' />
                <Button circular color='linkedin' icon='linkedin' />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </div>
  );
}
