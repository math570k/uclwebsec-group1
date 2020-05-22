import React from "react";
import "./commentimages.styles.css";
import Auth from '../../services/auth.service';

export default class CommentImages extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            users: []
        }
    }

    componentDidMount() {
        this.getUsers();
        this.getComments();
    }

    //TODO - Image id is currently hardcoded. Fix this once upload image functionality is implemented
    getComments = async () => {
        const imageId = 1
        try {
            const response = await fetch(`http://localhost:8000/comment/${imageId}`);
            const commentObjects = await response.json();
            this.setState({ comments: commentObjects })
        } catch (error) {
            console.error(error.message)
        }
    };

    getUsers = async () => {
        try {
            const response = await fetch("http://localhost:8000/users");
            const userObjects = await response.json();
            this.setState({ users: userObjects })
        } catch (error) {
            console.error(error.message)
        }
    };


    render() {
        const user = Auth.getCurrentUser().user;
        //console.log(user)
        //console.log(this.state.users)
        // console.log(this.state.users.filter(user => {return user.user_id === comment.user_id}))


        return (
            <div className="container">
                <div className="container-image">
                    <img src="https://i.pinimg.com/originals/69/1d/d8/691dd87d4cfd7da641cd841370b85ef7.jpg" alt="CaT ViciOuSly EaTeN bY sHaRk" />
                </div>

                <div className="container-details">
                    <div className="container-info">
                        <h1 className="title">Cat eaten by vicious shark!</h1>
                        <p>Uploaded by: <span class="user">Jane</span></p>
                        <p><span className="bold highlight">Image shared with following friends:</span></p>
                        <p><span className="user">Joe</span> <span class="user">You</span> <span className="user">Logan</span></p>
                    </div>

                    {/* Lists out all the comments along with the user that wrote it */}
                    {this.state.comments.map((comment) => {
                        var user = this.state.users.find(user => user.user_id === comment.user_id)

                        return (
                            <div className="comment">
                                <p className="comment-author"><span className="user">{user.name}</span><span>16/10-1992</span></p>
                                <div className="comment-text">
                                    {comment.text}
                                </div>
                            </div>
                        )
                    })}


                    <form id="commentForm" action={`/comment/${user.id}/${1}`} method="POST" className="comment">
                        <h2 className="title">Write comment</h2>
                        <textarea name="comment_text" rows="2" className="comment-input" form="commentForm">
                            Enter your comment here...
                        </textarea>
                        <button className="comment-submit" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}