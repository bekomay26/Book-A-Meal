import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/mm.css';

const MealRow = ({
  meal, selectMealEditBtn, selectMealDelBtn, mealGoesWith,
  mealOnTop, addExtra, extraOptId, selected,
}) => {
  const goes = mealGoesWith(meal.extras);
  const onTop = mealOnTop(meal.extras);
  let extraOptIdn = 0;
  const xtraItem = (extraTitle, type) => {
    extraOptIdn += 1;
    return (
      <div key={extraOptIdn - 1} data-key={extraOptIdn - 1}>
        <div className="col-10">{extraTitle}</div>
        <div className="col-2"><i onClick={(event) => selected(event, type)} className="fas fa-minus extra-minus" role='button' /></div>
      </div>
    );
  };

  // should send only the values to be rendered not the whole div
  const goesExt = goes.map(ext =>
    xtraItem(ext.title, 'goes'));
  const topExt = onTop.map(ext =>
    xtraItem(ext.title, 'OnTop'));

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
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })
    .isRequired,
  selectMealEditBtn: PropTypes.func.isRequired,
};

export default MealRow;
