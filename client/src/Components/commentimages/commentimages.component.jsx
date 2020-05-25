import React from "react";
import "./commentimages.styles.css";
import Auth from "../../services/auth.service";
import ImageService from "../../services/image.service";
import UserService from "../../services/user.service";
import { FaUserPlus, FaTimes } from "react-icons/fa";

export default class CommentImages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      users: [],
      image: {},
      comment: "",
      isOwner: false,
      modal: false,
      friends: [],
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.saveShared = this.saveShared.bind(this);
  }

  componentDidMount() {
    const authUser = Auth.getCurrentUser().user;
    const imageId = this.props.match.params.id;

    ImageService.getImage(imageId).then((image) => {
      this.setState({ image: image });
      this.setState({ isOwner: image.user_id === authUser.id });

      ImageService.getImageSharedUsers(imageId).then((users) => {
        let shared = false;
        users.forEach((user) => {
          if (user.user_id === authUser.id) {
            shared = true;
          }
        });
        if (this.state.isOwner) {
          shared = true;
        }
        if (shared) {
          this.setState({ users: users });
        } else {
          this.props.history.push("/");
        }
      });
    });

    ImageService.getImageComments(imageId).then((comments) => {
      this.setState({ comments: comments });
    });

    UserService.getUserFriends().then((friends) => {
      this.setState({ friends });
    });
  }

  handleTextChange(e) {
    this.setState({ comment: e.target.value });
  }

  toggleModal() {
    this.setState({ modal: !this.state.modal });
  }

  handleSubmit(e) {
    e.preventDefault();
    ImageService.addComment(this.state.image.image_id, this.state.comment).then(
      () => {
        ImageService.getImageComments(this.state.image.image_id).then(
          (comments) => {
            document.getElementById("commentForm").reset();
            this.setState({ comments: comments });
          }
        );
      }
    );
  }

  saveShared(event) {
    event.preventDefault();
    let sharedIds = [];
    for (let i = 0; i < event.target.elements.length; i++) {
      const element = event.target.elements[i];
      if (element.checked) {
        sharedIds.push(element.value);
      }
    }
    ImageService.saveSharedUsers(this.props.match.params.id, sharedIds).then(
      () => {
        this.toggleModal();

        ImageService.getImageSharedUsers(this.props.match.params.id).then(
          (users) => {
            let shared = false;
            users.forEach((user) => {
              if (user.user_id === user.id || this.state.isOwner) {
                shared = true;
              }
            });
            if (shared) {
              this.setState({ users: users });
            } else {
              this.props.history.push("/");
            }
          }
        );
      }
    );
  }

  render() {
    return (
      <div className="container">
        {this.state.modal ? (
          <div className="custom-modal">
            <div className="custom-modal__content">
              <button
                className="custom-modal__close"
                onClick={this.toggleModal}
              >
                <FaTimes />
              </button>
              <form onSubmit={this.saveShared}>
                {this.state.friends.map((friend, i) => (
                  <div className="share-friend" key={i}>
                    <input
                      type="checkbox"
                      value={friend.friend_user_id}
                      defaultChecked={this.state.users.find(
                        (user) => user.user_id === friend.friend_user_id
                      )}
                    />
                    {friend.name}
                  </div>
                ))}
                <input
                  type="submit"
                  class="share-friend-button"
                  value="Save Shared"
                />
              </form>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="container-image">
          <img
            alt="The Uploaded"
            src={"http://localhost:8000/" + this.state.image.path}
          />
        </div>

        <div className="container-details">
          <div className="container-info">
            <div>
              Uploaded by: <div className="user">{this.state.image.name}</div>
            </div>
            <div>
              <span className="bold highlight">
                Image shared with following friends:
              </span>
            </div>
            <div>
              {this.state.users.map((user, i) => {
                return (
                  <div key={i} className="user">
                    {user.name}
                  </div>
                );
              })}
              {this.state.isOwner ? (
                <button
                  className="user user--button"
                  onClick={this.toggleModal}
                >
                  <FaUserPlus />
                </button>
              ) : (
                ""
              )}
            </div>
          </div>

          {/* Lists out all the comments along with the user that wrote it */}
          {this.state.comments.map((comment, i) => {
            return (
              <div className="comment" key={i}>
                <p className="comment-author">
                  <span className="user">{comment.name}</span>
                </p>
                <div className="comment-text">{comment.text}</div>
              </div>
            );
          })}

          <form
            id="commentForm"
            onSubmit={this.handleSubmit}
            className="comment"
          >
            <h2 className="title">Write comment</h2>
            <textarea
              name="comment_text"
              rows="2"
              className="comment-input"
              form="commentForm"
              placeholder="Enter your comment here..."
              onChange={this.handleTextChange}
            ></textarea>
            <button className="comment-submit" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
