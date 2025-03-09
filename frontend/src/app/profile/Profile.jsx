import { useDispatch, useSelector } from 'react-redux';
import { Card, Image, Icon, Button, Segment } from 'semantic-ui-react';
import { selectUser } from '../auth/authSlice';
import { getDefaultIconUrl } from '../../../../globalFuncs';
import { useState } from 'react';
import CreateInputForm from '@components/CreateInputForm';
import { selectLoadingState } from '@app/store/loadingSlice';
import { editProfile } from './profileSlice';

export default function Profile() {
  const { user } = useSelector(selectUser);
  const [editing, setEditing] = useState(false);
  const loading = useSelector(selectLoadingState).loadingComps?.Profile;
  const dispatch = useDispatch();
  return (
    <Segment
      loading={loading}
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '7rem',
      }}
    >
      <Card
        centered
        style={{
          width: '350px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <Image
          src={user.icon || getDefaultIconUrl(user.username)}
          ui={false}
          style={{
            maxHeight: '250px',
            objectFit: 'cover/',
          }}
        />
        {editing === false ? (
          <>
            <Card.Content textAlign='center'>
              <Card.Header style={{ fontSize: '1.6rem', fontWeight: '600' }}>
                {user.firstName} {user.lastName}
              </Card.Header>

              <Card.Meta>
                <span className='username' style={{ color: '#888', fontSize: '1.1rem' }}>
                  @{user.username}
                </span>
              </Card.Meta>
              <Card.Description
                style={{
                  marginTop: '8px',
                  fontSize: '1rem',
                  color: '#555',
                }}
              >
                {user.email}
              </Card.Description>
            </Card.Content>
            <Card.Content extra textAlign='center'>
              <Icon name='user' />
              <span style={{ fontSize: '1.1rem' }}>User ID: {user.id}</span>
            </Card.Content>
            <Card.Content extra textAlign='center'>
              <Button
                primary
                fluid
                style={{
                  backgroundColor: '#2185d0',
                  color: '#fff',
                  fontWeight: '500',
                }}
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </Button>
            </Card.Content>
          </>
        ) : (
          <Segment>
            <CreateInputForm
              formFields={[{ name: 'username', value: user.username, required: true }]}
              onSubmit={({ username, icon_link, first_name, last_name }) => {
                {
                  dispatch(
                    editProfile(username, icon_link || user.icon, first_name || user.firstName, last_name || user.lastName),
                  );
                  setEditing(false);
                }
              }}
            />
          </Segment>
        )}
      </Card>
    </Segment>
  );
}
