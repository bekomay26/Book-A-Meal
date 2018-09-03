import React from 'react';
import PropTypes from 'prop-types';

const GoesWithItem = ({ extra }) => (
  <div className="item row">
    <div className="col-7">extra.title</div>
    <div className="col-4"><input type="number" /></div>
    <div className="col-1"><i className="far fa-minus-square" onClick={() => selected(e)} onKeyPress={this.handleKeyPress} role='button' /></div>
  </div>
);

GoesWithItem.propTypes = {
  extra: PropTypes.shape({
    title: PropTypes.string.isRequired,
  })
    .isRequired,
  selected: PropTypes.func.isRequired,
};

export default GoesWithItem;
