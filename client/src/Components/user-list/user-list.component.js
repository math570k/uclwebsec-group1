import React, { useState, useEffect } from "react";
import ListItem from "../list-item/list-item.component";
import styled from "styled-components";
import "./user-list.styles.css";
import { FaStar } from "react-icons/fa";


const UserList = () => {

  const [users, setUsers] = useState([])


  const testusers = [
    { id: 1, name: "John Smith 1" },
    { id: 2, name: "John Smith 2" },
    { id: 3, name: "John Smith 3" },
    { id: 4, name: "John Smith 4" },
    { id: 5, name: "John Smith 5" },
    { id: 6, name: "John Smith 6" },
    { id: 7, name: "John Smith 7" },
    { id: 8, name: "John Smith 8" },
    { id: 9, name: "John Smith 9" },
    { id: 10, name: "John Smith 10" },
    { id: 11, name: "John Smith 11" },
  ];

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
          <FaStar stroke="lightblue" strokeWidth="60" color="white" size="20" />
          <H1>Users</H1>
        </div>
      </div>
      <div className="card-body scroll">
        {users.map((user) => {
          return <ListItem name={user.name} key={user.user_id} />;
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
  color: #aaa7a7;
  padding-left: 10px;
  font-size: 20px;
  display: inline-block;
  font-weight: bold;
`;

export default UserList;
