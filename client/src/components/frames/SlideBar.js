import React, { Component } from "react";
import { Sidebar, Segment, Menu, Icon } from "semantic-ui-react";
import "./SlideBar.less";

class SlideBar extends Component {

  render() {
    return (
      <Sidebar.Pushable as={Segment} className="frame_pushable">
        <Sidebar
          as={Menu}
          animation="overlay"
          width="wide"
          visible={ this.props.visible }
          icon="labeled"
          vertical
          inverted>
          <Menu.Item name="home">
            <Icon name="home" />
            Home
          </Menu.Item>
          <Menu.Item name="gamepad">
            <Icon name="gamepad" />
            Games
          </Menu.Item>
          <Menu.Item name="camera">
            <Icon name="camera" />
            Channels
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher className="wrapper">
          { this.props.pusher }
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

export default SlideBar;
