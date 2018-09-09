import React from 'react';
import PropTypes from 'prop-types';
import { Form, Header } from 'semantic-ui-react';
import { DatePicker, Slider, Checkbox, Radio, Input } from 'antd';
import OrderExtra from './OrderExtra';
import '../../assets/styles/filter.css';
import CustomCheckbox from '../common/CustomCheckbox';

const FilterOrders = ({ saving, onSubmit }) => {

  // const { RangePicker } = DatePicker;
  const marks = {
    0: '0',
    50: {
      style: {
        color: '#f50',
        marginLeft: '25%',
      },
      label: <strong>2450</strong>,
    },
    90: {
      style: {
        color: 'green',
        marginLeft: '75%',
      },
      label: <strong>5000</strong>,
    },
  };
  return (
    <div>
      <Form loading={false} id="filter-form" className="filter-form" onSubmit={onSubmit}>
        <div className="" >
          <div className="filter-meal-name">
            <h4 className="filter-title-label">By Title:</h4>
            <Input id="meal-name" placeholder="Meal Name" />
          </div>
          <div className="filter-date-pick row">
            <h4 className="filter-date-label">By Date:</h4>
            <div className="col-6"><DatePicker id="start-date" className="filter-date-pick-start" placeholder="Start Date" /></div>
            <div className="col-6"><DatePicker id="end-date" className="filter-date-pick-end" placeholder="End Date" /></div>
          </div>
          <div className="filter-price-slider">
            <h4 className="filter-price-label">By Price range:</h4>
            <Slider className="slider-range" range defaultValue={[0, 5000]} min={0} max={5000} step={50} marks={marks} />
          </div>
          <div className="filter-status row">
            <h4 className="filter-status-label">By Status:</h4>
            <div className="filter-status-options">
              <div className="filter-cancelled col-4"><CustomCheckbox value="Cancelled" /></div>
              <div className="filter-pending col-4"><CustomCheckbox value="Pending" /></div>
              <div className="filter-completed col-4"><CustomCheckbox value="Completed" /></div>
            </div>
          </div>
        </div>
        <Form.Button loading={saving} className="filterOrderButton " content={saving ? 'Filtering' : 'Filter'} disabled={saving} />

      </Form>
    </div>);
};

FilterOrders.propTypes = {

};

export default FilterOrders;
