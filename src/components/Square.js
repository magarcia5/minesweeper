import React from "react";

class Square extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isMine: props.isMine,
      clicked: false,
      gameOver: props.gameOver
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ gameOver: nextProps.gameOver });
  }

  onSquareClick() {
    this.setState({
      clicked: true
    });

    let adjMines = this.props.onClickEvent(this.state.isMine, this.props.xPos, this.props.yPos);
    if (adjMines > 0) {
      this.setState({ adjMines });
    }
  }

  render() {
    let content;

    if(this.state.isMine) {
      content = <div className={'mine ' + (this.state.clicked || this.state.gameOver ? 'show' : 'hide')}></div>;
    } 
    else {
      content = <div className={'' + (this.state.clicked ? 'show' : 'hide')}>{this.state.adjMines}</div>;
    }

    return (
      <button 
        disabled={this.state.gameOver}
        onClick={() => this.onSquareClick()} 
        className={'square ' + (this.state.clicked && !this.state.isMine ? 'clicked-safe' : 'unclicked')}
      >
      <div>
        { content }
      </div>
      </button>
    )
  }
}

module.exports = Square;