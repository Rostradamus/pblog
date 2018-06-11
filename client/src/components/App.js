import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Auth, PostList, PostForm, PostDetail } from './contents';
import { Header, SlideBar } from './frames';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import authActions from 'Actions/authActions';
import './App.less';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideBarVisible: false
    };
  }

  componentDidMount() {
    if (!this.props.user)
      this.props.fetchUser();
  }

  _sendToggleToSlideBar() {
    this.setState({
      slideBarVisible: !this.state.slideBarVisible
    });
  }

  render() {
    const segment = (this.props.user && this.props.user._id) ? this._renderHome() : this._renderNeedAuth();
    return (
      <Router>
        <div className='App'>
          <Header toggleHandler={ this._sendToggleToSlideBar.bind(this) } />
          <SlideBar 
            pusher={ <Container className="appBody"> {segment} </Container> } 
            visible={ this.state.slideBarVisible } />
        </div>
      </Router>
      );
  }

  _renderHome() {
    const routes = [
        // <Route key='landing' exact path="/" component={Landing} />,
        // <Route key='about' exact path="/about" component={Landing} />,
        <Route key='post_list' path="/post/list" component={PostList} />,
        <Route key='post_form' exact path="/post/new/" component={PostForm} />,
        <Route key='post_edit' path="/post/edit/:postId" component={PostForm} />,
        <Route key='post_detail' path="/post/detail/:postId" component={PostDetail} />
      ];
    return routes;
  }

  _renderNeedAuth() {
    return (
        <Container>
          <Auth />
        </Container>
      );
  }
}

const mapStateToProps = state => ({user: state.auth});

export default connect(mapStateToProps, authActions)(App);