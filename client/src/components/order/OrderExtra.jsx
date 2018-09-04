import React from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import styles from '../../assets/styles/menu2.css';
import { Checkbox, Grid, Image } from 'semantic-ui-react';

const OrderExtra = ({ extra, onQtyChange, extraStatus, handleChecked, indexKey }) => {
  let extraQty = 1;
  if (extraStatus[extra.id] !== undefined) {
    extraQty = extraStatus[extra.id].qty;
  } else {
    extraQty = 1;
  }
  // const checked = extraOrdered(extra);
  //add order id to classname
  return (<div className={`extra-${extra.id}`}>
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

OrderExtra.propTypes = {
  extra: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })
    .isRequired,
};

export default OrderExtra;
