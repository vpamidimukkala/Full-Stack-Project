import { Box,Typography } from '@mui/material';

export default function MyMessage({messageText, messageColor}) {
  return (
      <Box
        sx={{
            width: '100%',
            height: '30px',
            color:'white',
            backgroundColor: messageColor,
            display:'flex',
            marginBottom:'20px',
            padding: '10px',
            alignItems : 'center'
        }}
      >
        <Typography>{messageText}</Typography>
      </Box>
  );
}
