import './resty.css';

import React from 'react';
import { connect } from "react-redux";
import superagent from 'superagent';
import ReactJson from 'react-json-view';
import md5 from 'md5';

import * as actions from "./actions.js";


import History from './history/history.js';
import Results from './results/results.js';
import { TopForm, BottomForm } from './form/form.js';

class RESTy extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   url: '',
    //   method: 'get',
    //   requestBody: '',
    //   username: '',
    //   password: '',
    //   token: '',
    //   header: {},
    //   body: {},
    //   history: {},
    //   headersVisible: false,
    // };

    this.state = this.props.data

  }

  componentDidMount() {
    try {
      let history = JSON.parse(localStorage.getItem('history'));
      // this.setState({ history });
      this.props.getHistory({ history })
    } catch (e) {
      console.error(e);
    }
  }

  saveHistory = () => {
    // localStorage.setItem('history', JSON.stringify(this.state.history));
    localStorage.setItem('history', JSON.stringify(this.props.data.history));
  };

  updateHistory = () => {
    let url = new URL(this.props.data.url);

    let lastRun = {
      host: url.hostname,
      path: url.pathname,
      url: this.props.data.url,
      method: this.props.data.method,
      requestBody: this.props.data.requestBody,
      username: this.props.data.username,
      password: this.props.data.password,
      token: this.props.data.token,
      body: {},
      header: {},
    };

    let key = md5(JSON.stringify(lastRun));
    let entry = { [key]: lastRun };
    // let history = { ...this.state.history, ...entry };
    let history = { ...this.props.data.history, ...entry };
    // this.setState({ history });
    this.props.getHistory({ history })
    this.saveHistory();
  };

  resetFormFromHistory = event => {
    event.preventDefault();
    // let newState = this.state.history[event.currentTarget.id];
    let newState = this.props.data.history[event.currentTarget.id];
    // this.setState({ ...newState });
    this.props.handleResetForm(newState);
  };

  handleChange = event => {
    // event.preventDefault();
    let prop = event.target.name;
    let value = event.target.value;
    // this.setState({ [prop]: value });
    this.props.handleChangeForm({ [prop]: value });

    // If basic/bearer, clear the other
    if (prop === 'token') {
      let username = '';
      let password = '';
      // this.setState({ username, password });
      this.props.handleUserPw(username, password);
    }

    if (prop.match(/username|password/)) {
      let token = '';
      // this.setState({ token });
      this.props.handleToken(token);
    }
  };

  toggleHeaders = () => {
    let headersVisible = !this.state.headersVisible;
    // this.setState({ headersVisible });
    this.props.handleHeadersVisible(headersVisible);
  };

  callAPI = event => {
    event.preventDefault();


    let contentType = { 'Content-Type': 'application/json' };
    let bearer = this.props.data.token
      ? { Authorization: `Bearer ${this.props.data.token}` }
      : {};
    let basic =
      this.props.data.username && this.props.data.password
        ? {
          Authorization:
            'Basic ' + btoa(`${this.props.data.username}:${this.props.data.password}`),
        }
        : {};

        

    superagent(this.props.data.method, this.props.data.url)
      .set('Content-Type', 'application/json')
      .set(Object.assign(contentType, bearer, basic))
      .send(this.props.data.requestBody)
      .then(response => {
        let header = response.header;
        let body = response.body;
        // this.setState({ header, body });
        this.props.handleHeaderBody({ header, body });
        this.updateHistory();
      })
      .catch(e => {
        let body = { error: e.message };
        let header = {};
        // this.setState({ header, body });
        this.props.handleHeaderBody(header, body);
      });
  };

  render() {
    return (
      <main>
        {/* <History history={this.state.history} resetFormFromHistory={this.resetFormFromHistory}/> */}
        <History history={this.props.data.history} resetFormFromHistory={this.resetFormFromHistory} />
        <section className="deck">
          <form onSubmit={this.callAPI}>
            <TopForm url={this.props.data.url} method={this.props.data.method} handleChange={this.handleChange} />
            <BottomForm handleChange={this.handleChange} requestBody={this.props.data.requestBody} method={this.props.data.method} toggleHeaders={this.toggleHeaders} headersVisible={this.props.data.headersVisible} username={this.props.data.username} password={this.props.data.password} token={this.props.data.token} />
          </form>
          <Results header={this.props.data.header} body={this.props.data.body} />
        </section>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data
});

const mapDispatchToProps = (dispatch, getState) => ({
  getHistory: payload => dispatch(actions.mount(payload)),
  handleResetForm: payload => dispatch(actions.resetForm(payload)),
  handleChangeForm: payload => dispatch(actions.changeForm(payload)),
  handleUserPw: payload => dispatch(actions.userPw(payload)),
  handleToken: payload => dispatch(actions.token(payload)),
  handleHeadersVisible: payload => dispatch(actions.headers(payload)),
  handleHeaderBody: payload => dispatch(actions.headersBody(payload))


});

// export default RESTy;


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RESTy);
