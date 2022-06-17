import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";


export default function TeacherProfile(){
   
    const {id}=useParams()
    const [teacher,setTeacher]=useState([])
    const [students,setStudents]=useState([])

   
    const getTeacherDetails=async ()=>{

      await axios.get(`https://629ef6b78b939d3dc28b227c.mockapi.io/teachers/${id}`)
       
        .then((resp)=>{
           console.log(resp.data)
           setTeacher((prevState)=>(          
               resp.data             
            ))    
              
       })
       .catch((err)=>{
           console.log(err)
       })

    }


    const getStudentDetails=()=>{

        axios.get('https://629ef6b78b939d3dc28b227c.mockapi.io/students')
        .then((resp)=>{
            console.log(resp.data)
            setStudents(resp.data)
        })
        .catch((err)=>{
            console.log(err)
        })
 
     }
    
       
     const student=students.filter((findstudent)=>{
              return findstudent.mentor===id

     })
     console.log(student)
      useEffect(()=>{
         getStudentDetails()
         getTeacherDetails()
      },[])


    return(
        
        <div style={{"margin":"60px 400px 0"}}>
            {
              (teacher) ? 
        <div>
          
          <h1 style={{"textAlign":"left","fontSize":"25px","marginLeft":"60px"}}>{teacher.firstName}'s Profile</h1>
            
          <div >
            <table style={{"float":"left"}}>
                <tr>
                    <td>First Name</td>
                </tr>
                <tr>
                    <td>Last Name</td>
                </tr>
                <tr>
                    <td>Email</td>
                </tr>
                <tr>
                    <td>Date of Join</td>
                </tr>
                <tr>
                    <td>Salary</td>
                </tr>
                <tr>
                    <td>Students Assigned</td>
                </tr>
            </table>

            <table >
                <tr>
                    <td>{teacher.firstName}</td>
                </tr>
                <tr>
                    <td>{teacher.lastName}</td>
                </tr>
                <tr>
                    <td>{teacher.email}</td>
                </tr>
                <tr>
                    <td>{teacher.date_of_join}</td>
                </tr>
                <tr>
                    <td>{teacher.salary}</td>
                </tr>
                <tr id='border'>
                      <td>Roll Numbers:
                    { student.map((student)=>{
                        return(
                            
                               
                        <Link  className="text-danger ms-2" to={`/student/profile/${student.id}`}>

                         {student.id}

                      </Link> 
                                      
                        )
                     })
                    }
                    </td>
                   
                  </tr>
            </table>
            </div>
           
            </div>            
             : ' ...Loading'
          }
        </div>
        
    )
}