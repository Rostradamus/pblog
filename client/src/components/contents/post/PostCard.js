import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./PostCard.less";

class PostCard extends Component {

  render() {
    const { _id, title, time, content } = this.props.post;

    return (
      <Card className="postCard" color="grey">
        <Card.Content>
          <Card.Header
            as={ Link }
            to={"/post/detail/" + _id}
            content={title} />
          <Card.Meta content={time} />
          <Card.Description content={content} />
        </Card.Content>
        <Card.Content extra>
          <Icon name="user" />
          22 Friends
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(mapStateToProps)(PostCard);
