import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tab } from 'semantic-ui-react';
import { Drawer } from 'antd';
import { loadMeal, saveMeal, deleteMeal, updateMeal } from '../../actions/mealActions';
import { loadExtra } from '../../actions/extraActions';
import UserNavBar from '../common/UserNavBar';
import '../../assets/styles/mm.css';
import MealList from './MealList';
import AddMeal from './AddMeal';
import MealModal from './MealModal';
import AddExtra from './AddExtra';
import AdminLayout from '../common/AdminLayout';
import MealForm from './MealForm';

class ManageMealPage extends Component {
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
    this.onHandleExtraChange = this.onHandleExtraChange.bind(this);
    this.onSaveExtra = this.onSaveExtra.bind(this);
    this.getBase64 = this.getBase64.bind(this);
    this.showDrawer = this.showDrawer.bind(this);
    this.onCloseDrawer = this.onCloseDrawer.bind(this);
    // this.clearExtrasFields = this.clearExtrasFields.bind(this);
    // this.getSelectValue = this.getSelectValue.bind(this);
    this.state = {
      meal: Object.assign({}, props.meal),
      updatedMeal: {},
      extrasList: [],
      extrasTopList: [],
      extraOptId: 0,
      selectValues: [],
      cardImgList: [],
      visible: false,
      // value: [],
      // goes: [],
      // top: [],
    };
  }
  componentDidMount() {
    this.props.loadMeal();
    console.log(this.state.meals);
    console.log(this.state.meal);
  }
  // componentDidMount() {
  //   if (this.state.addBtnClicked !== false) {
  //     this.setState({ addBtnClicked: false });
  //   }
  // }

  onSubmit(e) {
    e.preventDefault();
    // const extras = this.state.extrasList.concat(this.state.extrasTopList);
    const extras = this.state.selectValues;
    let extraIds = [];
    extras.map(extra => {
      extraIds.push(extra.id);
    });
    let { meal } = this.state;
    meal.extraIds = extraIds;
    this.setState({ meal });
    // console.log(this.state.meal);
    this.props.saveMeal(this.state.meal);
  }
  
  onUpdate(e) {
    e.preventDefault();
    let { updatedMeal } = this.state;
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
    this.setState({ updatedMeal });
    console.log(this.state.updatedMeal);
    this.props.updateMeal(this.state.updatedMeal);
  }

  onSelectAddBtn(extraOpt, type) {
    const x = this.state.extrasList;
    const y = this.state.extrasTopList;
    const newExtraOptId = this.state.extraOptId + 1;

    const newSelectedList = this.state.selectValues;
    // console.log(this.state.selectValues);

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

    // this.setState({
    //   addBtnClicked: true,
    // });
  }

  onSelectDeleteBtn(event, type) {
    // implement delete
    // console.log(event.target.parentNode.getAttribute('data-key'));
    // console.log(this.state.extrasList[0]);
    // event.target.parentNode.removeNode;
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
    // console.log(this.state.selectValues);
  }

  // in progress, disable option if already selected
  onSelectOption(e) {
    let selected = [];
    let selectOptValue = e.target.parentNode.value;
    if (selectOptValue !== "") {
      selected.push(selectOptValue);
    }
  }

  onTop() {
    const { extras } = this.props;
    if (extras !== undefined) {
      return extras.filter(extra => extra.category === 'OnTop');
    }
    return [];
  }

  onSelectMealEditBtn(currentMeal, goes, top) {
    // document.getElementById('modal-container').style.display = 'block';
    this.setState({ meal: currentMeal });
    this.clearExtrasFields();
    this.addExtrasOnEdit(goes, 'goes');
    this.addExtrasOnEdit(top, 'onTop');
    this.showDrawer();
    // this.setState({
    //   visible: true,
    // });
    // this.mealGoesWith(currentMeal.extras);
    // this.mealOnTop(currentMeal.extras);
    // return currentMeal;
  }

  onCloseDrawer() {
    this.setState({
      visible: false,
      meal: {},
      extrasList: [],
      extrasTopList: [],
    });
  }

  showDrawer() {
    this.setState({
      visible: true,
    });
  }

  async onSelectMealDelBtn(meal) {
    await this.setState({ meal });
    this.props.deleteMeal(this.state.meal.id);
    // this.setState({ meal: {} });
  }

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  handleCardChange(info) {
    console.log("file list id change", info);
    this.getBase64(info.file.originFileObj, imageUrl => this.setState({
      imageUrl,
    }));
    this.setState({ cardImgList: info });

    // Updatemealstate
    let { meal } = this.state;
    meal.filename = info.file.originFileObj;
    return this.setState({ meal });
    console.log(this.state.meal);
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
      console.log(y);
      this.setState({
        extrasTopList: y,
        extraOptId: newExtraOptId,
      });
    }
  }

  // getSelectValue(key) {
  //   const values = this.state.selectValues;
  //   const x = (values.find(sel => sel.key === key.toString()));
  //   if (x) {
  //     console.log(`asas ${x.selectValue}`);
  //     return (x.selectValue);
  //   }
  //   return 'beef';
  // }

  updateMealState(event) {
    const field = event.target.name;
    // let { meal, updatedMeal } = this.state;
    // let meal = { ...this.state.meal };
    // let updatedMeal = { ...this.state.updatedMeal };
    let meal = Object.assign({}, this.state.meal);
    let updatedMeal = Object.assign({}, this.state.updatedMeal);
    if (field === 'filename') {
      // console.log(event.target.files[0]);
      meal[field] = event.target.files[0];
      updatedMeal[field] = event.target.files[0];
    } else {
      meal[field] = event.target.value;
      updatedMeal[field] = event.target.value;
      
      // console.log(meal[field]);
    }
    return this.setState({ meal, updatedMeal });
  }

  async handleSelectChange(event) {
    const keyValue = event.target.parentNode.getAttribute('data-key');
    const newSelectedList = this.state.selectValues.filter(sel => sel.key !== keyValue);
    const selIndex = event.target.selectedIndex;
    const selId = parseInt(event.target.childNodes[selIndex].getAttribute('ext-id'), 10);
    console.log(event.target.childNodes);
    console.log(event.target.childNodes[selIndex]);
    newSelectedList.push({ key: keyValue, selectValue: event.target.value, id: selId });
    await this.setState({ selectValues: newSelectedList });
    // this.forceUpdate();
    // check asyncronou setstate then state
    console.log(this.state.selectValues);
  }

  goesWith() {
    const { extras } = this.props;
    if (extras !== undefined) {
      return extras.filter(extra => extra.category === 'GoesWith');
    }
    return [];
  }

  mealGoesWith(mealExtras) {
    if (mealExtras !== undefined) {
      // console.log(mealExtras.filter(extra => extra.category === 'GoesWith'));
      return mealExtras.filter(extra => extra.category === 'GoesWith');
    }
    return [];
  }
  mealOnTop(mealExtras) {
    if (mealExtras !== undefined)
      return mealExtras.filter(extra => extra.category === 'OnTop');
    else
      return []
  }

  onHandleExtraChange() {
    event.preventDefault();
    // To Do
  }

  onSaveExtra() {
    event.preventDefault();
    // To Do
  }


  render() {
    const { meals } = this.props;
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
            goes={this.props.extras.filter(extra => extra.category === 'GoesWith')}
            top={this.onTop()}
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
      <AdminLayout content={pageContent} />
    );
  }
}


ManageMealPage.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  extras: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveMeal: PropTypes.func.isRequired,
  deleteMeal: PropTypes.func.isRequired,
  meal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    extras: PropTypes.shape.isRequired,
  }),
  // addBtnClicked: PropTypes.bool.isRequired,
};

/**
 * @desc maps dispatch to props;
 * @param {*} dispatch dispatch
 * @returns {*} action to be dispatched
 */
const mapDispatchToProps = dispatch => bindActionCreators({ loadMeal, saveMeal, deleteMeal, updateMeal, loadExtra }, dispatch);

/**
 * @desc maps state to props;
 * @param {*} state store state
 * @returns {*} store state
 */
const mapStateToProps = state => ({
  meals: state.mealReducer,
  extras: state.extraReducer,
  // addBtnClicked: state.addBtnClicked,
});

// const ManageMealPageWithCSS = CSSModules(ManageMealPage, styles, { allowMultiple: true });
// export default connect(mapStateToProps, mapDispatchToProps)(ManageMealPageWithCSS);
export default connect(mapStateToProps, mapDispatchToProps)(ManageMealPage);
