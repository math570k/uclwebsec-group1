import React from "react";
import "./feed.styles.css";
import { Link } from "react-router-dom";
import { FaFileImage } from "react-icons/fa";
import ImageService from "../../services/image.service";

export default class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feedItems: [],
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ImageService.getFeed().then((items) => {
      this.setState({ feedItems: items });
    });
  }

  onChange(e) {
    const formData = new FormData();
    formData.append("myImage", e.target.files[0]);
    ImageService.uploadImage(formData).then((response) => {
      console.log(response);
    });
  }

  render() {
    return (
      <div className="feed">
        <div className="feed__item feed__item--add">
          <label htmlFor="file-upload" className="feed__upload">
            <FaFileImage /> Upload Image
          </label>
          <input
            className="feed__upload--hidden"
            id="file-upload"
            type="file"
            onChange={this.onChange}
          />
        </div>
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
  }
}
