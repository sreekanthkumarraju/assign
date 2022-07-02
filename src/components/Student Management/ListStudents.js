import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './ListStudent.css';

export default function ListStudents({students}){
   
    return(
        
    <div id='student-container'>
            <nav className="navbar w-50 fs-2 "  style={{"height":"50px","margin":"0 auto 20px "}}>
                 <div class="container-fluid">
                    <Link to ='create-student'>
                       <a class="navbar-brand text-danger">Create Student</a>
                   </Link>

                  
                </div>
            </nav>
        <div>

            <p className='fs-4 text-primary'>List of Students</p>
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

                             <td>
                              <th>Assign Mentor</th>
                             </td> 
                            
                            
                         </tr>

                     </thead>
                    <tbody>
                       
             {
                 students ?
                students.map((student,index)=>{
                     return(
                        <tr id='student-row'>
                            <td>{student.StudentId}</td>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.email}</td>
                            <td>{student.course}</td>
                            <td>
                           

                             <Link  to={`assignmentor/${student.StudentId}`}>
                                 <i class="fa-solid fa-pen fa-fw"></i>
                             </Link>

                             

                            </td>
                        </tr>                        
                     )
                })
                :null
            }  
            </tbody> 
            </table>
            </div> 
    </div>

    )
}

