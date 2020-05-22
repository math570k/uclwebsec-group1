import React, { useState, useEffect } from "react";
import ListItem from "../list-item/list-item.component";
import styled from "styled-components";
import "./user-list.styles.css";
import { FaStar } from "react-icons/fa";


const UserList = () => {

  const [users, setUsers] = useState([])

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:8000/users");
      const jsonData = await response.json();
      setUsers(jsonData);
    } catch (error) {
      console.error(error.message)
    }
  };

  useEffect(() => {
    getUsers();
}, []);


  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-title-container">
          <H1>Users</H1>
        </div>
      </div>
      <div className="card-body scroll">
        {users.map((user) => {
          return <ListItem user={user} friend_user_id={user.user_id} />;
        })}
      </div>
    </div>
  );
};

const Button = styled.button`
  padding: 0;
  border: none;
  background: none;
  color: grey;
  font-size: 40px;

  &:hover {
    color: black;
  }
  &:focus {
    outline: 0;
  }
`;

const H1 = styled.h1`
  color: #2ecc71;
  padding-left: 10px;
  font-size: 20px;
  display: inline-block;
  font-weight: bold;
`;

export default UserList;
