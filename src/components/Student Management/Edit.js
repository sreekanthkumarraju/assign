import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import './EditStudent.css'


export default function Edit({teachers}){

     const {id} =useParams()
     const [students,setStudent]=useState('')
     const [errors ,setErrors]=useState('')
     const [count,setCount]=useState(0)
     const navigate=useNavigate()

     const getStudentDetails=()=>{
         axios.get(`https://629ef6b78b939d3dc28b227c.mockapi.io/students/${id}`)
         .then((res)=>{
             setStudent(()=>setStudent(res.data))
         })
         .catch((err)=>{
             console.log(err)
         })
     }

     const handleChange=(e)=>{

          let name=e.target.name
          let value=e.target.value

          setStudent((prevState)=>({
              ...prevState,
             [name]:value

          }))
    }

    const handleSubmit=(event)=>
    {
        event.preventDefault()
        console.log(students)
        setCount(count+1)
        setErrors(validate(students))
       
        console.log(count)
       
    }

     const updateStudentDetails=()=>{
        if(Object.keys(errors).length===0)
        {
             axios.put(`https://629ef6b78b939d3dc28b227c.mockapi.io/students/${id}`,students)
             
             .then((res)=>{
                 console.log(res)
                 setTimeout(()=>{
                   navigate('/student')
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
            
                     if(!values.course){
                        errors.course="Must select the course"
                    }

                    if(!values.mentor){
                        errors.mentor="Must select the Mentor"
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
            (students) ?
            
            <form id='edit-student-form' onSubmit={handleSubmit} >
                <p className="text-danger fs-2"> Update Student</p>
                
                <input type='text' id='firstName'  name='firstName' className="update-student-firstname" placeholder="First Name" value={students.firstName} onChange={handleChange}/>
                <p className="text-danger fs-5">{errors.firstName}</p>
                
                <input type='text' id='lastName'  name='lastName' className="update-student-lastname" placeholder="Last Name" value={students.lastName} onChange={handleChange}/>
                <p className="text-danger fs-5">{errors.lastName}</p>
                
                <input type='email' id='Email' name='email' className="update-student-email" placeholder="Email" value={students.email} onChange={handleChange}/>
                <p className="text-danger fs-5">{errors.email}</p>
                
                <label >Course</label>
               
                <select  name='course' id='course' defaultValue={"default"} className="update-course" value={students.course} onChange={handleChange}>
                  
                   <option value={"default"} disabled>Choose an option</option>
                   <option value='information technology'>Information Technology</option>
                   <option value='computer science engineering'>Computer Science Engineering</option>
                   <option value='computer science and system engineering'>Computer Science And System Engineering</option>
                   <option value='civil engineering'>Civil Engineering</option>
                   <option value='mechanical engineering'>Mechanical Engineering</option>
                
                </select>
                <p className="text-danger fs-5">{errors.course}</p>

                <label >Assign a mentor </label>
                
                 <select name='mentor' id='mentor' defaultValue={"default"} className="update-mentor" value={students.mentor} onChange={handleChange}>
                  <option value={"default"} >Choose an option</option>
                   {teachers.map((teacher) => (
                     <option value={teacher.id}>{teacher.id}</option>
                   ))}
                    
                 </select>
                <p className="text-danger fs-5">{errors.mentor}</p>


                <button type='submit' id='update-student'  className="bg-danger">Update</button>
            </form>
           
           :' '
           }
        </div>

    )

        }
