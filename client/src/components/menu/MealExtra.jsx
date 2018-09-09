import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Grid } from 'semantic-ui-react';

const MealExtra = ({ extra, onQtyChange, extraStatus, handleChecked, indexKey }) => {
  const extStatPosition = extraStatus.findIndex(extraStat => extraStat.key === extra.id);
  let extraQty = 1;
  if (extraStatus[extStatPosition] !== undefined) {
    extraQty = extraStatus[extStatPosition].qty;
  } else {
    extraQty = 1;
  }

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
            min={1}
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

export default MealExtra;
