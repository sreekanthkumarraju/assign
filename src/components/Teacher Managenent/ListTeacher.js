import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import  './ListTeacher.css'


export default function ListTeacher(){
      
     const [teachers,setTeachers]=useState([])
     const [count,setCount]=useState(0)
     const getStudentDetails=()=>{

        axios.get('https://629ef6b78b939d3dc28b227c.mockapi.io/teachers')
        .then((resp)=>{
            console.log(resp.data)
            setTeachers(resp.data)
        })
        .catch((err)=>{
            console.log(err)
        })

     }

     const handleDelete=(id)=>{

           axios.delete(`https://629ef6b78b939d3dc28b227c.mockapi.io/teachers/${id}`) 
           .then((res)=>{
               console.log(res)
               setCount(count+1)
           })
           .catch((err)=>{
               console.log(err)
           })
     }

      useEffect(()=>{

        getStudentDetails()
         
      },[count])

    return(
       
         <div>
            <nav class="navbar w-50 fs-2" style={{"height":"50px","margin":"0 auto 20px "}}>
                 <div class="container-fluid">
                    <Link to ='create-teacher'>
                       <a class="navbar-brand text-danger">Create Teacher</a>
                   </Link>
                </div>
            </nav>
        <div>
             <table id='teacher-table'>
                     <thead>
                         <tr id='teacher-row'>
                             <td>
                               <th>S.No</th>
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
                              <th>Date Of Join</th>
                             </td> 

                             <td>
                              <th>Salary</th>
                             </td> 

                             <td>
                              <th>Actions</th>
                             </td> 
                            
                         </tr>

                     </thead>
                    <tbody>
                       
            {
                teachers.map((teacher)=>{
                     return(
                        <tr id='teacher-row'>
                            <td>{teacher.id}</td>
                            <td>{teacher.firstName}</td>
                            <td>{teacher.lastName}</td>
                            <td>{teacher.email}</td>
                            <td>{teacher.date_of_join}</td>
                            <td>{teacher.salary}</td>
                            
                            <td>
                             <Link  to={`teacher-profile/${teacher.id}`}>
                                <span><i class="fa-solid fa-eye fa-fw"></i></span>
                             </Link> 

                             <Link  to={`edit-teacher/${teacher.id}`}>
                                 <i class="fa-solid fa-pen fa-fw"></i>
                             </Link>

                                <i class="fa-solid fa-trash-can fa-fw"  onClick={()=>handleDelete(teacher.id)}></i>

                            </td>
                        </tr>                        
                     )
                })
            } 
            </tbody> 
            </table>
            </div> 
         </div>
    
    )
}