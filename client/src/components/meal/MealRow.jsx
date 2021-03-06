import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/mm.css';

const MealRow = ({
  meal, selectMealEditBtn, selectMealDelBtn, mealGoesWith,
  mealOnTop, addExtra, extraOptId, selected
}) => {
  let goes = [];
  let onTop = [];
  if (meal.extras) {
    goes = mealGoesWith(meal.extras);
    onTop = mealOnTop(meal.extras);
  }
  let extraOptIdn = 0;
  
  // already added Extras for the meal
  const xtraItem = (extraTitle, type) => {
    extraOptIdn += 1;
    return (
      <div key={extraOptIdn - 1} data-key={extraOptIdn - 1}>
        <div className="col-10">{extraTitle}</div>
        <div className="col-2">
          <i
            onClick={(event) => selected(event, type)}
            onKeyPress={(event) => selected(event, type)}
            tabIndex="0"
            className="fas fa-minus extra-minus"
            role="button"
          />
        </div>
      </div>
    );
  };
  // console.log(goes);
  // should send only the values to be rendered not the whole div
  const goesExt = goes.map(ext =>
    xtraItem(ext.title, 'goes'));
  const topExt = onTop.map(ext =>
    xtraItem(ext.title, 'OnTop'));
  // addExtra(y, 'goes');

  return (
    <tr>
      <td>{meal.id}</td>
      <td>{meal.title}</td>
      <td>category</td>
      <td>&#x20A6;{meal.price}</td>
      <td onClick={() => selectMealEditBtn(meal,goesExt,topExt)} className="edit"><i className="far fa-edit" /></td>
      <td onClick={() => selectMealDelBtn(meal)} ><i className="far fa-trash-alt remove"></i></td>
    </tr>)
};

MealRow.propTypes = {
  meal: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
  })
    .isRequired,
  selectMealEditBtn: PropTypes.func.isRequired,
  selectMealDelBtn: PropTypes.func.isRequired,
  mealGoesWith: PropTypes.func.isRequired,
  mealOnTop: PropTypes.func.isRequired,
  addExtra: PropTypes.func.isRequired,
  extraOptId: PropTypes.number.isRequired,
  selected: PropTypes.func.isRequired,
};

export default MealRow;
