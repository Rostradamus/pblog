import React, { Component } from "react";
import { connect } from "react-redux";
import { Auth, PostCardList, PostForm, PostContainer, Register, PageNotFound, AuthModal } from "./contents";
import { NavBar, SlideBar, Landing } from "./frames";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Segment } from "semantic-ui-react";
import { AuthActions } from "Actions";
import "./App.less";

const LOGIN_PATH = "/login";
const REGISTER_PATH = "/register";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideBarVisible: false
    };
  }

  componentDidMount() {
    if (!this.props.user) {
      this.props.fetchUserCookie();
    }
    else if (this._shouldRedirectToLogin()) {
      window.location = "/login";
    }
  }

  _sendToggleToSlideBar() {
    this.setState({
      slideBarVisible: !this.state.slideBarVisible
    });
  }

  render() {
    const bodyContent = (this.props.user && this.props.user._id) ? this._renderRoutes() : this._renderAuthRoutes();
    return (
      <Router>
        <div className="App">
          <NavBar toggleHandler={ this._sendToggleToSlideBar.bind(this) } />
          <SlideBar
            pusher={ <Segment inverted className="app-body" content={bodyContent} /> }
            visible={ this.state.slideBarVisible } />
          <AuthModal />
        </div>
      </Router>
    );
  }

  _renderRoutes() {
    return (
      <Switch>
        <Route key="landing" exact path="/" component={Landing} />
        <Route key="post_list" path="/post/list" component={PostCardList} />
        <Route key="post_form" exact path="/post/new/" component={PostContainer} content={PostForm}/>
        <Route key="post_edit" path="/post/edit/:postId" component={PostContainer} content={PostForm} />
        <Route key="post_detail" path="/post/detail/:postId" component={PostContainer} />
        <Route key="page_404" path="*" component= { PageNotFound } />
      </Switch>
    );
  }

  _renderAuthRoutes() {
    return (
      <Switch>
        <Route key="landing" exact path="/" component={Landing} />
        <Route key="post_list" path="/post/list" component={PostCardList} />
        <Route key="post_detail" path="/post/detail/:postId" component={PostContainer} />
        <Route key="register" path={ REGISTER_PATH } component={ Register } />
        <Route key="login" path={ LOGIN_PATH } component={ Auth } />
        <Route key="page_404" path="*" component= { PageNotFound } />
      </Switch>
    );
  }

  _shouldRedirectToLogin() {
    const bIsAuthPage = window.location.pathname === LOGIN_PATH || window.location.pathname === REGISTER_PATH;
    return !this.props.user && !bIsAuthPage;
  }
}

const mapStateToProps = state => ({user: state.auth});
const mapDispatchToProps = dispatch => ({
  fetchUserCookie: () => {
    dispatch(AuthActions.fetchUserSession());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
