import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tab } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import { Drawer, Pagination } from 'antd';
import { loadMeal, saveMeal, deleteMeal, updateMeal } from '../../actions/mealActions';
import { loadExtra } from '../../actions/extraActions';
import '../../assets/styles/mm.css';
import MealList from './MealList';
import AddMeal from './AddMeal';
import AddExtra from './AddExtra';
import AdminLayout from '../common/AdminLayout';
import MealForm from './MealForm';
// import Access from '../common/Access';

export class ManageMealPage extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onSelectAddBtn = this.onSelectAddBtn.bind(this);
    this.onSelectDeleteBtn = this.onSelectDeleteBtn.bind(this);
    this.onTop = this.onTop.bind(this);
    this.goesWith = this.goesWith.bind(this);
    this.updateMealState = this.updateMealState.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
    this.onSelectMealEditBtn = this.onSelectMealEditBtn.bind(this);
    this.mealOnTop = this.mealOnTop.bind(this);
    this.mealGoesWith = this.mealGoesWith.bind(this);
    this.addExtrasOnEdit = this.addExtrasOnEdit.bind(this);
    this.onSelectMealDelBtn = this.onSelectMealDelBtn.bind(this);
    this.getBase64 = this.getBase64.bind(this);
    this.showDrawer = this.showDrawer.bind(this);
    this.onCloseDrawer = this.onCloseDrawer.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.state = {
      meal: {},
      updatedMeal: {},
      extrasList: [],
      extrasTopList: [],
      extraOptId: 0,
      selectValues: [],
      cardImgList: [],
      visible: false,
      currentPage: 1,
    };
  }
  componentDidMount() {
    this.props.loadMeal();
    this.props.loadExtra();
  }

  onSubmit(e) {
    e.preventDefault();
    // const extras = this.state.extrasList.concat(this.state.extrasTopList);
    const extras = this.state.selectValues;
    const extraIds = [];
    extras.map(extra => extraIds.push(extra.id));
    const { meal } = this.state;
    meal.extraIds = extraIds;
    this.setState({ meal });
    this.props.saveMeal(this.state.meal);
  }

  async onUpdate(e) {
    e.preventDefault();
    const { updatedMeal } = this.state;
    updatedMeal.id = this.state.meal.id;
    const extras = this.state.selectValues;
    let extraIds;
    if (extras.length > 0) {
      extraIds = [];
      extras.map(extra => (
        extraIds.push(extra.id)
      ));
      updatedMeal.extraIds = extraIds;
    }
    // this.setState({ updatedMeal, meal: updatedMeal });
    this.setState({ updatedMeal });
    await this.props.updateMeal(this.state.updatedMeal);
    this.onCloseDrawer();
    this.props.loadMeal(); // did to reload page
  }

  onSelectAddBtn(extraOpt, type) {
    const x = this.state.extrasList;
    const y = this.state.extrasTopList;
    const newExtraOptId = this.state.extraOptId + 1;
    const newSelectedList = this.state.selectValues;
    // console.log(newSelectedList);
    if (type === 'goes') {
      newSelectedList.push({
        key: this.state.extraOptId.toString(),
        selectValue: this.goesWith()[0].title,
        id: this.goesWith()[0].id,
      });
      this.setState({ selectValues: newSelectedList });
      x.push(extraOpt);
      this.setState({
        extrasList: x,
        extraOptId: newExtraOptId,
      });
    } else {
      newSelectedList.push({
        key: this.state.extraOptId.toString(),
        selectValue: this.onTop()[0].title,
        id: this.onTop()[0].id,
      });
      this.setState({ selectValues: newSelectedList });
      y.push(extraOpt);
      this.setState({
        extrasTopList: y,
        extraOptId: newExtraOptId,
      });
    }
  }

  onSelectDeleteBtn(event, type) {
    const keyValue = event.target.parentNode.getAttribute('data-key');
    const newSelectedList = this.state.selectValues.filter(ext => ext.key !== keyValue);
    if (type === 'goes') {
      const newExtrasList = this.state.extrasList.filter(ext => ext.key !== keyValue);
      this.setState({
        selectValues: newSelectedList,
        extrasList: newExtrasList,
      });
    } else {
      const newExtrasList = this.state.extrasTopList.filter(ext => ext.key !== keyValue);
      this.setState({
        selectValues: newSelectedList,
        extrasTopList: newExtrasList,
      });
    }
  }

  // in progress, disable option if already selected
  onSelectOption(e) {
    const selected = [];
    const selectOptValue = e.target.parentNode.value;
    if (selectOptValue !== '') {
      selected.push(selectOptValue);
    }
  }

  onTop() {
    const { extras } = this.props;
    let newExt;
    if (extras !== undefined) {
      newExt = extras.filter(extra => extra.category === 'OnTop');
    }
    return newExt;
  }

  onSelectMealEditBtn(currentMeal, goes, top) {
    this.setState({ meal: currentMeal });
    this.clearExtrasFields();
    this.addExtrasOnEdit(goes, 'goes');
    this.addExtrasOnEdit(top, 'onTop');
    this.showDrawer();
    // console.log(currentMeal);
    // currentMeal.extras.forEach((ext, index) => {
    //   this.state.selectValues.push({key: index.toString(), selectValue: ext.title, id: ext.id});
    //   this.setState({extraOptId: this.state.extraOptId+1});
    // });
  }

  onCloseDrawer() {
    this.setState({
      visible: false,
      meal: {},
      extrasList: [],
      extrasTopList: [],
    });
  }

  async onSelectMealDelBtn(meal) {
    try {
      const willDelete = await Swal({
        title: 'Are you sure?',
        text: 'You will not be able to retrieve the meal',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
      });
      if (willDelete.value) {
        this.setState({ meal });
        this.props.deleteMeal(meal.id);
      } else if (willDelete.dismiss === Swal.DismissReason.cancel) {
        Swal(
          'Cancelled',
          'Your meal is safe :)',
          'error',
        );
      }
    } catch (error) {
      if (error) {
        Swal('Oh noes!', 'The request failed!', 'error');
      } else {
        Swal.close();
      }
    }
  }

  showDrawer() {
    this.setState({
      visible: true,
    });
  }


  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleCardChange(info) {
    this.getBase64(info.file.originFileObj, imageUrl => this.setState({
      imageUrl,
    }));
    this.setState({ cardImgList: info });

    // Updatemealstate
    const { meal } = this.state;
    meal.filename = info.file.originFileObj;
    this.setState({ meal });
  }

  clearExtrasFields() {
    this.state.extraOptId = 0;
    this.state.extrasList = [];
    this.state.extrasTopList = [];
    this.state.selectValues = [];
  }

  addExtrasOnEdit(extraOpts, type) {
    const x = this.state.extrasList;
    const y = this.state.extrasTopList;
    const newExtraOptId = this.state.extraOptId + extraOpts.length;
    if (type === 'goes') {
      extraOpts.forEach(ext => x.push(ext));
      this.setState({
        extrasList: x,
        extraOptId: newExtraOptId,
      });
    } else {
      extraOpts.forEach(ext => y.push(ext));
      // console.log(y);
      this.setState({
        extrasTopList: y,
        extraOptId: newExtraOptId,
      });
    }
  }

  updateMealState(event) {
    const field = event.target.name;
    const meal = Object.assign({}, this.state.meal);
    const updatedMeal = Object.assign({}, this.state.updatedMeal);
    if (field === 'filename') {
      meal[field] = event.target.files[0];
      updatedMeal[field] = event.target.files[0];
    } else {
      meal[field] = event.target.value;
      updatedMeal[field] = event.target.value;
    }
    this.setState({ meal, updatedMeal });
  }

  /**
   * loads limited meals into into the state
   */
  handlePageChange(pageNum) {
    const limit = 10;
    const offset = (pageNum - 1) * limit;
    this.props.loadMeal(limit, offset);
    this.setState({
      currentPage: pageNum,
    });
  }

  async handleSelectChange(event) {
    const keyValue = event.target.parentNode.parentNode.getAttribute('data-key');
    const newSelectedList = this.state.selectValues.filter(sel => sel.key !== keyValue);
    const selIndex = event.target.selectedIndex;
    const selId = parseInt((event.target.childNodes[selIndex]).getAttribute('ext-id'), 10);
    newSelectedList.push({ key: keyValue, selectValue: event.target.value, id: selId });
    await this.setState({ selectValues: newSelectedList });
  }

  goesWith() {
    const { extras } = this.props;
    return extras.filter(extra => extra.category === 'GoesWith');
  }

  mealGoesWith(mealExtras) {
    if (mealExtras.length > 0) {
      return mealExtras.filter(extra => extra.category === 'GoesWith');
    }
    return [];
  }
  mealOnTop(mealExtras) {
    if (mealExtras.length > 0) {
      return mealExtras.filter(extra => extra.category === 'OnTop');
    }
    return [];
  }

  render() {
    const meals = [...this.props.meals];
    const panes = [
      {
        menuItem: 'View Meals',
        render: () => (
          <Tab.Pane loading={false} attached={false}>
            <MealList
              meals={meals}
              selectMealEditBtn={this.onSelectMealEditBtn}
              selectMealDelBtn={this.onSelectMealDelBtn}
              mealGoesWith={this.mealGoesWith}
              mealOnTop={this.mealOnTop}
              addExtra={this.addExtrasOnEdit}
              extraOptId={this.state.extraOptId}
              selected={this.onSelectDeleteBtn}
              extrasList={this.state.extrasList}
            />
            <Pagination className="paginate-btn" current={this.state.currentPage} onChange={this.handlePageChange} total={this.props.pagination.totalCount} />;
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Add Meal',
        render: () => (
          <Tab.Pane attached={false}>
            <AddMeal
              onSave={this.onSubmit}
              meal={this.state.meal}
              addExtra={this.onSelectAddBtn}
              selected={this.onSelectDeleteBtn}
              extrasList={this.state.extrasList}
              extrasTopList={this.state.extrasTopList}
              goes={this.props.extras.filter(extra => extra.category === 'GoesWith')}
              top={this.onTop()}
              onChange={this.updateMealState}
              selectChange={this.handleSelectChange}
              selectValues={this.state.selectValues}
              extraOptId={this.state.extraOptId}
              handleCardChange={this.handleCardChange}
              cardImgList={this.state.cardImgList}
              imageUrl={this.state.imageUrl}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Add Extra',
        render: () => (
          <Tab.Pane attached={false}>
            <AddExtra onSave={this.onSaveExtra} onHandleChange={this.onHandleExtraChange} />
          </Tab.Pane>
        ),
      },
    ];
    const pageContent = (
      <div>
        {/* <h2>ManageMeals</h2> */}
        <Tab className="manage-meal-tab-body" menu={{ secondary: true, pointing: true }} panes={panes} />
        <Drawer
          title="Update Meal"
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
          <MealForm
            onSave={this.onUpdate}
            meal={this.state.meal}
            onChange={this.updateMealState}
            extrasList={this.state.extrasList}
            extrasTopList={this.state.extrasTopList}
            top={this.onTop()}
            goes={this.props.extras.filter(extra => extra.category === 'GoesWith')}
            selectChange={this.handleSelectChange}
            addExtra={this.onSelectAddBtn}
            selected={this.onSelectDeleteBtn}
            extraOptId={this.state.extraOptId}


            handleCardChange={this.handleCardChange}
            cardImgList={this.state.cardImgList}
            imageUrl={this.state.imageUrl}
          />
        </Drawer>
      </div>
    );
    return (
      <AdminLayout content={pageContent} page="Manage meals" />
    );
  }
}


ManageMealPage.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  pagination: PropTypes.shape({
    limit: PropTypes.number,
    offset: PropTypes.number,
    totalCount: PropTypes.number,
    totalPages: PropTypes.number,
    pageNum: PropTypes.number,
  }).isRequired,
  saveMeal: PropTypes.func.isRequired,
  deleteMeal: PropTypes.func.isRequired,
  extras: PropTypes.array.isRequired,
  loadMeal: PropTypes.func.isRequired,
  loadExtra: PropTypes.func.isRequired,
  updateMeal: PropTypes.func.isRequired,
};

/**
 * @desc maps dispatch to props;
 * @param {*} dispatch dispatch
 * @returns {*} action to be dispatched
 */
const mapDispatchToProps = dispatch => bindActionCreators({
  loadMeal, saveMeal, deleteMeal, updateMeal, loadExtra,
}, dispatch);

/**
 * @desc maps state to props;
 * @param {*} state store state
 * @returns {*} store state
 */
const mapStateToProps = state => ({
  meals: state.mealReducer.meals,
  pagination: state.mealReducer.pagination,
  extras: state.extraReducer.extras,
  // addBtnClicked: state.addBtnClicked,
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageMealPage);
