import { useDispatch, useSelector } from 'react-redux';
import { Header, Segment, Card, Button } from 'semantic-ui-react';
import { selectArrayOfStateById, turnUnderscoreIntoSpace } from '@utils/functions';
import { changeNavbarPage, selectNavbarState, updateCurrentTopicData } from '@components/navbar/navbarSlice';
import { selectLoadingState } from '@src/app/store/loadingSlice';

export default function TopicsShow() {
  const { navbar } = useSelector(selectNavbarState);
  const { className, classId } = navbar;
  const loadingObject = useSelector(selectLoadingState).loadingComps;

  const topics = useSelector(selectArrayOfStateById('app.topic.topics', 'class_id', classId));
  const dispatch = useDispatch();

  return (
    <Segment loading={loadingObject.TopicsShow}>
      <Header as='h3'>{className}: Study by Topics</Header>
      <Card.Group itemsPerRow={3}>
        {topics &&
          topics.map((topic) => (
            <Card key={topic.id} color='blue' raised>
              <Card.Content>
                <Card.Header>{turnUnderscoreIntoSpace(topic.name)}</Card.Header>
                <Card.Description>{topic.description}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button
                  basic
                  color='blue'
                  onClick={() => {
                    dispatch(updateCurrentTopicData(topic.id, topic.name)); // update topic data
                    dispatch(changeNavbarPage(`${topic.name}/question`));
                  }}
                >
                  Study Topic
                </Button>
              </Card.Content>
            </Card>
          ))}
      </Card.Group>
    </Segment>
  );
}
