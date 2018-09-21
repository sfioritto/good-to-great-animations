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

function Container(props) {
  return (
    <div className="container">
      <Nav/>
      {props.children}
    </div>
  );
}

function Button(props) {
  const className = props.className || "";
  const selected = className + " " + (props.selected ? 'selected' : '');

  return (
    <CSSTransition in={props.selected}
                   timeout={200}
                   classNames={"button"}>
      <div className={selected} >
        <div className="button" onClick={props.select}></div>
      </div>
    </CSSTransition>
  );
}

function CardContainer(props) {
  return (
    <CSSTransition in={props.show}
                   className={`card-container card-container-${props.side}`}
                   classNames={`card-container-${props.side}`}
                   timeout={200}
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
    const cards = this.props.render();
    const side = this.state.left ? "left" : "right";

    return (
      <div className={'tabbed-name ' + this.props.className}>
        <div className="tabs">
          <Button className="left" selected={this.state.left} select={this.leftTab.bind(this)}></Button>
          <Button className="right" selected={this.state.right} select={this.rightTab.bind(this)}></Button>
        </div>
        <div className="card-container-wrapper">
          <CardContainer cards={cards.left} side={'left'} show={this.state.left}/>
          <CardContainer cards={cards.right} side={'right'} show={this.state.right}/>
        </div>
      </div>
    );
  }
}

function CardOne(props) {
  return (
    <div className={"card card-one" + (props.className ? " " + props.className : "")}
         onClick = {props.onClick}>
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

class ExpandCard extends Component {

  constructor(props) {
    super(props);
    this.state = {expanded: props.expanded};
  }

  toggleExpand() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    const expanded = this.state.expanded ? "expanded" : "";
    return (
      <CardOne
        className={`card card-one ${expanded}`}
        onClick={this.toggleExpand.bind(this)}></CardOne>
    );
  }
}

/*
<TabbedContainer className="example tab-slide" render={() => {
            return {
              left: [1, 2].map(key => <CardOne key={key}></CardOne>),
              right: [3, 4, 5].map(key => <CardTwo key={key}></CardTwo>)
            };
        }}/>
*/

class App extends Component {
  render() {
    return (
      <div className="examples">
        <div className="example expand-card">
        <Container>
          {[1, 2, 3, 4].map(key => <ExpandCard key={key} expanded={false}></ExpandCard>)}
        </Container>
        </div>
      </div>
    );
  }
}

export default App;
