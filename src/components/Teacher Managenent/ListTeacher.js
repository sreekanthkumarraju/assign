import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import  './ListTeacher.css'


export default function ListTeacher({teachers}){

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
            <p className="fs-4 text-primary">List of Mentors</p>
             <table id='teacher-table'>
                     <thead>
                         <tr id='teacher-row'>
                             <td>
                               <th>Teacher Id</th>
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
                              <th>Assign Students</th>
                             </td> 

                             <td>
                               <th> Student List</th>
                             </td> 
                            
                         </tr>

                     </thead>
                    <tbody>
                       
            {
                teachers.map((teacher,index)=>{
                     return(
                        <tr id='teacher-row'>
                            <td>{teacher.TeacherId}</td>
                            <td>{teacher.firstName}</td>
                            <td>{teacher.lastName}</td>
                            <td>{teacher.email}</td>
                            <td>{teacher.date_of_join}</td>
                            <td>{teacher.salary}</td>
                            
                            <td>
                            
                             <Link  to={`assignStudents/${teacher._id}`}>
                                 <i class="fa-solid fa-pen fa-fw"></i>
                             </Link>

                            </td>

                            <td>
                             <Link  to={`studentlist/${teacher.TeacherId}`}>
                                <span><i class="fa-solid fa-eye fa-fw"></i></span>
                             </Link> 
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