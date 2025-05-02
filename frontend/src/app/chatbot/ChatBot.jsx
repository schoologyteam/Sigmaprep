import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Segment, TextArea, Button, Icon, Checkbox, Grid } from 'semantic-ui-react';
import { selectUser } from '../auth/authSlice';
import LoginRequired from '../auth/LoginRequired';
import { selectLoadingState } from '@app/store/loadingSlice';
import TypingLoader from './TypingLoader/TypingLoader';
import './chatbot.css';
import { clearChat, selectMessages, sendAiMessage } from './chatbotSlice';
import { useDispatch } from 'react-redux';
import Messages from './Messages';
import { scrollToBottom } from '@utils/helperFuncs';
import { selectCurrentQuestion } from '@app/class/question/questionSlice';
import { selectCurrentChoices, stringifyChoices } from '@app/class/question/choices/choicesSlice';
export default function ChatBot() {
  const messages = useSelector(selectMessages);
  const loading = useSelector(selectLoadingState).loadingComps?.ChatBot;
  const user_id = useSelector(selectUser).user?.id;
  const [includeQuestionContext, setIncludeQuestionContext] = useState(true);

  const currentQuestion = useSelector(selectCurrentQuestion);
  const currentChoices = useSelector(selectCurrentChoices);
  // todo abstract to getcontextForChatBot
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  function scrollToEndOfChats() {
    if (messagesEndRef.current) {
      scrollToBottom(messagesEndRef.current.closest('.messages-wrapper'));
    }
  }

  useEffect(() => {
    scrollToEndOfChats();
  }, []);

  const handleSubmit = () => {
    if (inputValue.trim()) {
      dispatch(
        sendAiMessage(
          `${
            currentQuestion?.question && includeQuestionContext
              ? `---currently-working-on:"${currentQuestion?.question}. ${
                  currentChoices?.[0].type === 'mcq' ? `my current choices are: ${stringifyChoices(currentChoices)}` : ''
                }"---`
              : ''
          }\n${inputValue}`,
          () => setTimeout(() => scrollToEndOfChats(), 100),
        ),
      );
      setInputValue('');
      setTimeout(() => scrollToEndOfChats(), 100);
    }
  };

  if (!user_id) return <LoginRequired title='QuackPrepGPT' />;

  return (
    <Segment className='chat-container' style={{ width: '40rem', height: '35rem' }}>
      <Grid>
        <Grid.Column width={8}>
          <Button circular style={{ fontSize: '.5em', width: '10em' }} size='mini' onClick={() => dispatch(clearChat())}>
            clear
          </Button>
        </Grid.Column>
        <Grid.Column width={8}>
          <Checkbox
            checked={includeQuestionContext}
            label={'question context'}
            circular
            style={{ fontSize: '.8em', width: '15em' }}
            size='mini'
            onClick={() => setIncludeQuestionContext(!includeQuestionContext)}
          >
            include question context
          </Checkbox>
        </Grid.Column>
      </Grid>
      <div className='messages-wrapper'>
        {
          <div className='message-bubble assistant-message'>
            <div className='message-text'>
              {currentQuestion && includeQuestionContext
                ? `Ask me anything about "${currentQuestion?.question?.slice(0, 50)} ..."`
                : "Hello! I'm QuackPrepGPT🦆. How can I help you today?"}
            </div>
          </div>
        }
        {<Messages messages={messages} />}

        {loading && <TypingLoader />}

        <div ref={messagesEndRef} />
      </div>

      <div className='input-section'>
        <TextArea
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          placeholder='Type here...'
          rows={1}
          onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSubmit()}
          className='chat-textarea'
          disabled={loading}
        />

        <Button
          id='send-ai-prompt'
          name='send'
          color='blue'
          onClick={handleSubmit}
          disabled={!inputValue.trim() || loading}
          className='send-button'
        >
          <Icon name='send' />
        </Button>
      </div>
    </Segment>
  );
}
