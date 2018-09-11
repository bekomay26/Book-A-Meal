import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Drawer } from 'antd';
import CSSModules from 'react-css-modules';
import { loadMenu } from '../../actions/menuActions';
import { saveOrder } from '../../actions/orderActions';
import { logout } from '../../actions/authActions';
import UserNavBarConnect from '../common/UserNavBar';
import styles from '../../assets/styles/menu2.css';
import MenuList from './MenuList';
import MenuForm from './MenuForm';

export class MenuPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      meal: {},
      extraStatus: [],
      selectedExtras: [],
      saving: false,
      basePrice: 0,
      totalPrice: 0,
      visible: false,
      isDesktop: false,
    };
    // this.onSelect = this.onSelect.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onClose = this.onClose.bind(this);
    this.myMeal = this.myMeal.bind(this);
    this.goesWith = this.goesWith.bind(this);
    this.onTop = this.onTop.bind(this);
    this.onQtyChange = this.onQtyChange.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.showDrawer = this.showDrawer.bind(this);
    this.onCloseDrawer = this.onCloseDrawer.bind(this);
    this.updatePredicate = this.updatePredicate.bind(this);
  }

  componentDidMount() {
    this.props.loadMenu();// just added
    this.updatePredicate();
    window.addEventListener('resize', this.updatePredicate);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updatePredicate);
  }

  updatePredicate() {
    this.setState({
      isDesktop: window.innerWidth > 960
    });
  }

  async myMeal(currentMeal) {
    this.showDrawer();
    // this.setState({meal:this.props.meal});
    this.setState({
      meal: currentMeal,
      basePrice: currentMeal.price,
      totalPrice: currentMeal.price,
    });

    const newExtraStatus = [];
    // edit extra arrangement wrong
    currentMeal.extras.forEach(ext => newExtraStatus.push({
      isChecked: false, qty: 1, extra: ext, key: ext.id, price: ext.price,
    }));
    await this.setState({ extraStatus: newExtraStatus });
  }


  async onSave(e) {
    e.preventDefault();
    const extrasInfo = this.state.extraStatus.filter(extra => extra.isChecked === true);
    const extraIds = [];
    const extraQtys = [];
    extrasInfo.forEach(ext => extraIds.push(ext.extra.id));
    extrasInfo.forEach(ext => extraQtys.push(ext.qty));
    this.setState({ saving: true });
    await this.props.saveOrder({
      mealId: this.state.meal.id,
      extraIds,
      qtys: extraQtys,
      address: 'dsffsfgfsfvfsvfjysvfbgctf',
    });
    this.onCloseDrawer();
    this.redirect();
  }

  redirect() {
    this.setState({ saving: false });
  }

  onClose() {
    this.clearExtrasFields();
    document.getElementById('modal-container').style.display = 'none';
  }
  goesWith(mealExtras) {
    if (mealExtras !== undefined) {
      // console.log(mealExtras);
      return mealExtras.filter(extra => extra.category === 'GoesWith');
    } else
      return []
  }
  onTop(mealExtras) {
    if (mealExtras !== undefined)
      return mealExtras.filter(extra => extra.category === 'OnTop');
    else
      return []
  }

  clearExtrasFields() {
    this.setState({
      extraStatus: [],
      meal: {},
    });
  }

  onQtyChange(event, key, extraPrice) {
    const status = this.state.extraStatus;
    const extStatPosition = status.findIndex(extraStat => extraStat.key === key);
    status[extStatPosition].qty = parseInt(event.target.value, 10);
    status[extStatPosition].price = extraPrice * (status[extStatPosition].qty);
    let totalMealPrice = this.state.totalPrice;
    let mealPrice = this.state.basePrice;
    for (let i = 0; i < status.length; i += 1) {
      if (status[i].isChecked === true) {
        mealPrice += status[i].price;
      }
    }
    totalMealPrice = mealPrice;
    this.setState({ extraStatus: status, totalPrice: totalMealPrice });
  }

  handleChecked(event, key, extra, extraQuantity) {
    const checked = this.state.extraStatus;
    const selectedExt = this.state.selectedExtras;
    const extStatPosition = checked.findIndex(extraStat => extraStat.key === key);
    let totalMealPrice = this.state.totalPrice;
    if (checked[extStatPosition].isChecked === false) {
      selectedExt.push(extra);
      totalMealPrice += (extra.price * extraQuantity); // If checked, add extra price
    } else {
      const selectedExtPosition = selectedExt.findIndex(extraStat => extraStat.key === key);
      selectedExt.splice(selectedExtPosition, 1);
      totalMealPrice -= (extra.price * extraQuantity); // If unchecked, sub extra price
    }
    checked[extStatPosition].isChecked = !checked[extStatPosition].isChecked;
    this.setState({
      extraStatus: checked,
      selectedExtras: selectedExt,
      totalPrice: totalMealPrice,
    });
  }

  showDrawer() {
    this.setState({
      visible: true,
    });
  }

  onCloseDrawer() {
    this.setState({
      visible: false,
    });
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
    const { userName } = this.props;
    const { isDesktop } = this.state;
    const { isAuthenticated } = this.props;

    // Work on
    // const goeswith = mealExtras => mealExtras.filter(extra => extra.category === 'GoesWith');
    // const extras = mealExtras => mealExtras.filter(extra => extra.category === 'OnTop');
    // const meaa = menu.pop();
    return (
      <div>
        <UserNavBarConnect
          logout={this.props.logout}
          isAuthenticated={isAuthenticated}
          userName={userName}
        />
        <div id="container" className="menu-page-container">
          {isDesktop ? (
            <h1>Today's Menu</h1>) : null
          }

          <MenuList meals={menu} selected={this.myMeal} />
          <Drawer
            title="Order Meal"
            width={400}
            placement="right"
            onClose={this.onCloseDrawer}
            maskClosable={false}
            visible={this.state.visible}
            style={{
              height: 'calc(100% - 55px)',
              overflow: 'auto',
              paddingBottom: 53,
            }}
          >
            <MenuForm
              meal={this.state.meal}
              goesWith={this.goesWith}
              extras={this.onTop}
              onQtyChange={this.onQtyChange}
              extraStatus={this.state.extraStatus}
              handleChecked={this.handleChecked}
              totalMealPrice={this.state.totalPrice}
              onSave={this.onSave}
              onClose={this.onClose}
              saving={this.state.saving}
            />
          </Drawer>
        </div>
      </div>
    );
  }
}

MenuPage.defaultProps = {
  userName: undefined,
  isAuthenticated: false,
};

MenuPage.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape).isRequired,
  loadMenu: PropTypes.func.isRequired,
  saveOrder: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  userName: PropTypes.string,
};

/**
 * @desc maps dispatch to props;
 * @param {*} dispatch dispatch
 * @returns {*} action to be dispatched
 */
const mapDispatchToProps = dispatch => bindActionCreators({
  loadMenu,
  saveOrder,
  logout,
}, dispatch);

/**
 * @desc maps state to props;
 * @param {*} state store state
 * @returns {*} store state
 */
const mapStateToProps = state => ({
  menu: state.menuReducer,
  isAuthenticated: state.authReducer.isAuthenticated,
  userName: state.authReducer.userName,
});

const MenuPageWithCSS = CSSModules(MenuPage, styles);
export default connect(mapStateToProps, mapDispatchToProps)(MenuPageWithCSS);
