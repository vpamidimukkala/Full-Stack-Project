import {React, useEffect, useState} from 'react'
import {Box, Typography, Button} from '@mui/material'
import AxiosInstance from './Axios'
import AddBoxIcon from '@mui/icons-material/AddBox'
import {useNavigate, useParams} from 'react-router'
import MyMessage from './forms/Message';

const Delete = () =>{

    const MyParameter = useParams()
    const MyId = MyParameter.id

    const navigate = useNavigate()

    const [message, setMessage] = useState([])

    const [myData, setMyData] = useState({
        name : "",
        description : "",
        country : "",
        league : "",
        attendance : 0,
        city : "",
        characteristic :[]
    })

    console.log("MyData", myData)

    const GetData = () => {
        AxiosInstance.get(`footballclub/${MyId}/`).then((res)=>{
            setMyData(res.data)
        })
    }

    useEffect(()=>{
        GetData()
    },[])

    const DeleteRecord = (event) => {
        event.preventDefault()
        AxiosInstance.delete(`footballclub/${MyId}/`)
        .then(() =>{
            setMessage(
                <MyMessage
                    messageText={'You Successfully deleted the Data...'}
                    messageColor ={'green'}
                />
            )
            setTimeout(()=>{
                navigate('/')
            }, 1500)
        })
    }

    return(
        <div>
            <form onSubmit={DeleteRecord}>
            {message}
            <Box className={'TopBar'}>
                <AddBoxIcon/>
                <Typography  sx={{marginLeft:'15px', fontWeight:'bold'}} variant='subtitle2'> 
                    Are you sure that you want to delete this record ?
                </Typography>
            </Box>

            <Box className={"TextBox"}>
                <Typography>
                    You will be deleting the club <strong>{myData.name}</strong> from <strong>{myData.city}</strong>
                </Typography>
            </Box>

            <Box sx={{marginTop: '30px'}}>
                <Button type='submit' variant='contained' fullWidth>Delete</Button>
            </Box>

            </form>
        </div>
    )
}

export default Delete