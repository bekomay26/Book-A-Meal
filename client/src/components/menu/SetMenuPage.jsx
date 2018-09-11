import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tab } from 'semantic-ui-react';
import { loadMeal } from '../../actions/mealActions';
import { saveDayMenu } from '../../actions/menuActions';
import '../../assets/styles/selmenu.css';
import AddMenuMeals from './AddMenuMeals';
import AdminLayout from '../common/AdminLayout';
// import cx from 'classnames'

export class SetMenuPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      mealIds: [],
      activeIndex: 1,
    };
    this.onSelect = this.onSelect.bind(this);
    this.onSave = this.onSave.bind(this);
    this.redirectTo = this.redirectTo.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  componentDidMount() {
    this.props.loadMeal(50, 0);
  }

  onSelect(e, meal) {
    if (e.target.tagName === 'LI') {
      e.target.classList.toggle('checked');
      this.state.mealIds.push(meal.id);
    }
  }
  onSave(event) {
    event.preventDefault();
    this.props.saveDayMenu({ mealIds: this.state.mealIds });
    this.props.loadMeal();
  }

  redirectTo(event, index) {
    event.preventDefault();
    this.setState({ activeIndex: index });
  }

  handleTabChange(index) {
    this.setState({ activeIndex: index });
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
        <Tab className="manage-menu-tab-body" menu={{ secondary: true, pointing: true }} panes={panes} value={this.state.activeIndex} />
      </div>
    );
    return (
      <AdminLayout content={pageContent} redirectTo={this.redirectTo} page="Set Menu" />
    );
  }
}

SetMenuPage.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.shape).isRequired,
  loadMeal: PropTypes.func.isRequired,
  saveDayMenu: PropTypes.func.isRequired,
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
const mapStateToProps = state => ({
  meals: state.mealReducer.meals,
});

export default connect(mapStateToProps, mapDispatchToProps)(SetMenuPage);
