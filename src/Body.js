import React,{useState,useEffect} from "react";
import axios from 'axios'
import {Routes,Route} from 'react-router-dom'
import CreateStudent from "./components/Student Management/CreateStudent";
import Edit from "./components/Student Management/Edit";
import ListStudents from "./components/Student Management/ListStudents";
import Profile from "./components/Student Management/Profile";
import CreateTeacher from "./components/Teacher Managenent/CreateTeacher";
import EditTeacher from "./components/Teacher Managenent/EditTeacher";
import ListTeacher from "./components/Teacher Managenent/ListTeacher";
import TeacherProfile from "./components/Teacher Managenent/TeacherProfile";

export default function Body(){


    const [teachers,setTeachers]=useState([])
  
    const getTeacherDetails=()=>{

       axios.get('https://629ef6b78b939d3dc28b227c.mockapi.io/teachers')
       .then((resp)=>{
           console.log(resp.data)
           setTeachers(resp.data)
       })
       .catch((err)=>{
           console.log(err)
       })

    }
    console.log(teachers)

    useEffect(()=>{
         getTeacherDetails()
      },[])
        
    return(
        <div>

          <Routes>

              <Route path='student' element={<ListStudents/>}> </Route>
              <Route path='/student/create-student' element={<CreateStudent teachers={teachers} />}></Route>
              <Route path='/student/profile/:id' element={<Profile teachers={teachers}/>}></Route>
              <Route path="/student/edit/:id" element={<Edit teachers={teachers}/>}></Route>
              <Route path='teacher' element={<ListTeacher/>}> </Route>           
              <Route path='/teacher/create-teacher' element={<CreateTeacher/>}></Route>
              <Route path='/teacher/teacher-profile/:id' element={<TeacherProfile/>}></Route>
              <Route path='/teacher/edit-teacher/:id' element={<EditTeacher/>}></Route>
                 
          </Routes> 
        
        </div>
    )
}