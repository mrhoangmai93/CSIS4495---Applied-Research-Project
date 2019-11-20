import React from "react";
import "./index.scss";
import ButtonDefault from "../utilities/buttons/ButtonDefault";
class ImageUpload extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { file: "", imagePreviewUrl: "" };
  // }

  render() {
    let { imagePreviewUrl } = this.props;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = <img src={imagePreviewUrl} />;
    } else {
      imagePreview = <div className="previewText">Please select an Image</div>;
    }

    return (
      <div className="previewComponent mb-5">
        <input
          className="fileInput"
          type="file"
          onChange={e => this.props.handleImageChange(e)}
        />
        <div className="imgPreview mb-2">{imagePreview}</div>
      </div>
    );
  }
}

export default ImageUpload;
