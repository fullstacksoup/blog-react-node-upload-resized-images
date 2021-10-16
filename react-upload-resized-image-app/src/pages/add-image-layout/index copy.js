import React, { Component } from "react";
import Resizer from "react-image-file-resizer";
import { DropzoneArea } from 'material-ui-dropzone';

// const {getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject} = useDropzone({
//     accept: "image/*",
//     maxFiles: 1,
//     onDrop: async (acceptedFiles) => {
//         await Promise.all(
//             acceptedFiles.map((image) => {
//                 return resizeFile(image);
//             })
//         ).then((uploadBranchImages) => {
//             console.log('Upload Branch Images', uploadBranchImages);
//             setImages(
//                 uploadBranchImages
//                     .map((image) => {
//                             const imageModified = Object.assign(image, {
//                                 preview: URL.createObjectURL(image)
//                             })

//                             handleFireBaseUpload(imageModified);
//                             return imageModified;
//                         }
//                     )
//             );

//         })
//     }
// });


export default class AddImageLayout extends Component {
  constructor(props) {
    super(props);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.state = {
      newImage: "",
    };
  }

  fileChangedHandler(event) {
    var fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          800,
          600,
          "JPEG",
          100,
          0,
          (uri) => {
            console.log(uri);
            this.setState({ newImage: uri });
          },
          "base64",
          200,
          200
        );
      } catch (err) {
        console.log(err);
      }
    }
  }

  render() {
    return (
      <div className="App">
        <input type="file" onChange={this.fileChangedHandler} />
        <img src={this.state.newImage} alt="" />
      </div>
    );
  }
}


// Resizer.imageFileResizer(
//     file, // Is the file of the image which will resized.
//     maxWidth, // Is the maxWidth of the resized new image.
//     maxHeight, // Is the maxHeight of the resized new image.
//     compressFormat, // Is the compressFormat of the resized new image.
//     quality, // Is the quality of the resized new image.
//     rotation, // Is the degree of clockwise rotation to apply to uploaded image.
//     responseUriFunc, // Is the callBack function of the resized new image URI.
//     outputType, // Is the output type of the resized new image.
//     minWidth, // Is the minWidth of the resized new image.
//     minHeight // Is the minHeight of the resized new image.
//   );