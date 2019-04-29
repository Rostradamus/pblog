import React, { Component } from "react";
import { Button, Modal, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { ModalActions } from "Actions";

class AuthModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { modalState, closeModal } = this.props;
    return (
      <Modal
        size="mini"
        open={ modalState.isModalOpen }
        onClose={ this.close }
        basic>
        <Modal.Content
          as="p"
          content={ modalState.content }/>
        <Modal.Actions>
          <Button color="green" onClick={ closeModal } inverted>
            <Icon name="checkmark" /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  modalState: state.modal
});
const mapDispatchToProps = dispatch => ({
  closeModal: () => {
    dispatch(ModalActions.closeModal());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);
