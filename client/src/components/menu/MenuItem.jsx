import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
// import classnames from 'classnames';
// import styles from '../../assets/styles/menu2.css';

const MenuItem = ({ meal, selected }) => (
  <div className="col-48 menu-meal-item" onClick={() => selected(meal)}>
    <div className="col-12 image menu-meal-image">
      <img className="menu-meal-img" src={meal.image_url} alt="meal" />
    </div>
    <div className="col-12 imgdesc">
      <div className="row">
        <div className="foodname"><h2>{meal.title}</h2></div>
        <div className="col-8 desc"><p>{meal.description}Periwinkles, stockfish, Palm fruit, Atama and other spices are what makes up this nutritious flavoured soup.</p></div>
      </div>
    </div>
    <div className="col-12 price">
      <div className="col-12 prc">&#x20A6;{meal.price}</div>
    </div>
  </div>
);

MenuItem.propTypes = {
  meal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })
    .isRequired,
  selected: PropTypes.func.isRequired,
};

{/* <div className={classnames(styles["col-48"], styles.item)} onClick={() => selected(meal)}>
    <div className={classnames(styles["col-11"], styles.image)}>
      <img src={meal.image_url} alt="meal" />
    </div>
    <div className={classnames(styles["col-10"], styles.imgdesc)}>
      <div className="row">
        <div className="foodname"><h2>{meal.title}</h2></div>
        <div className={classnames(styles["col-8"], styles.desc)}><p>{meal.description}Periwinkles, stockfish, Palm fruit, Atama and other spices are what makes up this nutritious flavoured soup.</p></div>
      </div>
    </div>
    <div className={classnames(styles["col-10"], styles.price)}>
      <div className={classnames(styles["col-4"], styles.prc)}>&#x20A6;{meal.price}</div>
    </div>
  </div> */}

  {/* <div styleName="row item" onClick={() => selected(meal)}>
    <div styleName="col-2 image">
      <img src={meal.image_url} alt="meal" />
    </div>
    <div styleName="col-10 imgdesc">
      <div styleName="row">
        <div styleName="col-6 foodname"><h2>{meal.title}</h2></div>
      </div>
      <div styleName="row">
        <div styleName="col-8 desc"><p>{meal.description}</p></div>
        <div styleName="col-4 prc">&#x20A6;{meal.price}</div>
      </div>
    </div>
  </div> */}
  
// export default CSSModules(MenuItem, styles, { allowMultiple: true });
export default MenuItem;
