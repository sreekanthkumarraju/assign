import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './ListStudent.css';

export default function ListStudents(){

    const [students,setStudents]=useState([])
    const [count,setCount]=useState(0)
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

    const handleDelete=(id)=>{

          axios.delete(`https://629ef6b78b939d3dc28b227c.mockapi.io/students/${id}`) 
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
    <div id='student-container'>
            <nav className="navbar w-50 fs-2 "  style={{"height":"50px","margin":"0 auto 20px "}}>
                 <div class="container-fluid">
                    <Link to ='create-student'>
                       <a class="navbar-brand text-danger">Create Student</a>
                   </Link>
                </div>
            </nav>
        <div>
             <table id='student-table'>
                     <thead>
                         <tr id='student-row'>
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
                              <th>Course</th>
                             </td> 

                             <td>
                              <th>Actions</th>
                             </td> 
                            
                            
                         </tr>

                     </thead>
                    <tbody>
                       
            {
                students.map((student)=>{
                     return(
                        <tr id='student-row'>
                            <td>{student.id}</td>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.email}</td>
                            <td>{student.course}</td>
                            <td>
                             <Link  to={`profile/${student.id}`}>
                                <span><i class="fa-solid fa-eye fa-fw"></i></span>
                             </Link> 

                             <Link  to={`edit/${student.id}`}>
                                 <i class="fa-solid fa-pen fa-fw"></i>
                             </Link>

                               <a><i class="fa-solid fa-trash-can fa-fw"  onClick={()=>handleDelete(student.id)}></i></a>

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

