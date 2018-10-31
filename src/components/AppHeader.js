import React from 'react';
import reactLogo from '../images/react.svg';

const AppHeader = () => (
  <div className="container-fluid rc-intro">
    <div className="container">
      <img className="rc-img" src={reactLogo} alt="app-logo" />
      <h1 className="rc-title">React Challenge</h1>
      <p className="rc-description">Поиск и сортировка данных</p>
    </div>
  </div>
);

export default AppHeader;