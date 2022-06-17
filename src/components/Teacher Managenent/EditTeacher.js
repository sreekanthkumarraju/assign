import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import './EditTeacher.css'

export default function EditTeacher(){

     const {id} =useParams()
     const [teachers,setTeacher]=useState('')
     const [count,setCount]=useState(0)
     const [errors ,setErrors]=useState('')

     const navigate=useNavigate()

     const getStudentDetails=()=>{
         axios.get(`https://629ef6b78b939d3dc28b227c.mockapi.io/teachers/${id}`)
         .then((res)=>{
             setTeacher(()=>setTeacher(res.data))
         })
         .catch((err)=>{
             console.log(err)
         })
     }

     const handleChange=(e)=>{

          let name=e.target.name
          let value=e.target.value

          setTeacher((prevState)=>({
              ...prevState,
             [name]:value

          }))
    }

    const handleSubmit=(event)=>
    {
        event.preventDefault()
        console.log(teachers)
        setCount(count+1)
        setErrors(validate(teachers))
        console.log(count)
       
    }

     const updateStudentDetails=()=>{

        if(Object.keys(errors).length===0)
        {
             axios.put(`https://629ef6b78b939d3dc28b227c.mockapi.io/teachers/${id}`,teachers)
             
             .then((res)=>{
                 console.log(res)
                 setTimeout(()=>{
                   navigate('/teacher')
                 },[2000])

             })
             .catch((err)=>{
                 console.log(err)
             })
     
        }
            }  

            const validate=values =>{
                const errors={};
                 
                 if(!values.firstName)
                   {
                       errors.firstName="First Name is required"
                   }
                else if(values.firstName.length>20)
                   {
                      errors.firstName='Must be 20 characters or less'
                   }
            
                   if(!values.lastName)
                    {
                        errors.lastName='Last Name is Required'
                    }
                    else if(values.lastName.length>25)
                     {
                         errors.lastName='Must be 25 characters or less'
                     }
            
            
                     if(!values.email){
                         errors.email="Email is Required"
                     }
                     else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
                     {
                         errors.email='Invalid email address'
                     }
            
                     if(!values.date_of_join){
                        errors.date_of_join="Date of Join is required"
                    }
            
                    if(!values.salary){
                        errors.salary="Salary is required"
                    }
            
                     return errors;
            }



     useEffect(()=>{
        getStudentDetails()   
        
     },[])

     useEffect(()=>{
         if(count>0)
         {
        updateStudentDetails()
        console.log(count)
         }       
     },[(count)])

   

    return(

        <div>
            {
            (teachers) ?
            
            <form  className='edit-teacher-form' onSubmit={handleSubmit}>
                <p className="text-danger fs-2">Update Teacher</p>
                <input type='text' id='firstName'  name='firstName'className="edit-teacher-fname" placeholder="First Name" value={teachers.firstName} onChange={handleChange}/>
                <p className="text-danger fs-5">{errors.firstName}</p>
                
                <input type='text' id='lastName' name='lastName' className="edit-teacher-lname" placeholder="Last Name" value={teachers.lastName} onChange={handleChange}/>
                <p className="text-danger fs-5">{errors.lastName}</p>
                
                <input type='email' id='mail' name='email' className="edit-teacher-email" placeholder="Email" value={teachers.email} onChange={handleChange}/>
                <p className="text-danger fs-5">{errors.email}</p>
                
                <input type='date' id='date_of_join' className="edit-teacher-doj" name='date_of_join' value={teachers.date_of_join} onChange={handleChange}></input>
                <p className="text-danger fs-5">{errors.date_of_join}</p>
                
                
                <input type='number' id='salary' className="edit-teacher-salary" name='salary' value={teachers.salary} onChange={handleChange}></input>
                <p className="text-danger fs-5">{errors.salary}</p>
                
                <button type='submit' className="edit-teacher-button bg-danger">Update</button>
            </form>
           
           :' '
           }
        </div>

    )

        }
