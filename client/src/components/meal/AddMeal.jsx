import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import 'antd/dist/antd.css';
import { Upload, Icon, message } from 'antd';
import { Form, FormField, FormInput, Image, Input, Label, Grid } from 'semantic-ui-react';
import GoesWithItem from './GoesWithItem';

const AddMeal = ({
  onSave, meal, onChange, selectValues, selectChange, getSelectValue,
  cardImgList, handleCardChange, imageUrl, addExtra, selected, goes,
  top, extrasList, extrasTopList, extraOptId,
}) => {
  // let add;
  // let extrasList = [];
  // const extId = getSelectValue(extraOptId - 1);
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
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  let x;
  const addGoes = (
    <div key={extraOptId} data-key={extraOptId} className="row">
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

  const topOptions = top.map(extra => <option value={extra.title} ext-id={extra.id}>{extra.title}</option>);
  const addTop = (
    <div key={extraOptId} data-key={extraOptId} className="row">
      <div className="col-10">
        <select onChange={selectChange} placeholder="Toppings">
          {topOptions}
        </select>
      </div>
      {/* <div className="col-2" onClick={(event) => selected(event, 'onTop')} role='button'><i className="fas fa-minus extra-minus" /></div> */}
      <div className="col-2" style={{ textAlign: 'center', fontSize: '20px' }} onClick={(event) => selected(event, 'onTop')} role='button'>
        <i className="fas fa-minus extra-minus" />
      </div>
    </div>
  );

  return (

    <div id="addContainer" className="add-meal-container">
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
            <Input name="price" onChange={onChange} value={meal.price || ''} labelPosition="right" type="number" placeholder="Amount">
              <Label basic>$</Label>
              <input />
              <Label>.00</Label>
            </Input>
          </Form.Field>
        </Form.Group>
        <Form.TextArea className="add-meal-textarea" name="description" onChange={onChange} value={meal.description || ''} label="Description" placeholder="Tell us more about the food..." />
        <Grid className="add-meal-form-grid" columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <h4>Goes With</h4>
              {
                extrasList.map(extraOption =>
                  extraOption)
              }
              <div style={{ textAlign: 'center', fontSize: '20px' }}><i className="far fa-plus-square" tabIndex="0" onKeyPress={() => addExtra(addGoes, 'goes')} onClick={() => addExtra(addGoes, 'goes')} role="button" /></div>
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
        <Form.Button className="manage-meal-button">Add Meal</Form.Button>
          {/* <div>
            <input type="submit" className="add" value="Add Meal" onClick={onSave} />
          </div> */}
      </Form>
    </div>
  );
};

AddMeal.propTypes = {
  // mealextras: PropTypes.shape({
  //   title: PropTypes.string.isRequired,
  //   price: PropTypes.number.isRequired,
  // })
  //   .isRequired,
  addExtra: PropTypes.func.isRequired,
  selected: PropTypes.func.isRequired,
  extraOptId: PropTypes.number.isRequired,
  // addBtnClicked: PropTypes.bool.isRequired,
};

// const AddMealWithCSS = CSSModules(AddMeal, styles, { allowMultiple: true });
// export default (AddMealWithCSS);
export default AddMeal;
