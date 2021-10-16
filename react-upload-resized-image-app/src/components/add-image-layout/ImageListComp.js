import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 500,
    height: 450,
  },
}));


export default function ImageListComp(props) {
  const classes = useStyles();
  const [imageArr, setImageArr] = useState([]);
  
  useEffect(() => {
    const apiurlGet = `http://localhost:44100/api/images`;        
    axios({
        method: 'get',
        url: apiurlGet,
        headers: {'Content-Type': 'application/json' }
    })
    .then(function (response) {
        // handle success
        // add a non-binary file    
        setImageArr(response.data.data)
        console.log('useEffect ', response.data.data);
    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });
  }, [props.imgData]);

  
  return (
    <div className={classes.root}>
      <ImageList rowHeight={160} className={classes.imageList} cols={4}>
        {imageArr.map((item) => (
            <img
              alt="Image List"
              src={`http://localhost:44100/uploads/${item.Filename}`}
              width="200"
            />        
        ))}
      </ImageList>
    </div>
  );
}