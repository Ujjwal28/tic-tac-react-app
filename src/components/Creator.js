import React from "react";
import firebase from "./Firebase";
import Image from "../static/tic-tac-toe-clipart-8.jpg";
import { connect } from "react-redux";
import { creator } from "../redux/actions/index";

class Creator extends React.Component {
  setHost = value => {
    firebase
      .firestore()
      .collection("base")
      .add({
        hostX: value,
        squares: Array(9).fill(null),
        xnext: value,
        player2: false
      })
      .then(docRef => {
        console.log("Hosts Set", docRef.id);
        this.props.dispatch(creator(true));
        this.props.history.push("/game/" + docRef.id);
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      });
  };
  render() {
    return (
      <>
        <div className="game">
          <div className="game-board">
            <img src={Image} style={{ width: "40%" }} alt="tic" />
            <h2>Choose Player</h2>
          </div>
        </div>
        <div className="game">
          <div className="game-board">
            <button
              className="btn-custom"
              style={{ marginRight: "20px" }}
              onClick={() => {
                this.setHost(true);
              }}
            >
              X
            </button>
            <button
              className="btn-custom"
              onClick={() => {
                this.setHost(false);
              }}
            >
              O
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default connect()(Creator);
