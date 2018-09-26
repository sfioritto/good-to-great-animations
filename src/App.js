import React, { Component } from 'react';
import {CSSTransition} from 'react-transition-group';
import './App.css';
import anime from 'animejs';


function Button(props) {
  const loading = props.loading ? "loading" : "";
  const width = props.progress + "%";

  return (
    <CSSTransition in={props.loading} timeout={200} classNames="animated-button">
      <button
        onClick={props.load}
        className={`animated-button ${loading}`}>
        {props.loading ? (
          <span style={{width: width}} className="progress-bar"></span>
        ) : (
          <span className="overlay">{props.value}</span>
        )}
      </button>
    </CSSTransition>
  );
}

class Loader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      progress: 0
    };
  }

  load() {
    this.setState({loading: true});
    const loading = () => {
      if (this.state.progress < 100) {
        this.setState({progress: this.state.progress + 1});
        setTimeout(loading, 10);
      }
    };
    loading();
  }

  render() {
    return (
      <Button
        value="Load the App!"
        progress={this.state.progress}
        load={this.load.bind(this)}
        loading={this.state.loading}/>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="animated-app">
        <Loader />
      </div>
    );
  }
}

export default App;
