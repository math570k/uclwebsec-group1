import React from "react";
import "./yourimages.styles.css";
import ImageService from "../../services/image.service";
import { Link } from "react-router-dom";
import Uploader from "../uploader/uploader.component";

function ImageList(props) {
  return props.images.map((image, i) => (
    <Link
      key={i}
      to={"/image/" + image.image_id}
      style={{
        backgroundImage: "url('http://localhost:8000/" + image.path + "')",
      }}
      className="feed__item"
    ></Link>
  ));
}

export default class YourImages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userImages: [],
    };

    ImageService.userImages().then((images) => {
      this.setState({ userImages: images });
    });
  }
  render() {
    return (
      <div className="feed">
        <Uploader />
        {this.state.userImages.length ? (
          <ImageList images={this.state.userImages} />
        ) : (
          <div className="feed feed--empty">No images uploaded :(</div>
        )}
      </div>
    );
  }
}
