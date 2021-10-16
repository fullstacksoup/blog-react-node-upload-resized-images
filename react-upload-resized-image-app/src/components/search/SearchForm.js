import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function SearchForm(props) {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '65ch' },
      }}            
      autoComplete="off"
    >
      <div>
        <TextField          
          fullWidth
          size="small"
          name="searchStr"
          id="searchStr"
          label="Search"
          onChange={(e) => props.handleChangeSearchTerm(e)}
          onKeyDown={(e) => props.handleKeyPress(e)}
          defaultValue=""
          value={props.searchTerm}
          InputLabelProps={{ shrink: true }} 
          placeholder="What?"
        />  
        
        <Button variant="outlined" 
                onClick={(e) => props.handleSubmit(e)}
                color="primary" 
                style={{marginLeft: '10px', marginTop: '10px'}}
          >
          Search
        </Button>
      </div>            
    </Box>
  );
}
