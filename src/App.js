import React from "react";
import Board from "./components/Board";
import Creator from "./components/Creator";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Join from "./components/Join";
import Game from "./components/Game";

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Game} />
        <Route path="/game/:id" component={Board} />
        <Route path="/join/:id" component={Join} />
        <Route path="/create" component={Creator} />
      </div>
    </Router>
  );
}

export default App;
