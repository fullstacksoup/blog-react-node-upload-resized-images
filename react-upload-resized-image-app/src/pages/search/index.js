import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SearchForm from 'components/search/SearchForm';
import styles from 'styles/Search.module.css';
import { LocalStoreList, DeleteLocalStoreListItem, GetLocalStorageData } from 'global/Local-Storage-Helper';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';

export default function Search() {
    
    const [searchHistory, setSearchHistory] = useState(GetLocalStorageData('SearchHist'));
    const [searchTerm, setSearchTerm] = useState('');
    const maxDaysOld = 3;
    
    const handleChangeToList = (event) => {       
        setSearchHistory(GetLocalStorageData('SearchHist'));
    }
        
    const handleChangeSearchTerm = (event) => {    
        setSearchTerm(event.target.value);    
    }
    
    const handleSubmit = (event) => {                
        LocalStoreList('SearchHist', searchTerm, maxDaysOld);
        handleChangeToList();
        setSearchTerm('');
    }

    const handleClickOnLink = (val) => {               
        setSearchTerm(val);
    }
        
    const handleDelete = (val) => {               
        DeleteLocalStoreListItem('SearchHist', val);
        handleChangeToList();
    }

    const handleKeyPress = (event) => {
        if(event.keyCode === 13) {            
            LocalStoreList('SearchHist', searchTerm, maxDaysOld);
            handleChangeToList();
            setSearchTerm('');                
         }
    }
        
    return (
        <div className={styles.searchForm}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={3} xl={2}> </Grid>
                    <Grid item xs={12} lg={9} xl={10}>
                        <Grid container spacing={2}>
                        
                            <Grid item xs={10} lg={10} xl={10}>
                               <SearchForm 
                                           handleChangeSearchTerm={handleChangeSearchTerm} 
                                           handleSubmit={handleSubmit}
                                           handleKeyPress={handleKeyPress}
                                           searchTerm={searchTerm}/>
                            </Grid>
                            <Grid item xs={10} lg={10} xl={10}>
                                <ul>
                                {searchHistory.map((element) =>                                   
                                <li>
                                    <Link href="#" underline="none"  onClick={(e) => handleClickOnLink(element.value)}>{element.value} - {element.date}</Link> 
                                    <IconButton aria-label="delete" size="small" color="secondary" onClick={(e) => handleDelete(element.value)}>
                                        <DeleteIcon fontSize="inherit" />
                                    </IconButton>
                                </li>
                                )}  
                                </ul>                                                                  
                            </Grid>
                        </Grid>    
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}
