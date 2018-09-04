import React from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import styles from '../../assets/styles/menu2.css';
import { Checkbox, Grid, Image } from 'semantic-ui-react';

const MealExtra = ({ extra, onQtyChange, extraStatus, handleChecked, indexKey }) => {
  let extraQty = 1;
  if (extraStatus[extra.id] !== undefined) {
    extraQty = extraStatus[extra.id].qty;
  } else {
    extraQty = 1;
  }
  // let extraQty = 1;
  // if (extraStatus[indexKey] !== undefined) {
  //   extraQty = extraStatus[indexKey].qty;
  // } else {
  //   extraQty = 1;
  // }
  return (<div>
    <Grid divided="vertically">
      <Grid.Row>
        <Grid.Column width={8}>
          <Checkbox
            onChange={(event) => handleChecked(event, extra.id, extra, extraQty)}
            className="menu-modalextra-text"
            label={extra.title}
          />
        </Grid.Column>
        <Grid.Column width={4} className="menu-modalextra-qty-grid">
          <input
            type="number"
            className="col-3 menu-modalextra-qty"
            onInput={(event) => onQtyChange(event, extra.id, extra.price)}
            defaultValue={1}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <div className="menu-modalextra-text">
            &#x20A6;{extra.price * extraQty}
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>)
};

MealExtra.propTypes = {
  extra: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })
    .isRequired,
};

// export default CSSModules(MealExtra, styles, { allowMultiple: true });
export default MealExtra;
