import React from "react";
import Image from "../static/tic-tac-toe-clipart-8.jpg";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onCreateHandler = () => {
    this.props.history.push("/create");
  };

  onJoinHandler = () => {
    this.props.history.push("/join/new");
  };

  render() {
    return (
      <>
        <div className="game">
          <div className="game-board">
            <img src={Image} style={{ width: "40%" }} alt="tic" />
          </div>
        </div>
        <div className="game">
          <div className="game-board">
            <div className="container-custom">
              <h2>Start Game</h2>
            </div>
            <div>
              <button
                className="btn-custom"
                style={{ marginRight: "30px" }}
                onClick={this.onCreateHandler}
              >
                Create
              </button>
              <button className="btn-custom" onClick={this.onJoinHandler}>
                Join
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Game;
