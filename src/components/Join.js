import React from "react";
import Image from "../static/tic-tac-toe-clipart-8.jpg";
import home from "../static/home.png";
import firebase from "./Firebase";
import { PulseLoader } from "react-spinners";

class Join extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomKey: "",
      loading: false
    };
  }

  componentDidMount() {
    this.initialJoinHandler();
  }

  initialJoinHandler = () => {
    if (this.props.match.params.id !== "new") {
      this.setState({ loading: true });
      firebase
        .firestore()
        .collection("base")
        .doc(this.props.match.params.id)
        .update({
          player2: true
        })
        .then(() => {
          console.log("Player2 successfully written!");
        })
        .catch(error => {
          console.error("Error writing document: ", error);
        });
      this.props.history.push("/game/" + this.props.match.params.id);
    }
  };

  joinRoomHandler = () => {
    this.props.history.push("/game/" + this.state.roomKey);
  };

  render() {
    console.log(this.state.roomKey);
    return (
      <>
        <div className="game">
          <div className="game-board">
            <img
              src={home}
              alt="home"
              title="home"
              width="3%"
              height="3%"
              style={{ marginTop: "20px", marginLeft: "20px", float: "left" }}
            />
            <img src={Image} style={{ width: "40%" }} alt="tic" />
          </div>
        </div>
        <div className="game">
          <div className="game-board">
            <div className="container-custom">
              <h2>Join Game</h2>
            </div>
            {this.state.loading ? (
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
                <input
                  type="text"
                  className="input-custom"
                  placeholder="Enter Room Key:"
                  style={{ marginRight: "10px" }}
                  value={this.state.roomKey}
                  onChange={e => {
                    this.setState({
                      roomKey: e.target.value
                    });
                  }}
                />
                <button className="btn-custom" onClick={this.joinRoomHandler}>
                  Go
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Join;
