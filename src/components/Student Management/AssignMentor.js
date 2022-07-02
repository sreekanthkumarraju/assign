import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import './EditStudent.css'
import Select from 'react-select';




export default function AssignMentor({teachers,updateCount,teacherDetails}){

     const {id} =useParams()
     const [students,setStudent]=useState('')
     const [errors,setErrors]=useState('')
     const [count,setCount]=useState(0)
     const navigate=useNavigate()
     const [mentor,setMentor]=useState(()=> teacherDetails(teachers,id))


     const getStudentDetails=()=>{
         axios.get(`http://localhost:8000/getStudent/${id}`)
         .then((res)=>{
             setStudent(res.data)
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

    const handleSelect =(selectedOption)=>{
        console.log(selectedOption)
        setMentor({label:selectedOption.label,value:selectedOption.value})
    }

     const updateStudentDetails=()=>{
        if(Object.keys(errors).length===0)
        {
            console.log(students,mentor)

             axios.put(`http://localhost:8000/AssignMentor/${id}`,mentor)
             
             .then((res)=>{
                 console.log(res)
                 updateCount(count+2)
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
            
                   
            
            
                     return errors;
            }

     useEffect(()=>{
       
        getStudentDetails()   
        console.log(teachers)
        
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
                <p className="text-danger fs-2"> Assign Mentor</p>
                
                <input type='text' id='firstName'  name='firstName' className="update-student-firstname" placeholder="First Name" value={students.firstName} onChange={handleChange}/>
                <p className="text-danger fs-5">{errors.firstName}</p>
                
                <input type='text' id='lastName'  name='lastName' className="update-student-lastname" placeholder="Last Name" value={students.lastName} onChange={handleChange}/>
                <p className="text-danger fs-5">{errors.lastName}</p>
                
                <input type='email' id='Email' name='email' className="update-student-email" placeholder="Email" value={students.email} onChange={handleChange}/>
                <p className="text-danger fs-5">{errors.email}</p>
                
               
                <label >Assign a mentor </label>
                 
                     

                <Select
                                    name={"assigned"}
                                    type={"text"}
                                    value={mentor}
                                    onChange={handleSelect}
                                    options={
                                        (teachers!=={}) ?
                                         
                                        teachers.map((teacher)=>{
                                           return (
                                               { 
                                                   
                                                   value :teacher.TeacherId,
                                                   label:teacher.TeacherId
                                                }
                                           )
                                       })
                                        : null
                                    }
                                  
                                />
                


                <button type='submit' id='update-student'  className="bg-danger">Assign</button>
            </form>
           
           :' '
           }
        </div>

    )

        }
