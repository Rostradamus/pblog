import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import { Route } from "react-router-dom";
import { PostContent, PostList, PostForm } from "./";
import { PostActions, CommentActions } from "Actions";
import "./PostContainer.less";

class PostContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <Grid className="post-detail-container" columns={2} divided>
        <Grid.Column className="post-detail-content-section" width={10}>
          <Route key="post_form" exact path="/post/new/" component={PostForm} />
          <Route key="post_edit" path="/post/edit/:postId" component={PostForm} />
          <Route key="post_detail" path="/post/detail/:postId" component={PostContent} />
        </Grid.Column>

        <Grid.Column className="post-detail-list-section" width={5}>
          <PostList />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  comments: state.comments
});

const mapDispatchToProps = dispatch => ({
  selectPost: async postId => {
    dispatch(PostActions.selectPost(postId));
  },
  deletePost: async (postId, history) => {
    await dispatch(PostActions.deletePost(postId, history));
  },
  getComments: async postId => {
    dispatch(CommentActions.getComments(postId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
