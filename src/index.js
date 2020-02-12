import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// class Square extends React.Component {
    // React components can have state by setting this.state in their constructors. this.state should be considered as 
    // private to a React component that it’s defined in. Let’s store the current value of the Square in this.state, 
    // and change it when the Square is clicked.
    // constructor(props) {
    //     super(props);    In JavaScript classes, you need to always call super when defining the constructor of a subclass.
    //                      All React component classes that have a constructor should start it with a super(props) call.
    //     this.state = {
    //         value: null,
    //     };
    // }

    // render() {
    //   return (
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
        // --------------------------------------------------------------------------------------------------------------------

        // When a Square is clicked, the onClick function provided by the Board is called. Here’s a review of how this is achieved:

        // The onClick prop on the built-in DOM <button> component tells React to set up a click event listener.
        // When the button is clicked, React will call the onClick event handler that is defined in Square’s render() method.
        // This event handler calls this.props.onClick(). The Square’s onClick prop was specified by the Board.
        // Since the Board passed onClick={() => this.handleClick(i)} to Square, the Square calls this.handleClick(i) when clicked.
        // We have not defined the handleClick() method yet, so our code crashes. If you click a square now, you should see a red error screen saying something like
        // “this.handleClick is not a function”.
    //     <button className="square" onClick={() => this.props.onClick}>
    //         {this.props.value}
    //     </button>
    //   );
    // }
//   }

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Replaced square class component with square functional component
function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
class Board extends React.Component {
    // Currently, each Square component maintains the game’s state. To check for a winner, we’ll maintain the value of each of the 9 squares in one location.
    // We may think that Board should just ask each Square for the Square’s state. Although this approach is possible in React, we discourage it because the code 
    // becomes difficult to understand, susceptible to bugs, and hard to refactor. Instead, the best approach is to store the game’s state in the parent Board component 
    // instead of in each Square. The Board component can tell each Square what to display by passing a prop, just like we did when we passed a number to each Square.

    // To collect data from multiple children, or to have two child components communicate with each other, you need to declare the shared state in their parent component instead. 
    // The parent component can pass the state back down to the children by using props; this keeps the child components in sync with each other and with the parent component.
    // Lifting state into a parent component is common when React components are refactored — let’s take this opportunity to try it out.

    // Here we add a constructor to the Board and set the Board’s initial state to contain an array of 9 nulls corresponding to the 9 squares:
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        squares[i] = 'X';
        this.setState({squares: squares, xIsNext: !this.state.xIsNext});
    }
    
    renderSquare(i) {
        // Here we are passing all the numbers for the squares to the Square component by using props
        // return <Square value={i} />;

        // We will now use the prop passing mechanism again. We will modify the Board to instruct each individual Square about its current value ('X', 'O', or null). We have already 
        // defined the squares array in the Board’s constructor, and we will modify the Board’s renderSquare method to read from it:

        // Each Square will now receive a value prop that will either be 'X', 'O', or null for empty squares.

        // Next, we need to change what happens when a Square is clicked. The Board component now maintains which squares are filled. We need to create a way for the Square to update 
        // the Board’s state. Since state is considered to be private to a component that defines it, we cannot update the Board’s state directly from Square. Instead, we’ll pass down 
        // a function from the Board to the Square, and we’ll have Square call that function when a square is clicked. We’ll change the renderSquare method in Board to:

        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
    }
  
    render() {
        const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
  
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