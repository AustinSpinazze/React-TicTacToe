import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    // React components can have state by setting this.state in their constructors. this.state should be considered as 
    // private to a React component that it’s defined in. Let’s store the current value of the Square in this.state, 
    // and change it when the Square is clicked.
    constructor(props) {
        super(props);    // In JavaScript classes, you need to always call super when defining the constructor of a subclass.
                         // All React component classes that have a constructor should start it with a super(props) call.
        this.state = {
            value: null,
        };
    }

    render() {
      return (
        // Added onClick that makes the button now interactive and then we call an anonmyous function inside the onClick event
        // <button className="square" onClick={function() { alert('click'); }}>
        // We can also save some space by using ES6 Arrow function syntax
        // <button className="square" onClick={() => alert('click')}>
        //   {this.props.value} */}
        // </button>
        //   {/* We changed this to state because used a constructor to allow our Component to have state */}
        // --------------------------------------------------------------------------------------------------------------------
        // By calling this.setState from an onClick handler in the Square’s render method, we tell React to re-render that Square whenever its <button> is clicked. 
        // After the update, the Square’s this.state.value will be 'X', so we’ll see the X on the game board. If you click on any Square, an X should show up.
        // When you call setState in a component, React automatically updates the child components inside of it too.
        <button className="square" onClick={() => this.setState({value: 'X'})}>
            {this.state.value}
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    
    renderSquare(i) {
        // Here we are passing all the numbers for the squares to the Square component by using props
      return <Square value={i} />;
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );