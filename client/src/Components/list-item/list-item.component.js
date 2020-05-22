import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import './list-item.styles.css';
import Auth from '../../services/auth.service';


const ListItem = ({ user, friend_user_id }) => {
    const [friends, setFriends] = useState([])

    const getFriends = async () => {
        try {
            const response = await fetch(`http://localhost:8000/friends/${Auth.getCurrentUser().user.id}`, {
                method: "POST",
            })
            const jsonData = await response.json();
            setFriends(jsonData.map((friend) => {
                return friend.friend_user_id
            }))
        } catch (error) {
            console.error(error.message)
        }
    };

    useEffect(() => {
        getFriends();
    }, []);

    const AddFriend = async () => {
        try {
            const response = await fetch(`http://localhost:8000/addfriend/${Auth.getCurrentUser().user.id}/${friend_user_id}`, {
                method: "POST",
            })
            const json = await response.json();
            getFriends()
        } catch (error) {
            console.error(error.message)
        }
    }

    const RemoveFriend = async () => {
        try {
            const response = await fetch(`http://localhost:8000/addfriend/${Auth.getCurrentUser().user.id}/${friend_user_id}`, {
                method: "DELETE",
            })
            const json = await response.json();
            getFriends()
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div className="flex-container">
            <div className="card-body-left-container">
                <div className="portrait-container">
                    <FaStar color="gold" size="16" />
                    <img src="https://picsum.photos/60/60"></img>
                </div>
                <div className="name-date-container">
                    <Name>{user.name}</Name>
                </div>
            </div>
            <div className="card-body-right-container">
                <div className="button-container">

                    {Auth.getCurrentUser().user.id == user.user_id ? 
                    (
                        <Text>You</Text>
                    ) : (
                        friends.includes(user.user_id) ? (
                            <AddButton
                                className="btn btn-danger"
                                onClick={RemoveFriend}>
                                Remove Friend
                            </AddButton>
                        ) : (
                            <AddButton
                                className="btn btn-success"
                                onClick={AddFriend}>
                                Add Friend
                            </AddButton>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}


const Name = styled.p`
color: #3f97af;
font-size: 16px;
margin-left: 10px;
font-weight: bold;
`

const AddButton = styled.button`
font-weight: bold;
`

const Text = styled.h1`
color: #2ecc71;
`

export default ListItem