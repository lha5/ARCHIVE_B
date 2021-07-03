import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'semantic-ui-css/semantic.min.css';

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>ArchiveB</title>
      </Head>
      <Component />
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default App;
