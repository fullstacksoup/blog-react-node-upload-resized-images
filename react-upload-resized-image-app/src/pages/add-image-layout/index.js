import React, { useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";
import { DropzoneArea } from 'material-ui-dropzone';
import styles from 'styles/UploadFileForm.module.css';
import AttachFile from '@material-ui/icons/PhotoCamera';
import { Button } from "@material-ui/core";
import axios from "axios";
// import ImageListComp from "components/add-image-layout/ImageListComp";
import ImageListWithZoom from "components/add-image-layout/ImageListWithZoom";
import AlertDialog from "components/add-image-layout/AlertDialog";
export default function AddImageLayout() {
    const [newImage, ] =  useState('');
    const [files, setFiles] =  useState('');    
    const [imgData, setImgData] =  useState([]);
    const [showMessage, setShowMessage] =  useState(false);
    
    const resizeFile = (file) =>
        new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            600,
            800,
            "JPEG",
            80,
            0,
            
            (image) => {
            Object.assign(image, {
                preview: URL.createObjectURL(image),
                path: image.name,
                
            });
            resolve(image);
            },
            "file"
        );
    });

    const closeDialogBox = () => {        
        setShowMessage(false);
    }
   
    const handleFormSubmit = () => {        
        const formData = new FormData()
        // add a non-binary file    
        formData.append('UserId', 2);

        for (let i = 0; i < files.length; i++) {
            formData.append(`files[${i}]`, files[i])
        }
        
        const apiurl = `http://localhost:44100/api/upload-multiple-files`;
        axios({
            method: 'post',
            url: apiurl,
            data: formData,
            headers: {'Content-Type': 'multipart/form-data' }
            })
            .then(function (response) {
                //handle success
                console.log(response);
                
                const apiurlGet = `http://localhost:44100/api/images`;        
                axios({
                    method: 'get',
                    url: apiurlGet,
                    headers: {'Content-Type': 'application/json' }
                    })
                    .then(function (response) {
                        //handle success
                        // add a non-binary file    
                        setImgData(response.data)
                        console.log(response);
                    })
                    .catch(function (response) {
                        //handle error
                        console.log(response);
                    });
                    
                    
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
            setShowMessage(true);
        // alert(JSON.stringify(data, null, 2));
    }

    const handleDropzoneChange = async (images) => {
        console.log('handleDropzoneChange  ', images);     
        await Promise.all(
            images.map((image) => {
              return resizeFile(image);
            })
          ).then((uploadBranchImages) => {            
            console.log(uploadBranchImages);
            setFiles(uploadBranchImages);       
          });

        setTimeout(() => {
            console.log('handleDropzoneChange  files ', files);     
        }, 1500);

    }

    useEffect(() => {
        const apiurlGet = `http://localhost:44100/api/images`;        
        axios({
            method: 'get',
            url: apiurlGet,
            headers: {'Content-Type': 'application/json' }
            })
            .then(function (response) {
                //handle success
                // add a non-binary file    
                setImgData(response.data)
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });

    }, [])


    return (
        <div className="App">
        
        <img src={newImage} alt="" />


        <DropzoneArea   filesLimit={3}                         
                        maxFileSize={10000000}
                        previewText="Selected files"
                        onChange={handleDropzoneChange }                                
                        initialFiles={files}                        
                        Icon={AttachFile}                                
                        acceptedFiles={['image/*']}
                        showAlerts={['error']}                                 
                        dropzoneText="Click here to upload photo"
                        dropzoneClass={styles.dropZoneCls} />

        <Button type="submit" variant="outlined" onClick={handleFormSubmit} >Upload</Button>        
        <ImageListWithZoom imgData={imgData}/>
        <AlertDialog show={showMessage} closeDialogBox={closeDialogBox}/>
        </div>        
    );
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