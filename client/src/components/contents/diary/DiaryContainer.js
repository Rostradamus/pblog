import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchDiaries } from "Actions/DiaryActions";
import DiaryCalendar from "./DiaryCalendar";
import DiaryContent from "./DiaryContent";

class DiaryContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid className="diary-container" columns={1} >
        <Grid.Column>
          <Route
            key="diary_calendar" exact path="/diaries"
            component={ DiaryCalendar } />
          <Route
            key="diary_content" path="/diaries/:id"
            component={ DiaryContent } />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  diaries: state.diaries
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchDiaries
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DiaryContainer);
