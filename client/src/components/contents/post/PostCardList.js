import React, { Component } from "react";
import { connect } from "react-redux";
import { PostActions } from "Actions";
import PostCard from "./PostCard";
import { Button, Divider, Card, Menu, Input, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

class PostCardList extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  getPostCards() {
    return this.props.posts.items.map(post =>
      <PostCard key={post._id} post={post} />);
  }

  _hasLoggedIn() {
    return this.props.user && this.props.user._id;
  }

  render() {
    return (
      <div>
        <Menu secondary>
          <Menu.Item>
            <Button
              size="tiny"
              inverted
              as={ Link }
              to="/post/new"
              disabled={ !this._hasLoggedIn() }
              animated="vertical">
              <Button.Content hidden>Create</Button.Content>
              <Button.Content visible>
                <Icon name="add" />
              </Button.Content>
            </Button>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Input icon="search" placeholder="Search..." />
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <Divider />
        <Card.Group itemsPerRow="5" >
          { this.getPostCards() }
        </Card.Group>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth,
  posts: state.posts
});
const mapDispatchToProps = dispatch => ({
  fetchPosts: () => {
    dispatch(PostActions.fetchPosts());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PostCardList);
