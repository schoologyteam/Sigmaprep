import { useEffect, useMemo, useState } from 'react';
import { Grid, Header, Segment, Button, Icon, ButtonGroup } from 'semantic-ui-react';
import QuestionList from './QuestionList';
import { useDispatch, useSelector } from 'react-redux';
import { changeNavbarPage, selectNavbarState, updateQuestionId } from '@app/layout/navbar/navbarSlice';
import { selectLoadingState, startLoading, stopLoading } from '@app/store/loadingSlice';
import ChoiceRouter from './choices/ChoiceRouter';
import { useNavigate } from 'react-router-dom';
import QuestionReport from './qreport/QuestionReport';
import { selectItemById, selectItemsById } from 'maddox-js-funcs';
import NoItemsFound from '@components/NoItemsFound';
import { CustomImageLoader } from '@components/CustomLoader/CustomImageLoader';
import QuestionVote from './vote/QuestionVote';
import QuestionNext from './QuestionNext';
import useIsMobile from '@utils/hooks/useIsMobile';
import QuestionPostMain from './post/QuestionPostMain';
import { selectQuestionsByGroupId } from './questionSlice';
import ShowGroupsPdfsModal from '../group/ShowGroupsPdfsModal';
import { selectGroupsState } from '../group/groupSlice';

function getLocalShowAIQuestions() {
  const showAIQuestions = window.localStorage.getItem('showAIQuestions');
  if (showAIQuestions) {
    return showAIQuestions === 'true';
  }
  return true;
}

/**
 * @param {Boolean} showAIQuestions
 */
function setLocalShowAIQuestions(showAIQuestions) {
  window.localStorage.setItem('showAIQuestions', String(showAIQuestions));
}

export default function QuestionPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { schoolName, className, classId, groupId, groupName, questionId } = useSelector(selectNavbarState).navbar;
  const group = useSelector(selectGroupsState)?.find((group) => group.id === groupId);

  /**@type {import('../../../../../types.ts').Question[]} */
  let questions = useSelector(selectQuestionsByGroupId());

  const questionPageLoading = useSelector(selectLoadingState).loadingComps?.QuestionPage;
  const questionVoteLoading = useSelector(selectLoadingState).loadingComps?.QuestionVote;
  const generateQuestionLoading = useSelector(selectLoadingState).loadingComps?.GenerateQuestion;

  const [selectedQuestion, setSelectedQuestion] = useState({});

  // AI questions toggle
  const [showAIQuestions, setShowAIQuestions] = useState(getLocalShowAIQuestions());

  questions = useMemo(() => {
    if (showAIQuestions) {
      return questions;
    } else {
      return selectItemsById(questions, 'ai', 0);
    }
  }, [showAIQuestions, questions]);

  useEffect(() => {
    setLocalShowAIQuestions(showAIQuestions);
    if (questions?.length === 0 && showAIQuestions === false) {
      setShowAIQuestions(true);
    }
  }, [showAIQuestions]);

  useEffect(() => {
    if (
      questions != null &&
      questions?.length !== 0 &&
      (questionPageLoading == false || questionPageLoading === undefined) &&
      (questionVoteLoading === false || questionVoteLoading === undefined)
    ) {
      if (!questionId) {
        setSelectedQuestion({});
        dispatch(
          //bad fix but works
          changeNavbarPage(navigate, `/class/${schoolName}/${classId}/group/${groupId}/question/${parseInt(questions?.[0]?.id)}`),
        );
      } else {
        setSelectedQuestion(selectItemById(questions, 'id', questionId));
      }
    }
  }, [questions?.length, questionId, dispatch, navigate, questionVoteLoading, questionPageLoading]);

  useEffect(() => {
    // change navbar state when selected question id changes
    if (!questionPageLoading && selectedQuestion?.id) {
      dispatch(
        changeNavbarPage(navigate, `/class/${schoolName}/${classId}/group/${groupId}/question/${parseInt(selectedQuestion.id)}`),
      );
      dispatch(updateQuestionId(parseInt(selectedQuestion.id)));
    }
  }, [selectedQuestion?.id, questionVoteLoading, questionPageLoading]);

  // This custom component wrapper fixes the sizing issues by applying consistent styling
  const ActionButtonsContainer = ({ children }) => (
    <div
      className='question-actions-container'
      style={{
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      {children}
    </div>
  );

  // Modified QuestionReport to ensure consistent button styling
  const StyledQuestionReport = ({ questionId }) => {
    return (
      <div style={{ display: 'inline-block' }}>
        <QuestionReport questionId={questionId} />
      </div>
    );
  };

  // Modified ExplanationButton for consistent styling
  const ExplanationButton = ({ url }) => {
    if (!url) return null;

    return (
      <Button size='small' color='red' as='a' href={url} target='_blank'>
        <Icon name='youtube' />
        Explanation
      </Button>
    );
  };

  // Modified QuestionVote to ensure consistent button styling
  const StyledQuestionVote = ({ questionId, upvotes }) => {
    return (
      <div style={{ display: 'inline-block' }}>
        <QuestionVote questionId={questionId} upvotes={upvotes} />
      </div>
    );
  };

  return (
    <Segment basic loading={questionPageLoading}>
      <Header as='h3' style={{ marginBottom: '-.2em', fontSize: '2rem', color: 'gray' }} textAlign='center'>
        {className}
      </Header>

      <CustomImageLoader content='Generating AI question (takes ~10s)' active={generateQuestionLoading}>
        <Header style={{ fontSize: '2.5rem' }} textAlign='center'>
          {groupName} <ShowGroupsPdfsModal />
        </Header>
        <p style={{ fontSize: '.8rem', color: 'gray', textAlign: 'center' }}>{group?.desc}</p>

        <Grid divided>
          <Grid.Row>
            {!isMobile && (
              <Grid.Column width={4}>
                <QuestionList
                  setSelectedQuestion={setSelectedQuestion}
                  questions={questions}
                  selectedQuestion={selectedQuestion}
                  showAIQuestions={showAIQuestions}
                  setShowAIQuestions={setShowAIQuestions}
                />
              </Grid.Column>
            )}

            <Grid.Column width={isMobile ? 16 : 12}>
              {selectedQuestion?.id ? (
                <Segment>
                  <ChoiceRouter selectedQuestion={selectedQuestion} />

                  <QuestionNext
                    questions={questions}
                    selectedQuestion={selectedQuestion}
                    setSelectedQuestion={setSelectedQuestion}
                  />

                  {/* New action buttons container with consistent styling */}
                  <ActionButtonsContainer>
                    {selectedQuestion?.id && <StyledQuestionReport questionId={selectedQuestion.id} />}

                    <ExplanationButton url={selectedQuestion?.explanation_url} />

                    {selectedQuestion?.id && (
                      <StyledQuestionVote questionId={selectedQuestion.id} upvotes={selectedQuestion.upvotes} />
                    )}
                  </ActionButtonsContainer>
                </Segment>
              ) : (
                <Segment>
                  {selectItemById(questions, 'id', questionId) ? (
                    <Header as='h3'>Please select a question from the list.</Header>
                  ) : (
                    <NoItemsFound title='Question' message='No questions found, try enabling AI questions' />
                  )}
                </Segment>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </CustomImageLoader>

      {selectedQuestion?.id && <QuestionPostMain questionId={selectedQuestion.id} />}
    </Segment>
  );
}
