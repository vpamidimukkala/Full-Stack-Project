import {React, useState , useEffect} from 'react'
import AxiosInstance from './Axios'
import {Box, Typography} from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextForm from './forms/TextForm';
import SelectForm from './forms/SelectForm';
import MultiSelectForm from './forms/MultiSelectForm';
import DescriptionForm from './forms/DescriptionForm';
import Button from '@mui/material/Button';
import {useFormik} from 'formik'
import * as yup from 'yup'
import MyMessage from './forms/Message';
import {useNavigate, useParams} from 'react-router'


const Edit = () =>{

    const MyParameter = useParams()
    const MyId = MyParameter.id


    const [country , setCountry] = useState([])
    const [league, setLeague] = useState([])
    const [clubtype, setClubType] = useState([])
    const [characteristic, setCharacteristic] = useState([])
    const [message, setMessage] = useState([])
    const [myData, setMyData] = useState({
            name : "",
            owner_name : "",
            description : "",
            country : "",
            league : "",
            clubtype : "",
            founded_year : "",
            attendance : 0,
            city : "",
            home_stadium : "",
            characteristic :[]
        })
    console.log("Mydata", myData)
    const navigate = useNavigate()
    

    const GetData= ()=> {
        AxiosInstance.get(`country/`).then((res)=>{
            setCountry(res.data)
        })

        AxiosInstance.get(`league/`).then((res)=>{
            setLeague(res.data)
        })

        AxiosInstance.get(`clubtype/`).then((res)=>{
            setClubType(res.data)
        })

        AxiosInstance.get(`characteristic/`).then((res)=>{
            setCharacteristic(res.data)
        })

        AxiosInstance.get(`footballclub/${MyId}/`).then((res)=>{
            setMyData(res.data)
        })
    }

    useEffect(()=>{
        GetData()
    },[])

    const validationSchema = yup.object({
        name : yup
                    .string("The name must be text") 
                    .required("Name is required"),
        owner_name : yup
                    .string("Owner Name must be text") 
                    .required("Owner Name is required"),
        description : yup
                    .string("The description must be text") 
                    .required("Description is required"),
        attendance : yup
                    .number("Attendance must be a number")
                    .required("Attendance is required"),
        founded_year : yup
                    .number("Year must be a number")
                    .required("Year is required"),
        characteristic : yup.array()
                    .min(1,"Select at least one option")


    })

    const formik = useFormik({
        initialValues : {
            name : myData.name,
            owner_name : myData.owner_name,
            description : myData.description,
            country : myData.country,
            league : myData.league,
            clubtype : myData.clubtype,
            founded_year : myData.founded_year,
            attendance : myData.attendance,
            city : myData.city,
            home_stadium : myData.home_stadium,
            characteristic :myData.characteristic     
        
        }, 
        enableReinitialize : true,
        validationSchema : validationSchema,

        onSubmit: (values) =>{
            AxiosInstance.put(`footballclub/${MyId}/`, values)
            .then(() => {
               setMessage(
                    <MyMessage
                        messageText={'Data Updated Successfully...'}
                        messageColor ={'green'}
                    />
               )
               setTimeout(()=>{
                    navigate('/')
               }, 1500)
            })
        }
    })

    console.log("Form values", formik.values)

    return(
        <div>
            <form onSubmit={formik.handleSubmit}>
            <Box className={"TopBar"}>
                <AddBoxIcon/>
                <Typography sx={{marginLeft:'15px', fontWeight:'bold'}} variant='subtitle2'>Edit a FootballClub!</Typography>
            </Box>

            {message}

            <Box className={"FormBox"}> 
                
                <Box className={"FormArea"}>
                    <TextForm 
                        label = {'Club Name'}
                        name = 'name' 
                        value = {formik.values.name}
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />

                    <Box sx= {{marginTop : '30px'}}>
                        <TextForm 
                            label = {'Owner Name'}
                            name = 'owner_name'
                            value = {formik.values.owner_name}
                            onChange = {formik.handleChange}
                            onBlur = {formik.handleBlur}
                            error={formik.touched.owner_name && Boolean(formik.errors.owner_name)}
                            helperText={formik.touched.owner_name && formik.errors.owner_name}
                        />
                    </Box>

                    <Box sx= {{marginTop : '30px'}}>
                        <TextForm 
                            label = {'City'}
                            name = 'city'
                            value = {formik.values.city}
                            onChange={formik.handleChange}
                            onBlur = {formik.handleBlur}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText = {formik.touched.city && (formik.errors.city)}
                        />
                    </Box>

                    <Box sx= {{marginTop : '30px'}}>
                        <SelectForm
                            label = {'League'}
                            options = {league}
                            name = 'league'
                            value = {formik.values.league}
                            onChange = {formik.handleChange}
                            onBlur = {formik.handleBlur}
                            error = {formik.touched.league && Boolean(formik.errors.league)}
                            helperText={formik.touched.league && formik.errors.league}
                        />
                    </Box>

                    <Box sx= {{marginTop : '30px'}}>
                        <SelectForm
                            label = {'Club Type'}
                            options = {clubtype}
                            name = 'clubtype'
                            value = {formik.values.clubtype}
                            onChange = {formik.handleChange}
                            onBlur = {formik.handleBlur}
                            error = {formik.touched.clubtype && Boolean(formik.errors.clubtype)}
                            helperText={formik.touched.clubtype && formik.errors.clubtype}
                        />
                        </Box>

                    <Box sx= {{marginTop : '30px'}}>
                        <Button type='submit' variant="contained" fullWidth>Submit Data</Button>
                    </Box>
                    
                </Box>

                <Box className={"FormArea"}>
                    <SelectForm
                        label = {'Country'}
                        options = {country}
                        name = 'country'
                        value = {formik.values.country}
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                        error={formik.touched.country && Boolean(formik.errors.country)}
                        helperText={formik.touched.country && formik.errors.country}
                    />
                    
                    <Box sx= {{marginTop : '30px'}}>
                        <TextForm 
                            label = {'Home Stadium'}
                            name = 'home_stadium'
                            value = {formik.values.home_stadium}
                            onChange={formik.handleChange}
                            onBlur = {formik.handleBlur}
                            error={formik.touched.home_stadium && Boolean(formik.errors.home_stadium)}
                            helperText = {formik.touched.home_stadium && (formik.errors.home_stadium)}
                        />
                    </Box>

                    <Box sx= {{marginTop : '30px'}}>
                        <TextForm 
                            label = {'Attendance'}
                            name = 'attendance'
                            value = {formik.values.attendance}
                            onChange = {formik.handleChange}
                            onBlur = {formik.handleBlur}
                            error={formik.touched.attendance && Boolean(formik.errors.attendance)}
                            helperText={formik.touched.attendance && formik.errors.attendance}
                        />
                    </Box>

                    <Box sx= {{marginTop : '30px'}}>
                        <TextForm 
                            label = {'Founded Year'}
                            name = 'founded_year'
                            value = {formik.values.founded_year}
                            onChange = {formik.handleChange}
                            onBlur = {formik.handleBlur}
                            error={formik.touched.founded_year && Boolean(formik.errors.founded_year)}
                            helperText={formik.touched.founded_year && formik.errors.founded_year}
                        />
                    </Box>
                    
                    <Box sx= {{marginTop : '30px'}}>
                        <MultiSelectForm 
                            label = {'Characteristics'}
                            options ={characteristic}
                            name = 'characteristic'
                            value = {formik.values.characteristic}
                            onChange = {formik.handleChange}
                            onBlur = {formik.handleBlur}
                            error={formik.touched.characteristic && Boolean(formik.errors.characteristic)}
                            helperText={formik.touched.characteristic && formik.errors.characteristic}
                        />
                    </Box>
                </Box>

                <Box className={"FormArea"}>
                    <DescriptionForm 
                        label = {'Description'}
                        rows ={9}
                        name = 'description'
                        value = {formik.values.description}
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                </Box>

            </Box>
            </form>
        </div>
    )
}

export default Edit