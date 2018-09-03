import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import UserNavBar from './UserNavBar';
import AdminNavBar from './AdminNavBar';
import '../../assets/styles/adminlayout.css';

class AdminLayout extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isDesktop: false,
    };
    this.updatePredicate = this.updatePredicate.bind(this);
  }
  componentDidMount() {
    this.updatePredicate();
    window.addEventListener('resize', this.updatePredicate);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updatePredicate);
  }

  updatePredicate() {
    this.setState({ isDesktop: window.innerWidth > 960 });
  }

// const AdminLayout = ({ content }) => {
  render() {
    const { isDesktop } = this.state;
    const { content } = this.props;
    const { SubMenu } = Menu;
    const { Content, Sider } = Layout;
    const desktopPage = (
      <Layout>
        {/* <UserNavBar /> */}
        <AdminNavBar />
        <Layout className="sidelayout">
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" title={<span><img src="https://png.icons8.com/ios/80/ffffff/combo-chart.png" alt="analytics" />Dashboard</span>} />
              <SubMenu key="sub2" title={<span><img src="https://png.icons8.com/wired/80/ffffff/hamburger.png" alt="meals" />Meals</span>}>
                <Menu.Item key="5">View Meals</Menu.Item>
                <Menu.Item key="6">Add Meal</Menu.Item>
                <Menu.Item key="7">Add Extra</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><img src="https://png.icons8.com/ios/80/ffffff/checked-truck.png" alt="orders" />Orders</span>} />
              <SubMenu key="sub4" title={<span><img src="https://png.icons8.com/ios/80/ffffff/restaurant-menu.png" alt="menu" />Menu</span>}>
                <Menu.Item key="9">Set Menu</Menu.Item>
                <Menu.Item key="10">Edit Menu</Menu.Item>
                <Menu.Item key="11">Menu History</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 650,
              maxHeight: 650,
              overflow: 'auto',
            }}
            >
              {content}
            </Content>
          </Layout>
        </Layout>
      </Layout>);
    const mobilePage = (
      <div>
        <AdminNavBar />
        { content }
      </div>
    );
    return (
      <div>
        {/* {desktopPage} */}
        { isDesktop ? desktopPage : mobilePage }
      </div>
    );
  }
}
AdminLayout.propTypes = {

};

/**
 * @desc maps state to props;
 * @param {*} state store state
 * @returns {*} store state
 */
const mapStateToProps = state => ({
  // isAuthenticated: state.authReducer.isAuthenticated,
  // isCaterer: state.authReducer.isCaterer,
  // userName: state.authReducer.userName,
});

export default connect(mapStateToProps)(AdminLayout);
