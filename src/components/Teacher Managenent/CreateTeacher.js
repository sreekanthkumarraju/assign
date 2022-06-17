import React from "react";
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './CreateTeacher.css'

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


export default function CreateTeacher(){

    const navigate=useNavigate()
    const formik=useFormik({
         
          initialValues:{
              firstName:'',
              lastName:'',
              email:'',
              date_of_join:'',
              salary:0

          },
          validate,
          onSubmit:values=>{
              console.log(formik.values)
              postTeacher(formik.values)

          }
    })

    const postTeacher=(values)=>{
        axios.post('https://629ef6b78b939d3dc28b227c.mockapi.io/teachers',formik.values)
        .then((resp)=>{
            console.log(resp)
            navigate('/teacher')
           
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return(
        <div>
             <form id='create-teacher-form' onSubmit={formik.handleSubmit}>
               
                <label id='create-student-firstName-label'>First Name</label>
                <input type='text' id='firstName' name="firstName" className="create-teacher-firstName" value={formik.values.firstName}  onBlur={formik.handleBlur} onChange={formik.handleChange}></input>
                {formik.touched.firstName && formik.errors.firstName ?<div className="text-danger fs-5">{formik.errors.firstName}</div>:null}
                
                <label id='create-student-lastName-label'>Last Name</label>
                <input type='text' id='lastName' name='lastName' className="create-teacher-lastName" value={formik.values.lastName}  onBlur={formik.handleBlur} onChange={formik.handleChange}></input>
                 {formik.touched.lastName && formik.errors.lastName ? <div className="text-danger fs-5">{formik.errors.lastName}</div> : null}
                 
                 <label id='create-student-email-label'>Email</label>
                 <input type='text' id='email' name='email' className="create-teacher-email" value={formik.values.email}  onBlur={formik.handleBlur} onChange={formik.handleChange}></input>
                 {formik.touched.email && formik.errors.email ? <div className="text-danger fs-5">{formik.errors.email}</div> : null}

                 <label id='create-teacher-doj-label' >Date of Join</label>
                <input type='date' id='date_of_join' name='date_of_join' className="create-teacher-doj"  value={formik.values.date_of_join}  onBlur={formik.handleBlur} onChange={formik.handleChange}></input>
                {formik.touched.date_of_join && formik.errors.date_of_join ? <div className="text-danger fs-5">{formik.errors.date_of_join}</div> : null}

                <label id='create-teacher-salary-label'>salary</label>
                <input type='number' id='salary' name='salary' className="create-teacher-salary" value={formik.values.salary} onBlur={formik.handleBlur} onChange={formik.handleChange}></input>
                   {formik.touched.salary && formik.errors.salary ? <div className="text-danger fs-5">{formik.errors.salary}</div> : null}
              
                 <button type='submit'  className="bg-danger">Create</button>
            </form>

        </div>
    )
}