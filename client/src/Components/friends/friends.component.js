import React from "react";
import "./friends.styles.css";
import UserService from "../../services/user.service";
import Auth from "../../services/auth.service";

function UserList(props) {
  const currentUser = Auth.getCurrentUser().user;

  return props.users.map((user, i) => {
    if (user.user_id === currentUser.id) return null;
    let isFriend = false;
    props.friends.forEach((friend) => {
      if (friend.friend_user_id === user.user_id) isFriend = true;
    });
    return (
      <div className="friends__item" key={i}>
        {user.name}
        <UserButton
          friend={isFriend}
          id={user.user_id}
          onHandle={props.handleUpdate}
        />
      </div>
    );
  });
}

function UserButton(props) {
  if (props.friend)
    return (
      <button
        onClick={() =>
          UserService.removeUserFriend(props.id).then(() => {
            props.onHandle();
          })
        }
        className="friend-button friend-button--remove"
      >
        Remove Friend
      </button>
    );
  else
    return (
      <button
        onClick={() =>
          UserService.addUserFriend(props.id).then(() => {
            props.onHandle();
          })
        }
        className="friend-button friend-button--add"
      >
        Add Friend
      </button>
    );
}

export default class Friends extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      friends: [],
    };

    UserService.getUserList().then((users) => {
      this.setState({ users: users });
    });
    UserService.getUserFriends().then((friends) => {
      this.setState({ friends: friends });
    });

    this.handleUpdate = this.handleUpdate.bind(this);
  }
  handleUpdate() {
    UserService.getUserList().then((users) => {
      this.setState({ users: users });
    });
    UserService.getUserFriends().then((friends) => {
      this.setState({ friends: friends });
    });
  }
  render() {
    return (
      <div className="friends">
        <UserList
          users={this.state.users}
          friends={this.state.friends}
          handleUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}
