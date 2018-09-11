import React from 'react';
import { Checkbox, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const OrderExtra = ({
  extra, onQtyChange, extraStatus, handleChecked,
}) => {
  const extStatPosition = extraStatus.findIndex(extraStat => extraStat.key === extra.id);
  let extraQty = 1;
  if (extraStatus[extStatPosition] !== undefined) {
    extraQty = extraStatus[extStatPosition].qty;
  } else {
    extraQty = 1;
  }

  return (
    <div className={`extra-${extra.id}`}>
      <Grid divided="vertically">
        <Grid.Row>
          <Grid.Column width={8}>
            <Checkbox
              onChange={event => handleChecked(event, extra.id, extra, extraQty)}
              className="menu-modalextra-text"
              label={extra.title}
            />
          </Grid.Column>
          <Grid.Column width={4} className="menu-modalextra-qty-grid">
            <input
              type="number"
              className="col-3 menu-modalextra-qty"
              onInput={event => onQtyChange(event, extra.id, extra.price)}
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
    </div>
  );
};

OrderExtra.propTypes = {
  extra: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })
    .isRequired,
  onQtyChange: PropTypes.func.isRequired,
  handleChecked: PropTypes.func.isRequired,
  extraStatus: PropTypes.array.isRequired,
};

export default OrderExtra;
