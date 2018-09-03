import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import '../../assets/styles/mm.css';


const MealModal = ({ meal, onChange, extrasList, extrasTopList, goes, top, addExtra, selectChange, selected, extraOptId  }) => {
  const addGoes = (
    <div key={extraOptId + 1} data-key={extraOptId + 1}>
      <select onChange={selectChange} >
          {goes.map(extra =>
            <option disabled={false} value={extra.title} ext-id={extra.id}>{extra.title}</option>)
          }
      </select>
      <div className="col-2" onClick={(event) => selected(event, 'goes')} role='button'>bb</div>
    </div>
  );
  const addTop = (
    <div key={extraOptId + 1} data-key={extraOptId + 1}>
      <select onChange={selectChange}>
        {top.map(extra =>
          <option ext-id={extra.id}>{extra.title}</option>)
        }
      </select>
      <div className="col-2" onClick={(event) => selected(event, 'onTop')} role='button'>bb</div>
    </div>
  );
  return (
    <div>
      <div id="modal-container" className="modal">
        <span id="close" className="close">&times;</span>
        <form id="modal-form" className="modal-form" action="" method="POST">
          <div>
            <img src="" />
          </div>
          <div className="form-details">
            <div className="foodInfo">
              <label for="filename" style={{ color: 'rgba(0,0,0)' }}>Select Image</label>
              <input id="filename" name="filename" type="file" accept="image/*" placeholder="Select Image" onChange={onChange} />
              <input id="foodname" name="title" type="text" value={meal.title} onChange={onChange} />
              <input id="addFoodPrice" name="price" type="number" placeholder="Food Price" onChange={onChange} value={meal.price} />
              <textarea rows="4"  name="comment" form="modal-form" placeholder="Enter Description..." onChange={onChange} value={meal.description}></textarea>
            </div>
            <hr />
            <div id="mealwith" className="mealwith">
              <h4>Goes With</h4>
              {
                extrasList.map(extraOption =>
                  extraOption)
              }
              <div onClick={() => addExtra(addGoes, 'goes')} role="button" >aa<i className="far fa-plus-square" style={{ marginLeft: '18px' }} /></div>
              {/* {meal.extras.map(xtra => xtras(xtra))}
              <input type="button" value="+" style={{ marginLeft: '18px' }} onClick={(event) => selected(event, 'onTop')} role='button' /> */}
            </div>
            <hr />
            <div id="mealextra" className="mealextra">
              <h4>Extras</h4>
              {
              extrasTopList.map(extraOption =>
                extraOption)
              }
              <div onClick={() => addExtra(addTop, 'top')} role="button" >aa<i className="far fa-plus-square" style={{ marginLeft: '18px' }} /></div>
            </div>
            <div>
              <input type="submit" className="save" value="Save" />
            </div>
          </div>
        </form>
      </div>
    </div>);
};

MealModal.propTypes = {
  // meal: PropTypes.arrayOf(PropTypes.shape).isRequired,
  meal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    extras: PropTypes.shape.isRequired,
  })
    .isRequired,
  // goesWith: PropTypes.func.isRequired,
  // extras: PropTypes.func.isRequired,
};

// const MealModalWithCSS = CSSModules(MealModal, styles, { allowMultiple: true });
// export default (MealModalWithCSS);
export default MealModal;
