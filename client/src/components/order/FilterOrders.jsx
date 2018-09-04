import React from 'react';
import PropTypes from 'prop-types';
import { Form, Header } from 'semantic-ui-react';
import { DatePicker, Slider, Checkbox, Radio } from 'antd';
import OrderExtra from './OrderExtra';
import '../../assets/styles/filter.css';
import CustomCheckbox from '../common/CustomCheckbox';

const FilterOrders = ({ saving }) => {

  const { RangePicker } = DatePicker;
  const marks = {
    0: '0',
    100: {
      style: {
        color: '#f50',
      },
      label: <strong>5000</strong>,
    },
  };
  return (
    <div>
      <Form loading={false} className="filter-form" onSubmit>
        <div className="" >
          <div> <RangePicker onChange /> </div>
          <div><Slider range defaultValue={[0, 5000]} min={0} max={5000} step={50} marks={marks} /></div>
          <CustomCheckbox value="Pending" />
          <CustomCheckbox value="Completed" />
          <CustomCheckbox value="Cancelled" />
        </div>
        <Form.Button loading={saving} className="filterOrderButton " content={saving ? 'Filtering' : 'Filter'} disabled={saving} />

      </Form>
    </div>);
};

FilterOrders.propTypes = {

};

export default FilterOrders;
