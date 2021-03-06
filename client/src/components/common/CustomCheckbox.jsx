import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/checkbox.css';

const CustomCheckbox = ({ value }) => (
  <div className="custom-checkbox">
    <input type="checkbox" id={`Checkbox-${value}`} name="Checkbox" />
    <label htmlFor={`Checkbox-${value}`}>
      <span className="label-name">{value}</span>
      <div className="checkmark">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 100 125"
          enableBackground="new 0 0 100 100"
          xmlSpace="preserve"
        >
          <g>
            <path
              d="M50,91C27.393,91,9,72.607,9,50S27.393,9,50,9s41,18.393,41,41S72.607,91,50,91z M50,16   c-18.748,0-34,15.252-34,34c0,18.748,15.252,34,34,34c18.748,0,34-15.252,34-34C84,31.252,68.748,16,50,16z"
            />
          </g>
          <path
            d="M66.141,39.393c-1.367-1.366-3.582-1.366-4.949,0L47.403,53.182l-6.594-6.594  c-1.367-1.366-3.583-1.366-4.95,0c-1.367,1.367-1.367,3.583,0,4.95l9.066,9.066c0.001,0.001,0.001,0.002,0.002,0.003  c0.684,0.684,1.58,1.025,2.475,1.025l0,0c0,0,0,0,0,0c0.896,0,1.792-0.342,2.475-1.025c0.002-0.002,0.003-0.004,0.004-0.005  l16.258-16.258C67.508,42.976,67.508,40.76,66.141,39.393z"
          />
        </svg>
      </div>
    </label>
  </div>
);

CustomCheckbox.propTypes = {
  value: PropTypes.string.isRequired,
  // color: PropTypes.string,
};

export default CustomCheckbox;
