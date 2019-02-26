
import React from "react";
import Square from './Square';
import '../scss/app.scss';


class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.boardWidth = 9;
    this.boardHeight = 9;
    this.mines = 10;
    this.minePositions = this.plantMines();

    this.state = {
      gameOver: false,
      message: ''
    }

    console.log(this.minePositions);

    this.plantMines = this.plantMines.bind(this);
  }

  plantMines() {
    let minePositions = [];
    let numSquares = this.boardHeight * this.boardWidth;

    for(let i = 0; i < this.mines; i++){
      let randPos =  Math.floor((Math.random() * numSquares) + 1);
      minePositions.push(randPos);
    }

    return minePositions;
  }

  onClickEvent(isMine, xPos, yPos) {
    if (isMine) {
      this.setState({ 
        gameOver: true,
        message: 'You lose!',
        msgClass: 'alert-danger'
      });
      return -1;
    }

    let adjacentMines = this.countAdjacentMines(xPos, yPos);
    if(adjacentMines > 0) {
      return adjacentMines;
    }
    else {
      this.showEmptySquares(xPos, yPos);
    }
  }

  showEmptySquares(x, y){
    // base case

    for(let i = x - 1; i < x+2; i++){
      let currRow = this.board[i];
      if (currRow) {
        for(let j = y-1; j < y+2; j++){
          let currSquare = this.board[i].props.children[j];
          if(currSquare && !currSquare.props.isMine) {
            let mines = this.countAdjacentMines(i,j);
            if(mines === 0) {
              // show square and recurse
            }
          }
        }
      }
    }
  }

  countAdjacentMines(x,y) {
    let numMines = 0;
    for(let i = x - 1; i < x+2; i++){
      let currRow = this.board[i];
      if (currRow) {
        for(let j = y-1; j < y+2; j++){
          let currSquare = this.board[i].props.children[j];
          if(currSquare && currSquare.props.isMine) {
            numMines++;
          }
        }
      }
    }

    return numMines;
  }


  constructBoard() {
    let board = [];
    let squareCt = 0;

    for(let i = 0; i < this.boardWidth; i++){
      let row = [];
      for(let j = 0; j < this.boardHeight; j++) {
        squareCt++;
        let isMine = this.minePositions.indexOf(squareCt) >= 0;
        row.push(
          <Square
            xPos={i}
            yPos={j}
            adjMines={0}
            key={squareCt} 
            isMine={isMine} 
            gameOver={this.state.gameOver}
            onClickEvent={this.onClickEvent.bind(this)}
          />
        )
      }
      board.push(<div key={i}>{ row }</div>);
    }

    return board;
  }

  render() {
    this.board = this.constructBoard();

    return (
      <div>
        <h1>Minesweeper</h1>
        <h3 className={ 'alert ' + (this.state.msgClass) }>{ this.state.message }</h3>
        <div className='board'>
          { this.board }
        </div>
      </div>
    )
  }
}

module.exports = App;