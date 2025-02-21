import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Segment, TextArea, Button, Icon, Image, Checkbox, Grid } from 'semantic-ui-react';
import { selectArrayOfStateById } from 'maddox-js-funcs';
import { selectNavbarState } from '@app/layout/navbar/navbarSlice';
import { selectUser } from '../auth/authSlice';
import LoginRequired from '../auth/LoginRequired';
import { MAX_FILES_UPLOAD } from '../../../../constants';
import { selectLoadingState } from '@app/store/loadingSlice';
import TypingLoader from './TypingLoader/TypingLoader';
import './chatbot.css';
import { clearChat, selectMessages, sendAiMessage } from './chatbotSlice';
import { useDispatch } from 'react-redux';
import MarkdownRenderer from '@components/MarkdownRenderer';
export default function ChatBot() {
  const [files, setFiles] = useState([]);

  const messages = useSelector(selectMessages);
  const loading = useSelector(selectLoadingState).loadingComps?.ChatBot;
  const user_id = useSelector(selectUser).user?.id;
  const { questionId } = useSelector(selectNavbarState).navbar;
  const [includeQuestionContext, setIncludeQuestionContext] = useState(true);

  const currentQuestion = useSelector(selectArrayOfStateById('app.question.questions.questions', 'id', questionId))?.[0];
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, []);
  function removeCurrentlyWorkingOn(message) {
    const tmp = message;
    return tmp.replace(/---currently-working-on:".*?"---/g, '');
  }

  const scrollToBottom = () => {
    const messagesWrapper = messagesEndRef.current?.closest('.messages-wrapper');
    if (messagesWrapper) {
      messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
    }
  };

  const handleSubmit = () => {
    if (files.length > MAX_FILES_UPLOAD) {
      window.alert(`Max files upload exceeded: ${MAX_FILES_UPLOAD}`);
      throw new Error('Max files upload exceeded');
    }
    if (inputValue.trim()) {
      dispatch(
        sendAiMessage(
          `${
            currentQuestion?.question && includeQuestionContext ? `---currently-working-on:"${currentQuestion?.question}"---` : ''
          }${inputValue}`,
          files,
          () => setTimeout(() => scrollToBottom(), 100),
        ),
      );
      setInputValue('');
      setFiles([]);
      setTimeout(() => scrollToBottom(), 100);
    }
  };

  if (!user_id) return <LoginRequired title='QuackPrepGPT' />;

  return (
    <Segment className='chat-container' style={{ width: '20rem', height: '35rem' }}>
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
        {messages &&
          messages.map((message, messageIndex) => {
            if (Array.isArray(message.content)) {
              return (
                <div
                  key={messageIndex}
                  className={`message-bubble ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
                >
                  {message.content.map((content, contentIndex) => (
                    <div key={contentIndex} className='message-text'>
                      {content.type === 'text' ? removeCurrentlyWorkingOn(content.text) : <Image src={content.image_url.url} />}
                    </div>
                  ))}
                </div>
              );
            } else {
              return (
                <div
                  key={messageIndex}
                  className={`message-bubble ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
                >
                  <div className='message-text'>
                    <MarkdownRenderer render={removeCurrentlyWorkingOn(message.content)} />
                  </div>
                </div>
              );
            }
          })}

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
