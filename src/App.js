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
    if (this.state.progress === 100) {
      return this.props.finished();
    } else {
      return (
        <div className="loader">
          <Button
            value="Load the App!"
            progress={this.state.progress}
            load={this.load.bind(this)}
            loading={this.state.loading}/>
        </div>
      );
    }
  }
}

function SimpleCard(props) {
  return (
    <div className="card simple" {...props}>
      <div className="top">
        <div className="title"></div>
        <div className="sub-title"></div>
      </div>
    </div>
  );
}

class CardList extends Component {

  constructor(props) {
    super(props);
    this.state = {loadTransitionFinished: false};
  }

  render() {
    const delay = 60;
    let total = 0;
    const children = React.Children.map(
      this.props.children, child => {
        total = total + delay;
        if (this.state.loadTransitionFinished) {
          return child;
        } else {
          return React.cloneElement(child, {style: {transitionDelay: total + "ms"}});
        }
      });
    return (
      <CSSTransition
        appear={true}
        timeout={this.props.children.length * delay}
        in={true}
        classNames="card-list"
        onEntered={() => this.setState({loadTransitionFinished: true})}>
        <div className="card-list">
          {children}
        </div>
      </CSSTransition>
    );
  }
}

class TabbedContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      left: true,
      right: false
    };
  }

  leftTab() {
    this.setState({
      left: true,
      right: false
    });
  }

  rightTab() {
    this.setState({
      left: false,
      right: true
    });
  }

  render() {
    return (
      <div className="tabbed-container">
        <div className="tabs">
          <CSSTransition
            in={this.state.left}
            timeout={200}
            classNames="tab-left">
            <div className={"tab tab-left" + (this.state.left ? " selected" : "")}>
              <div className="tab-button"
                   onClick={this.leftTab.bind(this)}>
              </div>
            </div>
          </CSSTransition>
          <CSSTransition
            in={this.state.right}
            timeout={200}
            classNames="tab-right">
            <div className={"tab tab-right" + (this.state.right ? " selected" : "")}>
              <div className="tab-button"
                   onClick={this.rightTab.bind(this)}>
              </div>
            </div>
          </CSSTransition>
        </div>
        {this.props.children}
      </div>
    );
  }
}


class App extends Component {
  render() {
    return (
      <div className="animated-app">
        <TabbedContainer>
          <CardList>
            {[1, 2, 3, 4, 5, 6, 7].map(key => <SimpleCard key={key}/>)}
          </CardList>
          <CardList>
            {[1, 2, 3, 4, 5, 6, 7].map(key => <SimpleCard key={key}/>)}
          </CardList>
        </TabbedContainer>
      </div>
    );
  }
}

export default App;
