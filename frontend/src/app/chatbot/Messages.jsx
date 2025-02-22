import MarkdownRenderer from '@components/MarkdownRenderer';
import { Image } from 'semantic-ui-react';
// messages is an array of messages which include who sent it and the text.
export default function Messages({ messages }) {
  function removeCurrentlyWorkingOn(message) {
    const tmp = message;
    return tmp.replace(/---currently-working-on:".*?"---/g, '');
  }
  return (
    <>
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
    </>
  );
}
