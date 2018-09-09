import React from 'react';
import PropTypes from 'prop-types';
import { Form, Header, Label, Input, Grid } from 'semantic-ui-react';
import { Upload, Icon } from 'antd';

export const MealForm = ({ meal, onSave, saving, imageUrl, cardImgList, handleCardChange, onChange, extrasList, extrasTopList, goes, top, addExtra, selectChange, selected, extraOptId   }) => {
  console.log(meal);
  const { Dragger } = Upload;
  const imgUpload = {
    name: 'filename',
    action: '',
    listType: 'picture-card',
    accept: 'image/*',
    showUploadList: false,
    onChange: handleCardChange,
    fileList: cardImgList.fileList,
  };
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <img className="menu-meal-img" src={meal.image_url} alt="meal" />
    </div>
  );
  const addGoes = (
    <div className="row" key={extraOptId + 1} data-key={extraOptId + 1}>
      <div className="col-10">
        <select onChange={selectChange} >
            {goes.map(extra =>
              <option disabled={false} value={extra.title} ext-id={extra.id}>{extra.title}</option>)
            }
        </select>
      </div>
      <div className="col-2" onClick={(event) => selected(event, 'goes')} role='button'><i className="fas fa-minus extra-minus" /></div>
    </div>
  );
  const addTop = (
    <div className="row" key={extraOptId + 1} data-key={extraOptId + 1}>
      <div className="col-10">
        <select onChange={selectChange}>
          {top.map(extra =>
            <option ext-id={extra.id}>{extra.title}</option>)
          }
        </select>
      </div>
      <div className="col-2" onClick={(event) => selected(event, 'onTop')} role='button'><i className="fas fa-minus extra-minus" /></div>
    </div>
  );
  return (
    <div>
      <Form className="add-meal-form" onSubmit={onSave}>
        <Dragger {...imgUpload}>
          {/* {cardImgList.length >= 1 ? null : uploadButton} */}
          {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
        </Dragger>
        <Form.Group>
          <Form.Field width={10}>
            <label>Food Title</label>
            <Input name="title" onChange={onChange} value={meal.title || ''} placeholder="Meal">
              <input />
            </Input>
          </Form.Field>
          <Form.Field width={6}>
            <label>Price</label>
            <Input
              className="meal-update-price-input"
              name="price" onChange={onChange}
              value={meal.price || ''}
              labelPosition="right"
              type="number"
              placeholder="Amount"
              min="50"
              max="9995"
              step="5"
            >
              <Label basic>$</Label>
              <input />
              <Label>.00</Label>
            </Input>
          </Form.Field>
        </Form.Group>
        <Form.TextArea name="description" onChange={onChange} value={meal.description || ''} label="Description" placeholder="Tell us more about the food..." />
        <Grid className="add-meal-form-grid" columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <h4>Goes With</h4>
              {
                extrasList.map(extraOption =>
                  extraOption)
              }
              <div style={{ textAlign: 'center', fontSize: '20px' }}><i className="far fa-plus-square" onClick={() => addExtra(addGoes, 'goes')} role="button" /></div>
            </Grid.Column>
            <Grid.Column>
              <h4>Extras</h4>
              {
                extrasTopList.map(extraOption =>
                  extraOption)
              }
              <div style={{ textAlign: 'center', fontSize: '20px' }}><i className="far fa-plus-square" onClick={() => addExtra(addTop, 'top ')} role="button" /></div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Form.Button className="manage-meal-button">Update</Form.Button>
          {/* <div>
            <input type="submit" className="add" value="Add Meal" onClick={onSave} />
          </div> */}
      </Form>
    </div>);
};

MealForm.propTypes = {

};

export default MealForm;
