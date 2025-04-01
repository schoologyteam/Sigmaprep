import MarkdownRenderer from '@components/MarkdownRenderer';
import { useState, useRef, useEffect } from 'react';
import { Form, Segment, Popup } from 'semantic-ui-react';

export default function MarkdownEditor({ label, onChange, value, placeholder, required }) {
  const [editingMD, setEditingMD] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editorRef.current && !editorRef.current.contains(event.target)) {
        setEditingMD(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Form.Field>
      <Segment
        onClick={() => {
          // Only activate if we're not already editing
          if (!editingMD) {
            setEditingMD(true);
          }
        }}
      >
        {`${label}:`}
        {!editingMD ? (
          <div>
            <p style={{ color: 'red' }}>click here to edit!</p>
            <MarkdownRenderer render={value} />
          </div>
        ) : (
          <div>
            <p style={{ color: 'red' }}>click outside to render!</p>
            <Form.TextArea
              autoFocus
              ref={editorRef}
              label={label}
              required={required}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
            />
          </div>
        )}
      </Segment>
    </Form.Field>
  );
}
