import React, { Component } from 'react';
import {CSSTransition} from 'react-transition-group';
import './App.css';
import anime from 'animejs';

function Nav(props) {
  return (
    <div className="navigation">
      <div className="left"></div>
      <div className="middle"></div>
      <div className="right"></div>
    </div>
  );
}

class Container extends Component {

  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.scrollTop = 0;
  }

  expand(cardElem, cardHeight) {
    this.scroll(cardElem.offsetTop);
    anime({
      targets: cardElem,
      height: [cardHeight, this.containerRef.current.offsetHeight],
      'margin-left': [0, -16],
      'margin-right': [0, -16],
      duration: 300,
      easing: 'easeInOutQuart'
    });
  }

  collapse(cardElem, cardHeight) {
    this.reset();
    anime({
      targets: cardElem,
      height: [cardElem.scrollHeight, cardHeight],
      'margin-left': [-16, 0],
      'margin-right': [-16, 0],
      duration: 300,
      easing: 'easeInOutQuart'
    });
  }

  componentDidMount() {
    this.scrollTop = this.containerRef.current.scrollTop;
  }

  scroll(scrollTop) {
    this.scrollTop = this.containerRef.current.scrollTop;
    anime({
      targets: this.containerRef.current,
      scrollTop: scrollTop,
      duration: 300,
      easing: 'easeInOutQuart'
    });
  }

  reset() {
    anime({
      targets: this.containerRef.current,
      scrollTop: this.scrollTop,
      duration: 300,
      easing: 'easeInOutQuart'
    });
  }

  render() {

    const children = React.Children.map(
      this.props.children, child => {
        return React.cloneElement(child, { expand: this.expand.bind(this),
                                           collapse: this.collapse.bind(this)});
      });

    return (
      <div className={this.props.className}
           ref={this.containerRef}>
        <Nav/>
        {children}
      </div>
    );
  }
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

class ExpandCard extends Component {

  constructor(props) {
    super(props);
    this.state = {loaded: false,
                  expanded: false};
    this.cardRef = React.createRef();
    this.height = 0;
    this.scrollTop = 0;
  }

  componentDidMount() {
    this.height =  this.cardRef.current.offsetHeight + "px";
    this.cardRef.current.style.height = this.height;
    this.setState({loaded: true});
  }

  componentDidUpdate(prevProps, prevState) {
    // only expand/collapse if state has changed
    if (this.state.expanded !== prevState.expanded) {
      if (this.state.expanded) {
        this.props.expand(this.cardRef.current, this.height);
      } else {
        this.props.collapse(this.cardRef.current, this.height);
      }
    }
  }

  render() {
    const loaded = this.state.loaded ? "loaded" : "";
    return (
      <div className={`card card-one expandable-card ${loaded}`}
           ref={this.cardRef}>
        <div className="top"
             onClick={() => {
               this.setState({expanded: !this.state.expanded});
          }}></div>
        <div className="bottom">
          <div className="title"></div>
          <div className="sub-title"></div>
        </div>
        <div className="details">
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
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
        <Container className="example expand-card">
          {[1, 2, 3, 4, 5].map(key => <ExpandCard
                                       key={key}
                                     ></ExpandCard>)}
        </Container>
      </div>
    );
  }
}

export default App;
