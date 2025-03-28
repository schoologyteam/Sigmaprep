import { Segment, Container, Grid, Header, Image } from 'semantic-ui-react';

export default function Testimonials() {
  const testimonials = [
    {
      text: 'This platform significantly improved my exam preparation. The practice questions were highly effective.',
      author: 'ChatGPT',
      image: '/img/quackprep_logo.webp',
    },
    {
      text: 'Even my pet rock aced the test! Highly recommended for humans and rocks alike!',
      author: 'Claude AI',
      image: '/img/quackprep_logo.webp',
    },
  ];

  return (
    <Segment style={{ padding: '8em 1em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em', textAlign: 'center' }}>
          What Our Users Say
        </Header>
        <Grid stackable columns={2} style={{ marginTop: '3em' }} relaxed='very'>
          {testimonials.map((testimonial, index) => (
            <Grid.Column key={index}>
              <Segment raised>
                <p style={{ fontSize: '1.33em', fontStyle: 'italic' }}>"{testimonial.text}"</p>
                <Header as='h4' textAlign='right'>
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    style={{ width: '30px', height: '30px', marginRight: '0.5em', borderRadius: '50%' }}
                  />
                  - {testimonial.author}
                </Header>
              </Segment>
            </Grid.Column>
          ))}
        </Grid>
      </Container>
    </Segment>
  );
}
