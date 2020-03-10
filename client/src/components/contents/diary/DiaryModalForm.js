import React, { Component } from "react";
import { Modal, Form, Button, Icon } from "semantic-ui-react";
import DefaultTextEditor from "Shared/components/DefaultTextEditor";
import escapeHtml from "escape-html";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Text } from "slate";
import { addDiary } from "Actions/DiaryActions";

const initialState = {
  title: "",
  textValue: [
    {
      type: "paragraph",
      children: [
        { text: "" }
      ]
    }
  ]
};

class DiaryModalForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.onClose = this.onClose.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  setTextValue(value) {
    this.setState({textValue: value});
  }

  onClose() {
    this.setState(initialState);
    this.props.onClose();
  }

  onSave() {
    const { selectedCalendarData } = this.props;
    const serializedTextValue = this.state.textValue.reduce((acc, curr) => acc + this.serializeTextValue(curr), "");

    this.props.addDiary({
      title: this.state.title,
      start: selectedCalendarData.start,
      end: selectedCalendarData.end,
      content: serializedTextValue,
      allDay: true
    });

    this.onClose();
  }

  serializeTextValue(node) {
    if (Text.isText(node)) {
      let serlializedLeaf = escapeHtml(node.text);
      if (node.bold) {
        serlializedLeaf = `<strong>${serlializedLeaf}</strong>`;
      }

      if (node.code) {
        serlializedLeaf = `<code>${serlializedLeaf}</code>`;
      }

      if (node.italic) {
        serlializedLeaf = `<em>${serlializedLeaf}</em>`;
      }

      if (node.underline) {
        serlializedLeaf = `<u>${serlializedLeaf}</u>`;
      }
      return serlializedLeaf;
    }

    const children = node.children.map(n => this.serializeTextValue(n)).join("");

    switch (node.type) {
    case "quote":
      return `<blockquote><p>${children}</p></blockquote>`;
    case "bulleted-list":
      return `<ul>${children}</ul>`;
    case "heading-one":
      return `<h1>${children}</h1>`;
    case "heading-two":
      return `<h2>${children}</h2>`;
    case "list-item":
      return `<li>${children}</li>`;
    case "numbered-list":
      return `<ol>${children}</ol>`;
    default:
      return `<p>${children}</p>`;
    }
  }

  render() {
    const { selectedCalendarData } = this.props;
    const isOpen = selectedCalendarData !== null;
    return (
      <Modal className="diary-modal-form" closeOnDimmerClick={ false }
        onClose={ this.onClose } open={ isOpen }>
        <Modal.Header>
          New Diary
        </Modal.Header>
        <Modal.Content>
          <Form className="diary-form-content">
            <Form.Input
              placeholder="Title"
              onChange={ (_, data) => this.setState({title: data.value}) }
            />
            <DefaultTextEditor
              value={ this.state.textValue }
              onChange={ this.setTextValue.bind(this) }/>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button.Group>
            <Button content="Close" onClick={ this.onClose } />
            <Button.Or />
            <Button color="red" onClick={ this.onSave }>
              <Icon name="heart" />
              Save
            </Button>
          </Button.Group>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  addDiary
}, dispatch);

export default connect(null, mapDispatchToProps)(DiaryModalForm);

