import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CSSModules from 'react-css-modules';
import { loadMeal } from '../../actions/mealActions';
import { saveDayMenu } from '../../actions/menuActions';
import NavBar from '../common/NavBar';
import '../../assets/styles/selmenu.css';
import AddMenuMeals from './AddMenuMeals';
import { Tab } from 'semantic-ui-react';
import AdminLayout from '../common/AdminLayout';
// import cx from 'classnames'

class SetMenuPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      mealIds: [],
    };
    this.onSelect = this.onSelect.bind(this);
    this.onSave = this.onSave.bind(this);
    // this.myMeal = this.myMeal.bind(this);
    // this.goesWith = this.goesWith.bind(this);
    // this.onTop = this.onTop.bind(this);
  }

  // onSelect(e, meal) {
  //   console.log('dsffs');
  //   if (e.target.tagName === 'LI') {
  //     e.target.classList.toggle('checked');
  //   }
  // }

  componentDidMount() {
    this.props.loadMeal();
  }

  onSelect(e, meal) {
    if (e.target.tagName === 'LI') {
      // e.target.classList.toggle('selmenu__checked__23Wh7');
      e.target.classList.toggle('checked');
      this.state.mealIds.push(meal.id);
      console.log(this.state.mealIds);
    }
  }
  onSave(event) {
    event.preventDefault();
    console.log({ mealIds: this.state.mealIds });
    this.props.saveDayMenu({ mealIds: this.state.mealIds });
    // console.log({ mealI});
  }

  render() {
    const { meals } = this.props;
    const panes = [
      {
        menuItem: 'Set Menu',
        render: () => (
          <Tab.Pane loading={false} attached={false}>
            <AddMenuMeals
              onSave={this.onSave}
              onSelect={this.onSelect}
              meals={meals}
            />
          </Tab.Pane>
        ),
      },
      { menuItem: 'Edit Menu Meals', render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane> },
      { menuItem: 'Menu History', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane> },
    ];
    const pageContent = (
      <div>
        {/* <h2>Manage Menu</h2> */}
        <Tab className="manage-menu-tab-body" menu={{ secondary: true, pointing: true }} panes={panes} />
      </div>
    );
    return (
      <AdminLayout content={pageContent} />
    );
  }
}

SetMenuPage.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.shape).isRequired,
  // menu: PropTypes.shape({
  //   success: PropTypes.bool.isRequired,
  //   message: PropTypes.string.isRequired,
  //   meals: PropTypes.arrayOf(PropTypes.shape).isRequired,
  // })
  //   .isRequired,
  loadMeal: PropTypes.func.isRequired,
  saveDayMenu: PropTypes.func.isRequired,
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
const mapDispatchToProps = dispatch => bindActionCreators({ loadMeal, saveDayMenu }, dispatch);

/**
 * @desc maps state to props;
 * @param {*} state store state
 * @returns {*} store state
 */
const mapStateToProps = (state, ownProps) => {
  // const mealId = ownProps.params.id;
  return ({
    meals: state.mealReducer,
  });
};

// const SetMenuPageWithCSS = CSSModules(SetMenuPage, styles, { allowMultiple: true });
export default connect(mapStateToProps, mapDispatchToProps)(SetMenuPage);
