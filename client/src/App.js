import React from "react";
import "./App.css";
import LoginPage from "./Components/loginpage/loginpage.component.jsx";
import RegisterPage from "./Components/registerpage/registerpage.component.jsx";
import HomePage from "./Components/homepage/homepage.component.jsx";
import ShareImages from "./Components/shareimages/shareimages.component.jsx";
import FileUpload from "./Components/fileupload/fileupload.component.jsx";
import UserList from "./Components/user-list/user-list.component.js";
import CommentImages from "./Components/commentimages/commentimages.component";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/shareimages" component={ShareImages} />
    <Route exact path="/fileupload" component={FileUpload} />
    <Route exact path="/userlist" component={UserList} />
    <Route exact path="/comment" component={CommentImages} />
    </Switch>
  );
}

export default App;
