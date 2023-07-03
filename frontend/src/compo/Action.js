import * as React from 'react';
import { Button} from 'reactstrap';
import {useFormik} from 'formik'
import { useState,useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { GiTeacher } from 'react-icons/gi';
import {FaStudiovinari} from 'react-icons/fa'
import MenuItem from '@mui/material/MenuItem';
import { toast } from 'react-toastify';
import { useContext } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Context from './Context';
import axios from 'axios';
import { API } from './global';


export default function Action() {
  const formik=useFormik({
  initialValues:{
      avatar:'',
      name:'',
      field:'',
      division:''
  },
  onSubmit:(values)=>{
    console.log(values)
  },
  validate:(values)=>{
    let {avatar,name,field,division}=values
    let errors={}
    if(!avatar)
  {
    errors.avatar='image is required'

  }
  if(!name)
  {
    errors.name='nmae is required'

  }
  if(!field)
  {
    errors.field='feild is required'

  }
  return errors
  }

    })
    const context=useContext(Context)
    console.log("context.people")

    // console.log(context.people)
    const [form,setform]=useState({})
    const nav=useNavigate()
    // const url="https://63ac054434c46cd7ae74a1f8.mockapi.io/mouni"
const location=useLocation();
    const handleChange=(e)=>{
        setform({...form,[e.target.name]:e.target.value})
        console.log(e.target.value)
        console.log("hello")
    }
  
    const {id}=useParams()
    formik.handleSubmit = (e) => {
      e.preventDefault();
      console.log(formik.values);
    
        if(id){
          // console.log();
            console.log("update")
            // console.log(formik.values)
            console.log(form)
        axios.put(`${API}/data/${id}`,form).then(()=>{
            context.getpeople();
            
            nav(-1)
            
              toast.success("product updated sucessfully ")})
              
    }
    else{

    axios.post(`${API}/data/`,form)
           .then(()=>{
            context.getpeople();
            nav(-1)
              toast.success("product added sucessfully ")})
  
        }

    }
    useEffect(()=>{
        if(id)
        {
          console.log("the data")
          axios.get(`${API}/data/${id}`).then((res)=>
          // console.log(res)
          setform(res.data) 
          )
        
        }
            },[id])
            // console.log(form)


            const divi=[{
                value:'Teacher',
                label:<GiTeacher/>},
                {
                    value:'Student',
                    label:<FaStudiovinari label="hello"/>,
                },{
                    value:'NaN',
                label:'NaN'}

            ]
            
  return (
    <Box
      
      sx={{
        '& > :not(style)': { width: 500,
            maxWidth: '100%' }, height: 20,
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? 'rgba(255, 0, 0, 0.1)'
                : 'rgb(255 132 132 / 25%)',
                display: 'flex',
                flexDirection: 'column',
                '& .MuiTextField-root': { width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
    {/* disabled={state.isView==='true'? true:false}       */}
<form>

    <TextField disabled={location.state.isView}  type="text" color="secondary"  id="outlined-basic" margin="dense"  variant="outlined" name='name' value={form.name}   onChange={handleChange}  className='mb-3' placeholder="'Enter name" />
    <br/>

    {formik.errors.name && !formik.isSubmitting ? formik.errors.name : ""}

    <TextField disabled={location.state.isView}   id="outlined-basic" color="secondary"  margin="dense"  variant="outlined" type="text" name='avatar' value={form.avatar}  onChange={handleChange}  className='mb-3'  placeholder="Enter image"/>
    <br/>

    {formik.errors.avatar && !formik.isSubmitting ? formik.errors.avatar : ""}


    <TextField disabled={location.state.isView}  id="outlined-basic" color="secondary"  margin="dense"  variant="outlined" type="text" name='field' value={form.field}  onChange={handleChange} className='mb-3'  placeholder="'Enter pricing"/>
    <br/>
    {formik.errors.field && !formik.isSubmitting ? formik.errors.field : ""}


    <TextField
    disabled={location.state.isView} 
          id="outlined-select-currency"
          select
         
          defaultValue='NaN'
          margin="dense"
          helperText="Please select teacher or student"
          name='division'
          type="text" value={form.division}  onChange={handleChange} className='mb-3'
        >

          {divi.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </TextField>
          
<div> {location.state.isView?<p> </p>:  <Button color='success' onClick={formik.handleSubmit}>SUBMIT</Button>  }
<Button color='danger' onClick={()=>nav(-1)}>CANCLE</Button>
</div>
</form>
        </Box>
  );
}