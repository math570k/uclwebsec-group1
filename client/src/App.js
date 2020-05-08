import React from "react";
import axios from "axios";

export default class App extends React.Component {
  state = {
    persons: [],
  };

  componentDidMount() {
    axios.get("http://localhost:8000/api/sample").then((res) => {
      this.setState({ persons: res.data });
    });
  }

  render() {
    return (
      <ul>
        {this.state.persons.map((person) => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
    );
  }
}
