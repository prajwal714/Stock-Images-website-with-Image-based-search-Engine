import React, { Component } from "react";
import Dropzone, { useDropzone } from 'react-dropzone';
// const {
//   acceptedFiles,
//   rejectedFiles,
//   getRootProps,
//   getInputProps
// } = useDropzone({
//   accept: "image/jpg,image/jpeg,image/png"
// });
class Accept extends Component {
  constructor() {
    super();
    this.onDrop = files => {
      this.setState({ files });
    };

    this.state = {
      files: []
    };
  }

  render() {

    const files=this.state.files.map(file=>(
        <li key={file.name}>
            {file.name}-{file.size} bytes
        </li>
    ));
    // const acceptedFilesItems = acceptedFiles.map(file => (
    //   <li key={file.path}>
    //     {file.path} - {file.size} bytes
    //   </li>
    // ));

    // const rejectedFilesItems = rejectedFiles.map(file => (
    //   <li key={file.path}>
    //     {file.path} - {file.size} bytes
    //   </li>
    // ));
    return (
        <Dropzone onDrop={this.onDrop}>
            {({ getRootProps, getInputProps }) => (
                <section className="container">
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    <aside>
                        <h4>Accepted Files</h4>
                        <ul>{files}</ul>
                        {/* <h4>Rejected Files</h4>
                        <ul>{rejectedFilesItems}</ul> */}
                    </aside>
                </section>
            )}
        </Dropzone>
    );
  }
}
export default Accept;
