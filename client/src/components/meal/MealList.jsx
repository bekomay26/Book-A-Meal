import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/mm.css';
import MealRow from './MealRow';


const MealList = ({
  meals, selectMealEditBtn, selectMealDelBtn, mealGoesWith,
  mealOnTop, addExtra, extraOptId, selected,
}) => (
  <div style={{ overflowX: 'auto' }}>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>category</th>
          <th>price</th>
          <th />
          <th />
        </tr>
      </thead>
      <tfoot />
      <tbody>
        {meals.map(meal =>
          (<MealRow
            meal={meal}
            selectMealEditBtn={selectMealEditBtn}
            mealGoesWith={mealGoesWith}
            mealOnTop={mealOnTop}
            addExtra={addExtra}
            extraOptId={extraOptId}
            selected={selected}
            selectMealDelBtn={selectMealDelBtn}
          />))
        }
      </tbody>
    </table>
  </div>
);

MealList.propTypes = {
  selectMealEditBtn: PropTypes.func.isRequired,
};

export default MealList;
