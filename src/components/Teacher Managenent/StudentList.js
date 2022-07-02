import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";


export default function StudentList(){
   
    const {id}=useParams()
    const [teacher,setTeacher]=useState([])
    const [students,setStudent]=useState([])
  
   
    const getTeacherDetails=async ()=>{

      await axios.get(`http://localhost:8000/teacher/studentlist/${id}`)
       
        .then((resp)=>{
           console.log(resp.data)
           console.log(resp.data.teacher)
           console.log(resp.data.studentlist)
           setTeacher((prevState)=>(          
            resp.data.teacher          
            ))   
            
             setStudent(resp.data.studentlist)
              
       })
       .catch((err)=>{
           console.log(err)
       })

    }

  
    
      useEffect(()=>{
      
         getTeacherDetails()
      },[])


    return(
        
        <div >
            {
              (teacher) ? 
        <div>
          
          <p className="fs-4 text-primary">Assigned students for {teacher.firstName}</p>
            
          <table id='student-table'>
                     <thead>
                         <tr id='student-row'>
                             <td>
                               <th>Student Id</th>
                             </td>

                             <td>
                               <th>First Name</th>
                             </td>

                             <td>
                               <th>Last Name</th>
                             </td>

                             <td>
                               <th>Email</th>
                             </td> 

                             <td>
                              <th>Course</th>
                             </td>
                            
                         </tr>

                     </thead>
                    <tbody>
                       
            {
              
                students.map((student)=>{
                     return(
                        <tr id='student-row'>
                            <td>{student.StudentId}</td>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.email}</td>
                            <td>{student.course}</td>
                            
                        </tr>                        
                     )
                })
              
            } 
            </tbody> 
            </table> 
            </div> 
             : ' ...Loading'
          }
        </div>
        
    )
}