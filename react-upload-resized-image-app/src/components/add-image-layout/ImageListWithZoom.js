import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import axios from "axios";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 600,
    height: 450,
  },
}));


export default function ImageListWithZoom(props) {
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
          <Zoom>
          <picture>
            <source media="(max-width: 800px)" srcSet={`http://localhost:44100/uploads/${item.Filename}`} />
            <img
              alt="that wanaka tree"
              src={`http://localhost:44100/uploads/${item.Filename}`}
              width="190"
            />
          </picture>
        </Zoom>            
        ))}
      </ImageList>
    </div>
  );
}