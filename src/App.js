import logo from './logo.svg';
import './App.css';
import React, { Children } from "react";

// https://www.freecodecamp.org/news/get-pro-with-react-setstate-in-10-minutes-d38251d1c781/  https://freezing-transport.glitch.me/

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

class Home extends React.Component {
  state = {
    magicNumber: 23
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.randomMagicNumber(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  randomMagicNumber = () => {
    return this.setState({
      magicNumber: getRandomInt(1, 100)
    })
  }

  render() {
    return(
      <div className="Home">
          <h1>Home Component</h1>
          <h3>Hey! I am the Home Component</h3>
          <p>and I'm generating this magicNumber inside my life-cycle</p>
          {this.state.magicNumber}
          <p>I'm also passing this number as a prop to my children</p>
          <hr />
          <ChildOfHome magicNumber={this.state.magicNumber} />
          <ChildOfHomeBrothers magicNumber={this.state.magicNumber} />
          <ChildOfHomeSisters magicNumber={this.state.magicNumber} />
      </div>
    )
  }
}

class ChildOfHome extends React.Component {
  render() {
    return(
      <div className="ChildOfHome">
        <h1>Child Of Home (Sibling Component)</h1>
        <h3>Hey! I'm the Child of Home Component and the Magic Number my parent gave me is</h3>
        {this.props.magicNumber}
        <p>I'm rendering props directly and as you can check I keep re-rendering myself according to the flow of the props cascade</p>
        <hr />
      </div>
    )
  }
}

class ChildOfHomeBrothers extends React.Component {
  state = {
    magicNumber: 0
  }

  componentDidMount() {
    this.setState({
      magicNumber: this.props.magicNumber
    })
  }

  render() {
    return(
      <div className="ChildOfHomeBrothers">
        <h1>Child Of Home Brother (Sibling Component)</h1>
        <h3>Hey! I'm the Child of Home Brother Component and the Magic Number my parent gave me is</h3>
        {this.state.magicNumber}
        <p>I'm receiving magicNumber as a prop from my father, {this.props.magicNumber} , and invoking componentDidMount to set this info in the state.</p>
        <p>After that I'm rendering my own state and as you see changes to props that come from my father do not trigger my re-rendering anymore</p>
        <p>Why does this happen?</p>
        <p>Because in the render() method you're calling the state and not the props so render() doesn't know he needs to trigger a re-rendering of the DOM</p>
        <p>As a result, component is not re-rendered and ComponentDidMount that only runs once each time the component is rendered, is not invoked anymore.</p>  
        <hr />
      </div>
    )
  }
}

class ChildOfHomeSisters extends React.Component {
  state = {
    magicNumber: 0
  }

  componentDidMount() {
    this.setState({
      magicNumber: this.props.magicNumber
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
        this.setState({
          magicNumber: this.props.magicNumber
        })
    }
  }

  render() {
    return(
      <div className="ChildOfHomeSisters">
        <h1>Child Of Home Sister (Sibling Component)</h1>
        <h3>Hey! I'm the Child of Home Sister Component and the Magic Number my parent gave me is</h3>
        {this.state.magicNumber}
    <p>I'm receiving magicNumber as a prop from my father, {this.props.magicNumber} , and invoking componentDidMount to set this info in the state.</p>
        <p>As I'm a very smart girl, and I saw that Brother isn't able to keep rendering state updated I'm going to call componentDidUpdate to help me keep my state updated</p>
        <p>As I'm a smartAss WTF Hipster Rockstar I could also call getDerivedStateFromProps!!!</p>
        <p>which would be worse for a lot of reasons that we'll discuss another time!</p>
        <p>What's Wrong Here?</p>
        <p>Guys and Girls, this is an anti-pattern! I'm breaking the props cascade flow for nothing!</p>
        <p>I needed to call my friend componentDidUpdate to render and this is an extra cost for perfomance</p>
        <p>If you do this everywhere in a big App</p>
        <p>You'll end up with lots of unnecessary code</p>
        <p>and with big performance problems!</p>
        <p>Your code gets dirty and after a few weeks you'll have a lot of small fixes and patches</p>
        <p>just to keep everything working!</p>
        <h1>SO DON'T DO THIS IF YOU DON'T NEED TO CHANGE THE PROPS VALUE!</h1>
      </div>
    )
  }
}