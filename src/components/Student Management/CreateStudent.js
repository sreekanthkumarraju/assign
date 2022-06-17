import React from "react";
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './CreateStudent.css'

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

         if(!values.course){
            errors.course="Must select the course"
        }
        if(!values.mentor){
            errors.mentor="Must select the Mentor"
        }

         return errors;
}

export default function CreateStudent({teachers}){
    const navigate=useNavigate()

    const options=[
        {
            label:"...Choose a course...",
            value:"choose"
        },
       
        {
            label:"Information Technology",
            value:"information technology"
        },
        {
            label:"Computer Science Engineering",
            value:"computer science engineering"
        },
        {
            label:"Computer Science and System Engineering",
            value:"computer science and system engineering"
        },
        {
            label:"Mechanical Engineering",
            value:"mechanical engineering"
        },
        {
            label:"Civil Engineering",
            value:"civil engineering"
        },

    ]

    const formik=useFormik({
         
          initialValues:{
              firstName:'',
              lastName:'',
              email:'',
              course:'',
              mentor:''
          },
          validate,
          onSubmit:values=>{
              console.log(formik.values)
              postStudents(formik.values)

          }
    })

    const postStudents=(values)=>{
        axios.post('https://629ef6b78b939d3dc28b227c.mockapi.io/students',formik.values)
        .then((resp)=>{
            console.log(resp)
            navigate('/student')
           
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return(
        
        <div>
           
            <form id='create-student-form' onSubmit={formik.handleSubmit}>
               
                <label id='create-student-firstName-label'>First Name</label>
                   <input type='text' id='firstName' name="firstName" className="create-student-firstName" value={formik.values.firstName}  onBlur={formik.handleBlur} onChange={formik.handleChange}></input>
                {formik.touched.firstName && formik.errors.firstName ?<div className="text-danger fs-5">{formik.errors.firstName}</div>:null}
                
                <label id='create-student-lastName-label' >Last Name</label>
                    <input type='text' id='lastName' name='lastName' className="create-student-lastName" value={formik.values.lastName}  onBlur={formik.handleBlur} onChange={formik.handleChange}></input>
                 {formik.touched.lastName && formik.errors.lastName ? <div className="text-danger fs-5">{formik.errors.lastName}</div> : null}
                 
                 <label id='create-student-email-label'>Email</label>
                    <input type='text' id='email' name='email'  className="create-student-email" value={formik.values.email}  onBlur={formik.handleBlur} onChange={formik.handleChange}></input>
                 {formik.touched.email && formik.errors.email ? <div className="text-danger fs-5"> {formik.errors.email}</div> : null}

                <label id='Assign-courses-label'>Courses</label>
               
                 <select name='course' id='course' className="Assign-course" value={formik.values.option} onBlur={formik.handleBlur} onChange={formik.handleChange}>
                  
                   {options.map((option) => (
                     <option value={option.value}>{option.label}</option>
                   ))}
                    
                </select>
                {formik.touched.course && formik.errors.course ? <div className="text-danger fs-5">{formik.errors.course}</div> : null}


                <label id='Assign-mentors-label'>Assign a mentor </label>
                
                 <select name='mentor' id='mentor' className="Assign-mentor" defaultValue={"default"} value={formik.values.option} onBlur={formik.handleBlur} onChange={formik.handleChange}>
                  
                   <option value={"default"} disabled>Choose an option</option>
                     {teachers.map((teacher) => (
                     <option value={teacher.id}>{teacher.id}</option>
                    ))}
                    
                </select>

                {formik.touched.mentor && formik.errors.mentor ? <div className="text-danger fs-5">{formik.errors.mentor}</div> : null}

              
                
                 <button type='submit'  className="bg-danger">Create</button>
           
            </form>

        </div>
    )


}