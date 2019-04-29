import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, TextArea } from "semantic-ui-react";
import { PostActions } from "Actions";
import "./PostForm.less";

class PostForm extends Component {

  constructor(props) {
    super(props);
    const bIsEditMode = props.match.params.postId ? true : false;
    if (bIsEditMode) {
      this._getFormContent(props.match.params.postId);
    }
    this.state = {
      title: "",
      author: props.user,
      content: "",
      attachment: ""
    };
  }

  _submitHandler() {
    const data = this.state,
      history = this.props.history,
      postId = this.props.match.params.postId;
    postId ? this.props.editPost(data, history) : this.props.createPost(data, history);
  }

  _onChangeInputHandler(e) {
    const key = e.target.name;
    this.setState({
      [key]: e.target.value
    });
  }

  async _getFormContent(postId) {
    await this.props.selectPost(postId);
    if (!this.props.posts.selected.bIsAuthor) {
      this.props.history.goBack();
      return;
    }
    this.setState(this.props.posts.selected);
  }

  render() {
    return (
      <Form
        inverted
        className="post-form"
        onSubmit={ this._submitHandler.bind(this) }
        loading= { this.props.posts.isFetching }>
        <Form.Field className="post-form-field-title">
          <label className="field-label">Title</label>
          <input
            name="title"
            placeholder="Title"
            value={ this.state.title }
            onChange = { this._onChangeInputHandler.bind(this) } />
        </Form.Field>
        <Form.Field className="post-form-field-content">
          <label className="field-label">Contents</label>
          <TextArea
            className="content-text-area"
            name="content"
            placeholder="Please enter your input"
            value={ this.state.content }
            onChange = { this._onChangeInputHandler.bind(this) } />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  user: state.auth.userName
});
const mapDispatchToProps = dispatch => ({
  editPost: (data, history) => {
    dispatch(PostActions.editPost(data, history));
  },
  createPost: (data, history) => {
    dispatch(PostActions.createPost(data, history));
  },
  selectPost: async postId => {
    await dispatch(PostActions.selectPost(postId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
