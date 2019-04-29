import React, { Component } from "react";
import { connect } from "react-redux";
import { Comment, Button } from "semantic-ui-react";
import TimeUtils from "Utils/TimeUtils";
import { CommentActions } from "Actions";
import "./CommentItem.less";

class CommentItem extends Component {
  constructor(props) {
    super(props);
  }

  _handleDeleteComment() {
    const { _id, post } = this.props.comment;
    this.props.deleteComment(post, _id)
      .then(() => {
        this.props.getComments(post);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { author, content, created_at } = this.props.comment;
    return (
      <Comment className="post-content-comment-item">
        <Comment.Content>
          <Comment.Author as="a" content={ author.userName }/>
          <Comment.Metadata content={ TimeUtils.makeTimeToLocalString(created_at) } />
          <Button
            className="delete-item-btn"
            icon="delete"
            size="mini"
            onClick={ this._handleDeleteComment.bind(this) }
            inverted />
          <Comment.Text content={ content } />
          <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    );
  }
}

const mapStateToProps = state => ({
  comments: state.comments
});

const mapDispatchToProps = dispatch => ({
  getComments: async postId => {
    dispatch(CommentActions.getComments(postId));
  },
  deleteComment: async (postId,commentId) => {
    dispatch(CommentActions.deleteComment(postId, commentId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
