import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const App: FC = (): JSX.Element => {
  return (
    <>
      <h1>Minishop</h1>
      <Link to='/orders'>My orders</Link>
    </>
  );
};

export default App;
