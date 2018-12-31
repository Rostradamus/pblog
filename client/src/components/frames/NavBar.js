import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react';
import './NavBar.less';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: ''
    };
  }

  _handleClickSlideBar() {
    this.props.toggleHandler();
  }

  _handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  _getAuthStatus() {
    return this.props.auth && this.props.auth._id;
  }

  _createItemRight({path, name}) {
    const { activeItem } = this.state;
    const result =
      <Menu.Item
        position='right'
        className='navbar-right-item'
        as={ Link }
        to={ path }
        key={ name }
        name={ name }
        active={activeItem === name}
        onClick={this._handleItemClick.bind(this)} />;

    return result;
  }

  renderContent() {
    switch (this._getAuthStatus()) {
      case undefined:
      case null:
      case false:
        return (
            <Menu.Item
              className='navbar-right-item'
              position='right'
              key='login'
              name='login'
              as={ Link }
              to='/login' />
          );
      default:
        return (
            <Menu.Item
            className='navbar-right-item'
            position='right'
            key='logout'
            name='logout'
            href='/api/user/logout' />
          );
    }
  }

  renderUserNavigation() {
    const menuItems = [
      {
        path: '/post/list',
        name: 'blog'
      },
      {
        path: '/portfolio',
        name: 'portfolio'
      },
      {
        path: '/sns',
        name: 'SNS'
      }
    ];
    return menuItems.map(data => this._createItemRight(data));
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Segment className='navbar-segment'>
        <Menu pointing secondary inverted>
          <Menu.Item
            className="navbar-left-item"
            header
            position='left'
            content="ro.stradamus"
            as={ Link }
            to="/"
            /*onClick={ this._handleClickSlideBar.bind(this) }*/
            onClick={ this._handleItemClick.bind(this) } />
          <Menu.Item
            className="navbar-right-item"
            position='right'
            as={ Link }
            to='/about'
            key='about'
            name='about'
            active={activeItem === 'about'}
            onClick={ this._handleItemClick.bind(this)} />
          { this.renderUserNavigation() }
          { this.renderContent() }
        </Menu>
      </Segment>
      );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(NavBar);