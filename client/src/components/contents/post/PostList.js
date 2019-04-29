import React, { Component } from "react";
import { connect } from "react-redux";
import { PostActions, CommentActions } from "Actions";
import { Link } from "react-router-dom";
import { Container, Divider, List } from "semantic-ui-react";
import TimeUtils from "Utils/TimeUtils";

class PostList extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  _handleTitleClick(post_id) {
    this.props.selectPost(post_id);
    this.props.getComments(post_id);
  }

  getListItem() {
    return this.props.posts.items.map(post =>
      (
        <List.Item key={post._id}>
          <List.Icon name='github' size='large' verticalAlign='middle' />
          <List.Content>
            <List.Header
              as={ Link }
              to={ `/post/detail/${post._id}` }
              onClick = { this._handleTitleClick.bind(this, post._id)}
              content={ post.title } />
            <List.Description
              content={ `Updated at ${TimeUtils.makeTimeToLocalString(post.time)} by ${post.author}`} />
          </List.Content>
        </List.Item>)
    );
  }

  render() {
    return (
      <Container>
        <Divider />
        <List divided relaxed inverted>
          { this.getListItem() }
        </List>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth,
  posts: state.posts
});
const mapDispatchToProps = dispatch => ({
  selectPost: async postId => {
    dispatch(PostActions.selectPost(postId));
  },
  fetchPosts: () => {
    dispatch(PostActions.fetchPosts());
  },
  getComments: async postId => {
    dispatch(CommentActions.getComments(postId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
