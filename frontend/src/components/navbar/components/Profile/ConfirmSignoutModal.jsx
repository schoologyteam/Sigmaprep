import { Modal, Button } from 'semantic-ui-react';
export default function ConfirmSignoutModal({ open, onSubmit }) {
  return (
    <Modal open={open}>
      <Modal.Header>Are you Sure you Want to sign out?</Modal.Header>
      <Modal.Content>U sure dude?</Modal.Content>
      <Button floated='right' onClick={() => onSubmit()}>
        Sign Out
      </Button>
    </Modal>
  );
}
