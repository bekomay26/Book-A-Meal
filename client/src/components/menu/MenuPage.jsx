import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadMenu } from '../../actions/menuActions';
import UserNavBar from '../common/UserNavBar';
import '../../assets/styles/menu.css';
import MenuList from './MenuList';
import MenuModal from './MenuModal';

class MenuPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      // meal: Object.assign({}, this.props.meal),
      meal: {},
    };
    this.onSelect = this.onSelect.bind(this);
    this.myMeal = this.myMeal.bind(this);
    this.goesWith = this.goesWith.bind(this);
    this.onTop = this.onTop.bind(this);
  }

  myMeal(currentMeal){
    document.getElementById("modal-container").style.display ="block";
    // this.setState({meal:this.props.meal});
    this.setState({ meal: currentMeal });
    console.log(`select ${currentMeal.title}`);
    // return currentMeal;
  }

  onSelect() {
    document.getElementById("modal-container").style.display ="block";
    // this.setState({meal:this.props.meal});
    // console.log(`select ${this.props.meal}`);
  }

  onClose() {
    document.getElementById("modal-container").style.display ="none";
  }
  goesWith(mealExtras) {
    if (mealExtras !== undefined)
      return mealExtras.filter(extra => extra.category === 'GoesWith');
    else
      return []
  }
  onTop(mealExtras) {
    if (mealExtras !== undefined)
      return mealExtras.filter(extra => extra.category === 'onTop');
    else
      return []
  }

  /**
   * @desc runs before component mounts
   * @memberof DocumentView
   * @returns {*} has no return value;
   */
  // componentWillMount() {
  //   this.props.loadMenu().then(() => {
  //     this.setState({
  //       menu: this.props.menu,
  //     });
  //   });
  // }
  render() {
    // const { menu } = this.state;
    const { menu } = this.props;

    // Work on
    // const goeswith = mealExtras => mealExtras.filter(extra => extra.category === 'GoesWith');
    const extras = mealExtras => mealExtras.filter(extra => extra.category === 'OnTop');
    // const meaa = menu.pop();
    console.log(`fdfdcvm,fdf ${menu}`);
    return (
      <div>
        <UserNavBar />
        <div id="container" className="container">
          <h1>Today's Menu</h1>
          {/* <div>
          {menu}
          </div> */}
          
          <MenuList meals={menu} selected={this.myMeal} />
          {/* get meal from state or something */}
          <MenuModal meal={this.state.meal} goesWith={this.goesWith} extras={this.onTop} />
          {/* <MenuModal meal={this.state.meal} /> */}
        </div>
      </div>
    );
  }
}

MenuPage.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape).isRequired,
  // menu: PropTypes.shape({
  //   success: PropTypes.bool.isRequired,
  //   message: PropTypes.string.isRequired,
  //   meals: PropTypes.arrayOf(PropTypes.shape).isRequired,
  // })
  //   .isRequired,
  loadMenu: PropTypes.func.isRequired,
  // meal: PropTypes.shape({
  //   id: PropTypes.number.isRequired,
  //   title: PropTypes.string.isRequired,
  //   description: PropTypes.string.isRequired,
  //   price: PropTypes.number.isRequired,
  //   extras: PropTypes.shape.isRequired,
  // })
  //   .isRequired,
};

/**
 * @desc maps dispatch to props;
 * @param {*} dispatch dispatch
 * @returns {*} action to be dispatched
 */
const mapDispatchToProps = dispatch => bindActionCreators({ loadMenu }, dispatch);

/**
 * @desc maps state to props;
 * @param {*} state store state
 * @returns {*} store state
 */
const mapStateToProps = (state, ownProps) => {
  // const mealId = ownProps.params.id;
  return ({
    menu: state.menuReducer,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuPage);
