import React from "react";
import "./commentimages.styles.css";

export default class CommentImages extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="container">
        <div class="container-image">
          <img src="https://i.pinimg.com/originals/69/1d/d8/691dd87d4cfd7da641cd841370b85ef7.jpg" alt="CaT ViciOuSly EaTeN bY sHaRk"/>
        </div>

        <div class="container-details">
          <div class="container-info">
            <h1 class="title">Cat eaten by vicious shark!</h1>
            <p>Uploaded by: <span class="user">Jane</span></p>
            <p><span class="bold highlight">Image shared with following friends:</span></p>
            <p><span class="user">Joe</span> <span class="user">You</span> <span class="user">Logan</span></p>
          </div>

          <div className="comment">
            <p class="comment-author"><span className="user">Joe</span><span>16/10-1992</span></p>
            <div class="comment-text">
              Haha, this is so FUNNY! :-)
            </div>
          </div>

          <form action="#" method="post" className="comment">
            <h2 className="title">Write comment</h2>
            <textarea rows="2" class="comment-input">
              Enter your comment here...
            </textarea>
            <input class="comment-submit" type="submit"/>
          </form>
        </div>
      </div>
    );
  }
}