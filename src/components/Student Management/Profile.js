import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Profile.css'



export default function Profile({teachers}){
   
    const {id}=useParams()
    const [students,setStudent]=useState([])

   
    const getStudentDetails=async ()=>{

      await axios.get(`https://629ef6b78b939d3dc28b227c.mockapi.io/students/${id}`)
       
        .then((resp)=>{
           console.log(resp.data)
           setStudent((prevState)=>(          
               resp.data             
            ))          
       })
       .catch((err)=>{
           console.log(err)
       })

    }

    const getTeacherById=(id)=>
    {
         return teachers.find(teacher=>teacher.id===id)
    }
    const teacher=getTeacherById(students.mentor)
    console.log(teacher)

      useEffect(()=>{
         getStudentDetails()
        
      },[])

    

    return(
        
        <div className="student-profile-container">
            {
              (students) ? 
            <div>
          
          <h1 style={{"textAlign":"left","marginTop":"60px"}} id='student-profile-heading'>{students.firstName}'s Profile</h1>
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
                    <td>Course</td>
                </tr>
                <tr>
                    <td>Mentor</td>
                </tr>
            </table>

            <table >
                <tr>
                    <td>{students.firstName}</td>
                </tr>
                <tr>
                    <td>{students.lastName}</td>
                </tr>
                <tr>
                    <td>{students.email}</td>
                </tr>
                <tr>
                    <td>{students.course}</td>
                </tr>

                <tr>
                { (teacher) ?
                      <td>{teacher.firstName}</td>
                       :  <td>Not Assigned</td>
                      }
                </tr>
                
            </table>
            </div>
            </div>
            :''
              
                  
              
            }

            </div>
            )
            }
            
            
