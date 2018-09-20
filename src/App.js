import React, { Component } from 'react';
import {CSSTransition} from 'react-transition-group';
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

function CardContainer(props) {
  return (
    <CSSTransition in={props.show}
                   className="card-container"
                   classNames={`card-container-${props.side}`}
                   timeout={3000}
                   component={"div"}>
      <div className={props.side}>
        {props.cards}
      </div>
    </CSSTransition>
  );
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
    const cards = this.props.render(this.state.left, this.state.right);
    const side = this.state.left ? "left" : "right";

    return (
      <div className={'tabbed-name ' + this.props.className}>
        <div className="tabs">
          <Button className="left" selected={this.state.left} select={this.leftTab.bind(this)}></Button>
          <Button className="right" selected={this.state.right} select={this.rightTab.bind(this)}></Button>
        </div>
        <CardContainer cards={cards} side={side} show={true}/>
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

function CardTwo(props) {
  return (
    <div className="card card-two">
      <div className="top">
        <div className="title"></div>
        <div className="sub-title"></div>
      </div>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <TabbedContainer className="example tab-slide" render={(left, right) => {
          const timeout = 200;
        if (left) {
          return [1, 2].map(key => <CardOne key={key}></CardOne>);
        } else {
          return [3, 4, 5].map(key => <CardTwo key={key}></CardTwo>);
        }
      }}/>
    );
  }
}

export default App;
