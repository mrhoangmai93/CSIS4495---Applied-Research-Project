import React from "react";
import "./index.scss";
class ImageUpload extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = { file: "", imagePreviewUrl: "" };
  //   }

  render() {
    let { imagePreviewUrl } = this.props;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = <img src={imagePreviewUrl} />;
    } else {
      imagePreview = <div className="previewText">Please select an Image</div>;
    }

    return (
      <div className="previewComponent">
        <input
          className="fileInput"
          type="file"
          onChange={e => this.props.handleImageChange(e)}
        />
        <div className="imgPreview">{imagePreview}</div>
      </div>
    );
  }
}

export default ImageUpload;
