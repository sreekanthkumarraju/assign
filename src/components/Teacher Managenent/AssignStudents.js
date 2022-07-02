import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import Select from 'react-select';
import './EditTeacher.css'

const studentDetails=(teachers,studentlist)=>{
   let students=[]
   console.log(teachers,studentlist)
   let count
   let c=0
   for(let i in studentlist)
     {
         count=0
         for(let j in teachers)
           {
               let assigned=teachers[j].students
               for(let k in assigned)
                 {
                     if( parseInt(studentlist[i].StudentId)===assigned[k])
                     {
                          count+=1
                          break;
                     }
                 }
           }

           if(count===0)
             {
               students[c]=studentlist[i]
               c++
             }
         
     }
 console.log(students)
  return students
        
}



export default function AssignStudents({students,Allteachers,updateCount}){

     const {id} =useParams()
     const [teachers,setTeacher]=useState({
         firstName:'',
          lastName:'',
          email:'',
            
     })

     const [assigned,setAssigned]=useState([])

     const [count,setCount]=useState(0)
     const [errors ,setErrors]=useState('')

     const navigate=useNavigate()

 
     const handleChange=(e)=>{

          let name=e.target.name
          let value=e.target.value

          setTeacher((prevState)=>({
              ...prevState,
             [name]:value

          }))
    }

    const getTeacherDetails=()=>{
        axios.get(`http://localhost:8000/createTeacher/${id}`)
        .then((res)=>{
            setTeacher({
                firstName:res.data.firstName,
                lastName :res.data.lastName,
                email    :res.data.email,
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const handleSubmit=(event)=>
    {
        event.preventDefault()
        console.log(teachers)
        setCount(count+1)
        updateCount(count+1)
        setErrors(validate(teachers))
        console.log(count)
       
    }


    const handleSelect =(selectedOptions)=>{
        console.log(selectedOptions)
        const values=[]

        for(let i in selectedOptions)
           {
               values.push(selectedOptions[i])
           }
        
           setAssigned(()=>values)
           console.log(assigned)
    }

     const updateStudentDetails=()=>{

        if(Object.keys(errors).length===0)
        {
           
             axios.put(`http://localhost:8000/teachers/${id}`,assigned)
             
             .then((res)=>{
                 console.log(res)
                  setTimeout(()=>{
                    navigate('/teacher')
                  },[5000])

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

            let Unassignedstudents=  studentDetails(Allteachers,students)    
     useEffect(()=>{
        
        if(count>0)
         {
            updateStudentDetails()
            console.log(count)
         } 

     },[(count)])

   
     useEffect(()=>{
        getTeacherDetails()   
      
     },[])

    return(

        <div>
            {
            (teachers) ?
            
            <form  className='edit-teacher-form' onSubmit={handleSubmit}>
                <p className="text-danger fs-2">Assign Students</p>
                <input type='text' id='firstName'  name='firstName'className="edit-teacher-fname" placeholder="First Name" value={teachers.firstName} onChange={handleChange}/>
                <p className="text-danger fs-5">{errors.firstName}</p>
                
                <input type='text' id='lastName' name='lastName' className="edit-teacher-lname" placeholder="Last Name" value={teachers.lastName} onChange={handleChange}/>
                <p className="text-danger fs-5">{errors.lastName}</p>
                
                <input type='email' id='mail' name='email' className="edit-teacher-email" placeholder="Email" value={teachers.email} onChange={handleChange}/>
                <p className="text-danger fs-5">{errors.email}</p>
                
                
               
                <div style={{width: "200px", marginBottom: "15px"}}>
                <label id='students'>Students</label>
                                <Select
                                    name={"assigned"}
                                    isMulti={true}
                                    type={"text"}
                                     id={'assigned'}
                                    value={assigned}
                                    onChange={handleSelect}
                                    options={
                                        (Unassignedstudents !=={}) ?
                                         
                                        Unassignedstudents.map((student,index)=>{
                                           return (
                                               { 
                                                   value : student.StudentId,
                                                   label:student.StudentId
                                                }
                                           )
                                       })
                                        : null
                                    }
                                  
                                />
                            </div>
                    
                
                       
                
                <button type='submit' className="edit-teacher-button bg-danger">Assign students</button>
            </form>
           
           :' '
           }
        </div>

    )

        }
