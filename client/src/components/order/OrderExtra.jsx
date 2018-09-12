import React from 'react';
import { Checkbox, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const OrderExtra = ({
  extra, onQtyChange, extraStatus, handleChecked, editable,
}) => {
  const extStatPosition = extraStatus.findIndex(extraStat => extraStat.key === extra.id);
  let extraQty = 1;
  let exists = false;
  if (extraStatus[extStatPosition] !== undefined) {
    extraQty = extraStatus[extStatPosition].qty;
    if (extraStatus[extStatPosition].price) {
      exists = true;
    } else {
      exists = false;
    }
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
              disabled={!editable}
              checked={exists}
// If there exists a price field, that means it was checked.
// not appropriate but will do for now or add an extra field
            />
          </Grid.Column>
          <Grid.Column width={4} className="menu-modalextra-qty-grid">
            <input
              type="number"
              className="col-3 menu-modalextra-qty"
              onInput={event => onQtyChange(event, extra.id, extra.price)}
              defaultValue={1}
              min={1}
              disabled={!editable}
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
  editable: PropTypes.bool.isRequired,
};

export default OrderExtra;
