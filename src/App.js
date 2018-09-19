import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function Nav(props) {
  return (
    <div className="navigation">
      <div className="left"></div>
      <div className="middle"></div>
      <div className="right"></div>
    </div>
  );
}

function Button(props) {
  const className = props.className || "";
  const selected = className + " " + (props.selected ? 'selected' : '');

  return (
    <div className={selected} >
      <div className="button" onClick={props.select}></div>
    </div>
  );
}

class Tabs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      left: true,
      right: false
    };
  }

  leftTab() {
    console.log('left');
    this.setState({
      left: true,
      right: false
    });
  }

  rightTab() {
    console.log('right');
    this.setState({
      left: false,
      right: true
    });
  }

  render(props) {
    return (
      <div className="tabs">
        <Button className="left" selected={this.state.left} select={this.leftTab.bind(this)}></Button>
        <Button className="right" selected={this.state.right} select={this.rightTab.bind(this)}></Button>
      </div>
    );
  }
}

function CardOne(props) {
  return (
    <div className="card card-one">
      <div className="top"></div>
      <div className="bottom">
        <div className="title"></div>
        <div className="sub-title"></div>
      </div>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <div className="example tab-slide">
        <Tabs>
        </Tabs>
        <CardOne></CardOne>
        <CardOne></CardOne>
      </div>
    );
  }
}

export default App;
