import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Label, Select } from 'semantic-ui-react';


const AddExtra = ({ onSave }) => {
  return (

    <div id="addExtraContainer" className="add-meal-container">
      <Form className="add-meal-form" onSubmit={onSave}>
        <Form.Group>
          <Form.Field control={Input} label="Extra Title" placeholder="Title" width={10} />
          <Form.Field width={6}>
            <label>Price</label>
            <Input labelPosition="right" type="number" placeholder="Amount">
              <Label basic>$</Label>
              <input />
              <Label>.00</Label>
            </Input>
          </Form.Field>
        </Form.Group>
        <Select label="category" placeholder="type" options={['GoesWith', 'OnTop']} />
        <Form.Button className="manage-meal-button">Add Extra</Form.Button>
      </Form>
    </div>
  );
};

AddExtra.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default AddExtra;
