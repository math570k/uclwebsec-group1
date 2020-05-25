import React from "react";
import "./App.css";
import LoginPage from "./Components/loginpage/loginpage.component.jsx";
import RegisterPage from "./Components/registerpage/registerpage.component.jsx";
import HomePage from "./Components/homepage/homepage.component.jsx";
import CommentImages from "./Components/commentimages/commentimages.component";
import NavBar from "./Components/navbar/navbar.component";
import YourImage from "./Components/yourimages/yourimages.component";
import Friends from "./Components/friends/friends.component";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/yourimages" component={YourImage} />
        <Route exact path="/friends" component={Friends} />
        <Route exact path="/image/:id" component={CommentImages} />
      </Switch>
    </div>
  );
}

export default App;
