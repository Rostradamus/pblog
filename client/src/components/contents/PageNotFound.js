import React, { Component } from "react";
import { Grid, Header, Item, Icon } from "semantic-ui-react";

class PageNotFound extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid
        textAlign="center"
        verticalAlign="middle"
        centered
        style={{
          height: "80%"
        }}>
        <Grid.Row
          textAlign="center"
          style={{ maxWidth:450 }}>
          <Grid.Column
            textAlign="center">
            <Icon name="ambulance" size="massive"/>
            <Header
              as="h2"
              content="404 page not found"
              inverted />
            <Item>
              We are sorry but the page you are looking for does not exist.
            </Item>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default PageNotFound;
