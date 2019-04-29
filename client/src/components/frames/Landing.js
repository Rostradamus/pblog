import React, { Component } from "react";
import { Grid, Header, Button, Icon } from "semantic-ui-react";
import "./Landing.less";

class Landing extends Component {

  render() {
    return (
      <Grid
        textAlign="center"
        verticalAlign="bottom"
        columns={1}
        centered
        style={{
          height: "100%"
        }}>
        <Grid.Row style={{ maxWidth:450 }}>
          <Grid.Column
            textAlign="center">
            <Header
              as="h2"
              content="ro.stradamus"
              inverted
              style={{
                fontSize: "4em",
                fontWeight: "normal"
              }} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column
            textAlign="center">
            <Button
              color="grey"
              as="a"
              href="https://github.com/rostradamus">
              <Icon name="github" /> GitHub
            </Button>
            <Button
              color="instagram"
              as="a"
              href="https://drive.google.com/file/d/1CH2IE9PEvqxr7L9axM8i3cAskKus8VMB/view?usp=sharing">
              <Icon name="address book" /> Resume
            </Button>
            <Button
              color="linkedin"
              as="a"
              href="https://www.linkedin.com/in/hyung-ro-lee-974b43168/">
              <Icon name="linkedin" /> LinkedIn
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Landing;
