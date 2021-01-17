import React from 'react';

// import './Spinner.scss';

const Spinner = ({ show, altText }) => {
  return <div>{show && <img src="/spinner.gif" alt={altText} />}</div>;
};

export default Spinner;
