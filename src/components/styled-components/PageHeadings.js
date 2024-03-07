import React from 'react';

const StyledHeading = ({ children }) => {
  return <h2 className="text-2xl font-bold mb-2 text-center">{children}</h2>;
};

const StyledParagraph = ({ children }) => {
  return <p className="text-sm text-black-600 mb-6 text-center">{children}</p>;
};

export { StyledHeading, StyledParagraph };
