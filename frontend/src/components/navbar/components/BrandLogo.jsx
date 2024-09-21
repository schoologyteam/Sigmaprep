import { Menu } from 'semantic-ui-react';
import logo from '/img/quackprep_logo.webp';
import './BrandLogo.css';

export default function BrandLogo({ handlePageChange }) {
  return (
    <Menu.Item
      header
      onClick={(e, data) => {
        const fixedData = {
          name: '/home',
        };
        handlePageChange(e, fixedData);
      }}
    >
      <img src={logo} alt='Logo' className='logo' style={{ marginRight: '.7em' }} />
      <span className='quackprep'>QuackPrep</span>
    </Menu.Item>
  );
}
