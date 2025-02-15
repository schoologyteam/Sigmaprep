import { useState } from 'react';
import { Card, Icon, Image, Container, Label, Segment } from 'semantic-ui-react';

/**
 *
 * @param {Object} props
 * @param {String[]} props.urls
 * @returns {React.Component}
 */
const FileViewer = ({ urls }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!urls?.length) {
    return (
      <Container textAlign='center' style={{ padding: '2rem' }}>
        <Icon name='file outline' size='massive' />
        <p>No files uploaded</p>
      </Container>
    );
  }
  /**
   *
   * @param {String} url
   * @returns
   */
  const getFileName = (url) => {
    return url.substring(url.lastIndexOf('/') + 1);
  };

  const selectedFile = urls[selectedIndex];

  return (
    <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
      <div
        style={{
          minHeight: '60vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          marginBottom: '1rem',
          position: 'relative',
        }}
      >
        <Segment style={{ textAlign: 'center' }}>
          <iframe src={selectedFile} style={{ width: '30em', height: '50em', border: 'none' }}></iframe>
        </Segment>

        <Label ribbon style={{ position: 'absolute', left: '1rem', top: '1rem' }} color='blue'>
          {selectedIndex + 1} of {urls.length}
        </Label>
      </div>

      {/* Thumbnail Carousel */}
      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          padding: '1rem 0',
          gap: '0.5rem',
          scrollBehavior: 'smooth',
        }}
      >
        {urls.map((file, index) => (
          <Card
            key={file.url}
            onClick={() => setSelectedIndex(index)}
            style={{
              flex: '0 0 auto',
              width: '100px',
              cursor: 'pointer',
              border: selectedIndex === index ? '2px solid #2185d0' : '1px solid #ddd',
              borderRadius: '4px',
              transition: 'border-color 0.2s ease',
            }}
          >
            {file.type === 'image' ? (
              <Image
                src={file.url}
                wrapped
                ui={false}
                style={{
                  height: '80px',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <div style={{ padding: '0.5rem', textAlign: 'center' }}>
                <Icon name='file pdf outline' size='big' />
                <div
                  style={{
                    fontSize: '0.8rem',
                    wordBreak: 'break-word',
                    padding: '0.25rem',
                  }}
                >
                  {getFileName(file)}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FileViewer;
