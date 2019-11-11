import React from "react";
import Square from "./Square";
import Modal from "./Modal";
import firebase from "./Firebase";
import { PulseLoader } from "react-spinners";
import Image from "../static/tic-tac-toe-clipart-8.jpg";
import { connect } from "react-redux";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      isReset: true,
      currentPlayerX: true,
      key: "",
      isLoading: true,
      feedback: "",
      name: "Uj",
      email: "",
      emailInput: false,
      player2: false
    };
  }

  componentDidMount() {
    this.getValues();
    this.getCurrentPlayer();
  }

  getCurrentPlayer = () => {
    firebase
      .firestore()
      .collection("base")
      .doc(this.props.match.params.id)
      .get()
      .then(doc => {
        if (doc.exists) {
          const data = doc.data();
          this.setState({
            currentPlayerX: this.props.creator ? data.hostX : !data.hostX
          });
        } else {
          console.log("No such Player!");
        }
      });
  };

  getValues = () => {
    firebase
      .firestore()
      .collection("base")
      .doc(this.props.match.params.id)
      .onSnapshot(doc => {
        // console.log("Current data: ", doc.data());
        if (doc.exists) {
          const data = doc.data();
          this.setState({
            squares: data.squares,
            key: doc.id,
            isLoading: false,
            xIsNext: data.xnext,
            player2: doc.player2
          });
        } else {
          console.log("No such document!");
        }
      });
  };

  addSquares = () => {
    console.log(this.state);
    firebase
      .firestore()
      .collection("base")
      .doc(this.props.match.params.id)
      .set({
        squares: this.state.squares,
        xnext: this.state.xIsNext
      })
      .then(() => {
        console.log("Square successfully written!");
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      });
  };

  handleClick(i) {
    console.log("xIsNext", this.state.xIsNext);
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";

    if (this.state.currentPlayerX === this.state.xIsNext) {
      this.setState({ squares: squares, xIsNext: !this.state.xIsNext }, () => {
        this.addSquares();
      });
    }
    // this.addSquares();
  }

  resetDB = () => {
    firebase
      .firestore()
      .collection("base")
      .doc(this.props.match.params.id)
      .set({
        squares: this.state.squares,
        xnext: this.state.xIsNext
      })
      .then(() => {
        console.log("Reset successfull!");
      })
      .catch(error => {
        console.error("Error resetting document: ", error);
      });
  };

  resetHandler = () => {
    this.setState(
      {
        squares: Array(9).fill(null),
        xIsNext: this.state.currentPlayerX
      },
      () => {
        this.resetDB();
      }
    );
  };

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => {
          this.handleClick(i);
        }}
      />
    );
  }

  inviteHandler = () => {
    // console.log("http://192.168.0.77:3000/game", this.props.match.params.id);
    this.setState({
      emailInput: !this.state.emailInput,
      feedback:
        // "https://tic-tac-toe-256210.appspot.com/join/" +
        "http://192.168.0.77:3000/join/" + this.props.match.params.id
    });
  };

  emailHandler = () => {
    const templateId = "template_kCRKFTDy";
    this.sendFeedback(templateId, {
      message_html: this.state.feedback,
      from_name: this.state.name,
      reply_to: this.state.email
    });
  };

  sendFeedback(templateId, variables) {
    window.emailjs
      .send("Uj", templateId, variables)
      .then(res => {
        console.log("Email sent!", res);
        alert("Email successfully sent to " + this.state.email);
      })
      // Handle errors here however you like, or use a React error boundary
      .catch(err =>
        console.error(
          "Oh well, you failed. Here some thoughts on the error that occured:",
          err
        )
      );
  }

  render() {
    let creator = this.props.creator;
    const isLoading = this.state.isLoading;
    let winner = false;
    let tie = true;
    let status;
    let current = "None";
    if (!isLoading) {
      winner = calculateWinner(this.state.squares);
      this.state.squares.forEach(item => {
        if (item === null) {
          tie = false;
        }
      });
      if (winner) {
        status = "Winner: ~ " + winner + " ~";
        current = "GAME OVER";
      } else if (tie) {
        status = "GAME OVER! Match Tie";
      } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        current = "Current Player: " + (this.state.currentPlayerX ? "X" : "O");
      }
    }
    return (
      <>
        <div className="game">
          <div className="game-board">
            <img src={Image} style={{ width: "40%" }} alt="tic" />
          </div>
        </div>
        {this.state.player2 ? (
          <h1>Sorry..Cannot Join More than One Player!</h1>
        ) : (
          <div className="game">
            <div className="game-board">
              {isLoading ? (
                <div className="sweet-loading">
                  <PulseLoader
                    css={`
                      display: block;
                      margin: 0 auto;
                      border-color: red;
                    `}
                    sizeUnit={"px"}
                    size={40}
                    color={"rgb(50, 205, 197)"}
                    loading={true}
                  />
                </div>
              ) : (
                <div>
                  {winner ? (
                    <Modal
                      body={status}
                      onClose={() => {
                        this.setState({ squares: Array(9).fill(null) });
                      }}
                    />
                  ) : null}
                  <div className="container-custom">
                    <div className="status">{current}</div>
                    <div className="status">{status} </div>
                  </div>
                  <div className="board-container">
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
                  <div style={{ margin: "auto" }}>
                    {creator ? (
                      <button
                        className="btn-custom"
                        style={{ marginRight: "20px" }}
                        onClick={this.inviteHandler}
                      >
                        Invite
                      </button>
                    ) : null}
                    <button className="btn-custom" onClick={this.resetHandler}>
                      Reset
                    </button>
                    <br></br>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {this.state.emailInput ? (
          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <input
              type="email"
              className="input-custom"
              placeholder="Enter email id:"
              value={this.state.email}
              onChange={e => {
                this.setState({
                  email: e.target.value
                });
              }}
            />
            <button
              className="btn-custom"
              style={{ marginLeft: "10px", width: "3%" }}
              onClick={this.emailHandler}
            >
              Go
            </button>
          </div>
        ) : null}
      </>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const mapStatetoProps = state => {
  return {
    creator: state.creator
  };
};

export default connect(mapStatetoProps)(Board);
