import React from "react";
import "./feed.styles.css";
import { Link } from "react-router-dom";
import ImageService from "../../services/image.service";

export default class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feedItems: [],
    };
  }

  componentDidMount() {
    ImageService.getFeed().then((items) => {
      this.setState({ feedItems: items });
    });
  }

  render() {
    if (this.state.feedItems.length) {
      return (
        <div className="feed">
          {this.state.feedItems.map((item, i) => {
            return (
              <Link
                key={i}
                to={"/image/" + item.image_id}
                style={{
                  backgroundImage:
                    "url('http://localhost:8000" + item.path + "')",
                }}
                className="feed__item"
              ></Link>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="feed feed--empty">No images shared with you :(</div>
      );
    }
  }
}
