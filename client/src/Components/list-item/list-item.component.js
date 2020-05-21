import React from 'react';
import styled from "styled-components";
import { FaStar, FaFileAlt, FaPaperclip } from "react-icons/fa";
import './list-item.styles.css';

const ListItem = ({ name, key}) => {

    //Implement proper functionality
    const handleClick = () => { 
        
        
        
        alert("My name is: " + name + " and my id is: " + key)
    }

    return (
        <div className="flex-container">
            <div className="card-body-left-container">
                <div className="portrait-container">
                    <FaStar color="gold" size="16" />
                    <img src="https://picsum.photos/60/60"></img>
                </div>
                <div className="name-date-container">
                    <Name>{name}</Name>
                </div>
            </div>
            <div className="card-body-right-container">
                <div className="button-container">
                    <AddButton 
                        className="btn btn-success" 
                        onClick={handleClick}>
                    Add Friend
                    </AddButton>
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

export default ListItem