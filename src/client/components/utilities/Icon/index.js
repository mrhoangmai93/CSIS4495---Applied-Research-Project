import React from 'react';
import PropTypes from 'prop-types';

function Icon(props) {
  const className = `fa fa-${props.name}`;

  return (
    <i className={className} />
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
