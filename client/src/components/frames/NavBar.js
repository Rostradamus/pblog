import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Menu, Segment, Dropdown, Icon } from "semantic-ui-react";
import { AuthActions } from "Actions";
import "./NavBar.less";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: ""
    };
  }

  _handleClickSlideBar() {
    this.props.toggleHandler();
  }

  _handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  _handleLogout() {
    this.props.dispatch(AuthActions.logout());
  }

  _getAuthStatus() {
    return this.props.auth && this.props.auth._id;
  }

  _createItemRight({path, name}) {
    const { activeItem } = this.state;

    return (
      <Menu.Item
        position="right"
        className="navbar-right-item"
        as={ Link }
        to={ path }
        key={ name }
        name={ name }
        active={activeItem === name}
        onClick={this._handleItemClick.bind(this)} />
    );
  }

  _renderAuthMenuItem() {
    return this._getAuthStatus() ?
      (
        <Menu.Item
          className="navbar-right-item"
          position="right"
          key="logout"
          name="logout"
          onClick={ this._handleLogout.bind(this) } />
      ) : (
        <Menu.Item
          className="navbar-right-item"
          position="right"
          key="login"
          name="login"
          as={ Link }
          to="/login" />
      );
  }

  _renderUserNavigation() {
    const menuItems = [
      {
        path: "/post/list",
        name: "blog"
      },
      {
        path: "/project",
        name: "project"
      }
    ];
    return menuItems.map(data => this._createItemRight(data));
  }

  _renderNetworkDropdown() {
    return (
      <Menu.Menu
        position="right"
        className="navbar-right-item">
        <Dropdown floating item text="Network">
          <Dropdown.Menu>
            <Dropdown.Item
              icon="github"
              text="Github"
              as= "a"
              href="https://github.com/rostradamus"/>
            <Dropdown.Item
              icon="linkedin"
              text="Linkdin"
              as="a"
              href="https://www.linkedin.com/in/hyung-ro-lee-974b43168/"/>
            <Dropdown.Item
              icon="instagram"
              text="Instagram"
              as="a"
              href="https://www.instagram.com/ro.stradamus/"/>
            <Dropdown.Item
              icon="google plus"
              text="Google+"
              as="a"
              href="https://plus.google.com/u/0/110409238753873906984"/>
            <Dropdown.Item
              icon="mail"
              text="Email"
              as="a"
              href="mailto: rolee0429@gmail.com"/>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    );
  }

  render() {
    return (
      <Segment className="navbar-segment">
        <Menu pointing secondary inverted>
          <Menu.Item header
            className="navbar-left-item"
            position="left"
            content="ro.stradamus"
            as={ Link }
            to="/"
            onClick={ this._handleItemClick.bind(this) } />
          { this._renderUserNavigation() }
          { this._renderAuthMenuItem() }
          <Menu.Menu position="right" className="navbar-icon-group">
            <Menu.Item icon
              as="a"
              href="https://github.com/rostradamus">
              <Icon name="github" size="large" />
            </Menu.Item>
            <Menu.Item icon
              as="a"
              href="https://www.linkedin.com/in/hyung-ro-lee-974b43168/">
              <Icon name="linkedin" size="large" />
            </Menu.Item>
            <Menu.Item icon
              as="a"
              href="mailto: rolee0429@gmail.com">
              <Icon name="mail" size="large" />
            </Menu.Item>
            <Menu.Item icon
              as="a"
              href="https://www.instagram.com/ro.stradamus/">
              <Icon name="instagram" size="large" />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(NavBar);
