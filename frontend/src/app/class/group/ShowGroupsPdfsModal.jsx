import { selectNavbarState } from '@app/layout/navbar/navbarSlice';
import { useSelector } from 'react-redux';
import { selectItemById } from 'maddox-js-funcs';
import { selectGroupsState } from './groupSlice';
import { Button, Header, Icon, Modal, Segment } from 'semantic-ui-react';
import { useState } from 'react';
import FileViewer from '@components/FileViewer';

export default function ShowGroupsPdfsModal() {
  const [state, setState] = useState(false);
  const { groupId } = useSelector(selectNavbarState).navbar;
  /**@type {import('../../../../../types').Group} */
  const curGroup = selectItemById(useSelector(selectGroupsState), 'id', groupId);
  if (!curGroup) {
    return null;
  } else if (curGroup.inserted_files == null) {
    return null;
  }
  return (
    <>
      <Modal closeIcon open={state} onUnmount={() => setState(false)} onClose={() => setState(false)}>
        <Segment basic padded>
          {' '}
          <Header>Original Pdfs For: {curGroup.name}</Header>
          <FileViewer urls={curGroup.inserted_files} />
        </Segment>
      </Modal>
      <Button circular size='tiny' onClick={() => setState(true)}>
        <span style={{ fontSize: '.8em' }}>Show Original Pdfs</span> <Icon size='small' name='file' />
      </Button>
    </>
  );
}
