import React from "react";
import { FaFileImage } from "react-icons/fa";
import ImageService from "../../services/image.service";

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
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
    );
  }
}
