import React, { Component } from "react";
import { connect } from "react-redux";
import { Form } from "semantic-ui-react";
import { CommentActions } from "Actions";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }

  async _onSubmitComment() {
    this.props.addComment(this.props.post._id, {
      author: this.props.user._id,
      content: this.state.content
    });
    this.setState({content: ""});
  }

  render() {
    return (
      <Form className="comment-form" onSubmit={ this._onSubmitComment.bind(this) } >
        <Form.Group>
          <Form.Field width={12}>
            <Form.TextArea
              name = "comment-content"
              placeholder = "Leave a comment"
              value = { this.state.content }
              autoHeight
              rows = "1"
              onChange = {(_, newValue) => this.setState({content:newValue.value})} />
          </Form.Field>
          <Form.Field>
            <Form.Button type="submit" content="submit" size="tiny"/>
          </Form.Field>
        </Form.Group>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  post: state.posts.selected,
  user: state.auth
});

const mapDispatchToProps = dispatch => ({
  addComment: async (postId, data) => {
    await dispatch(CommentActions.addComment(postId, data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
