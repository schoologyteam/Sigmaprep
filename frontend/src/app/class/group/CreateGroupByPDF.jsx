import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGroupGivenPDF } from './groupSlice';
import { Button, Input, Header, Popup, Icon, Segment, Divider, Checkbox } from 'semantic-ui-react';
import PdfUploadForm from '@components/PDFUploadForm';
import { CustomImageLoader } from '@components/CustomLoader/CustomImageLoader';
import { selectLoadingState } from '@app/store/loadingSlice';

export default function CreateGroupByPDF({ classId }) {
  const dispatch = useDispatch();
  const [customPrompt, setCustomPrompt] = useState('');
  const [savePdf, setSavePdf] = useState(true);
  const loading = useSelector(selectLoadingState).loadingComps.CreateGroupByPDF;

  function handlePdfSubmit(formData) {
    if (classId) {
      dispatch(createGroupGivenPDF(formData, classId, customPrompt || null, savePdf));
      setCustomPrompt('');
    } else {
      window.alert('Please select a class first');
    }
  }

  // Popup content for AI generation info
  const aiGenerationInfoContent = (
    <div>
      <p>
        <strong>Processing Time:</strong> The longer the PDF, the more time it will take to process. (Sometimes up to ~10min)
      </p>
      <p>
        <strong>AI Capabilities:</strong> AI can summarize, extract key points, and generate study materials. However, it is NOT
        perfect.
      </p>
      <p>
        <strong>Custom Prompt Tip:</strong> Use a custom prompt to guide the AI for specific outputs.
      </p>
      <p>
        <strong>Accuracy Tip:</strong> Give it the correct answers, if not, it may generate incorrect information.
      </p>
    </div>
  );

  return (
    <CustomImageLoader
      content={`Wait here or come back in a bit. Magic takes time! We will email you when it's ready.`}
      active={loading}
    >
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <Header as='h1' textAlign='center' style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>
          Upload Past Exams
          <Header.Subheader style={{ fontSize: '1rem', fontWeight: 'normal', marginTop: '0.5rem' }}>
            For the best results, please include answer keys if available
          </Header.Subheader>
        </Header>

        {/* Main upload area - highlighted to be the focus */}

        <PdfUploadForm onSubmit={handlePdfSubmit} />

        <Divider horizontal style={{ margin: '2rem 0' }}>
          <span style={{ color: '#666', fontWeight: 'normal' }}>Additional Options</span>
        </Divider>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
          {/* Left column - Options */}
          <div style={{ flex: '1', minWidth: '280px' }}>
            <Segment>
              <Header as='h3' style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                Options
              </Header>

              <div style={{ marginBottom: '1.5rem' }}>
                <Checkbox
                  label={
                    <label style={{ fontWeight: '500' }}>
                      Save PDF to repository
                      <Popup
                        content='This will save the PDF to the server and link it to the group to show to everyone.'
                        trigger={<Icon name='info circle' color='blue' style={{ marginLeft: '0.5rem' }} />}
                      />
                    </label>
                  }
                  checked={savePdf}
                  onChange={(e, data) => setSavePdf(data.checked)}
                  style={{ display: 'block', marginBottom: '1rem' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontWeight: '500', display: 'block', marginBottom: '0.5rem' }}>
                  Custom Prompt
                  <Popup
                    content='Example: This exam is about calc 3 and the answers are given in a separate document.'
                    trigger={<Icon name='info circle' color='blue' style={{ marginLeft: '0.5rem' }} />}
                  />
                </label>
                <Input
                  placeholder='Enter additional instructions for the AI...'
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  fluid
                />
              </div>
            </Segment>
          </div>

          {/* Right column - AI info */}
          <div style={{ flex: '1', minWidth: '280px' }}>
            <Segment>
              <Header as='h3' style={{ fontSize: '1.2rem' }}>
                <Icon name='lightbulb outline' style={{ color: '#FFB100' }} />
                AI Processing Information
              </Header>
              <div style={{ color: '#555' }}>
                <p>
                  <Icon name='clock' /> Larger PDFs may take up to 10 minutes to process
                </p>
                <p>
                  <Icon name='check circle' /> We'll email you when processing is complete
                </p>
                <p>
                  <Icon name='warning sign' /> For best results, include answer keys
                </p>
              </div>

              <Popup
                content={aiGenerationInfoContent}
                trigger={
                  <Button icon labelPosition='right' color='blue' fluid style={{ marginTop: '1rem' }}>
                    Learn More About AI Processing
                    <Icon name='arrow right' />
                  </Button>
                }
                wide
                hoverable
              />
            </Segment>
          </div>
        </div>
      </div>
    </CustomImageLoader>
  );
}
