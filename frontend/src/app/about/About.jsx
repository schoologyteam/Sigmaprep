import { Container, Header, Grid, Image } from 'semantic-ui-react';
import CreatorInfo from './TeamCard.jsx';
import { contributors } from './contributors.js';

const About = () => {
  // add your stuff here if you contribute to the project

  return (
    <Container style={{ marginTop: '2em', marginBottom: '2em' }}>
      <Image src={'/img/quackprep_logo.webp'} centered size='small' style={{ marginBottom: '-5rem', zIndex: -1 }} />
      <Header as='h1' textAlign='center' style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
        About QuackPrep
      </Header>
      <p style={{ fontSize: '1.2rem', textAlign: 'center', marginBottom: '2rem', color: '#555' }}>
        When <strong>college students</strong> need to study for their exam, they go to past exams to study in order to see what
        the current exam will be like and practice what will actually be on the exam. Finding paid exams randomly online or on
        quizlet doesn't work because students can't pay for exams and quizlet never has the needed exams and if it does you can't
        easily find it. Students then study other material, but don't study what the exam will actually be like and are unprepared
        when they get to the actual exam, as it's nothing like what they studied. So we built quackprep.com that helps college
        students always find and have free access to these past exams.
      </p>

      <Header as='h2' textAlign='center' style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        Meet the Team
      </Header>

      <Grid stackable columns={3} padded>
        {contributors.map((contributor, index) => (
          <Grid.Column key={index}>
            <CreatorInfo
              imgSrc={contributor.imgSrc}
              name={contributor.name}
              description={contributor.description}
              links={contributor.links}
            />
          </Grid.Column>
        ))}
      </Grid>
    </Container>
  );
};

export default About;
