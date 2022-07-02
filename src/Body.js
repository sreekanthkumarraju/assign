import React,{useState,useEffect} from "react";
import axios from 'axios'
import {Routes,Route} from 'react-router-dom'
import CreateStudent from "./components/Student Management/CreateStudent";
import AssignMentor from "./components/Student Management/AssignMentor";
import ListStudents from "./components/Student Management/ListStudents";
import CreateTeacher from "./components/Teacher Managenent/CreateTeacher";
import AssignStudents from "./components/Teacher Managenent/AssignStudents";
import ListTeacher from "./components/Teacher Managenent/ListTeacher";
import StudentList from "./components/Teacher Managenent/StudentList";


export default function Body(){
  
    const [students,setStudent]=useState({})

    const [teachers,setTeachers]=useState('')

    const [count,setCount]=useState(0)
  
    const getStudents=()=>{
        axios.get('http://localhost:8000/createStudent')
        .then((res)=>{
            console.log(res.data)
            setStudent(res.data)
          
        })
        .catch((err)=>{
            console.log(err)
    
        })
    }


    const getTeachers=()=>{
        axios.get('http://localhost:8000/createTeacher')
        .then((res)=>{
            console.log(res.data)
            setTeachers(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const teacherDetails= (teachers,id)=>{
        for(let i in teachers)
        {
            let students=teachers[i].students
             for(let j in students)
              {
                  if(students[j]===parseInt(id))
                   {
                       return(
                           { 'label':teachers[i].TeacherId,'value':teachers[i]}
                       )
                     
                   }
              }
         }
     }
     const updateCount=(value)=>{
         setCount(value)
         console.log(count)
     }

     useEffect(()=>{
         getStudents()
         getTeachers()
          console.log(students)
          console.log(teachers)
     },[count])
     
     return(
        <div>

          <Routes>
              
              <Route path='student' element={<ListStudents students={students}/>}> </Route>
              <Route path='/student/create-student' element={<CreateStudent teachers={teachers}  updateCount={updateCount}/>}></Route>
               {/* <Route path='/student/assign-mentor'  element={(teachers && students) ?<AssignMentor teachers={teachers} students={students}/>:null}></Route>  */}
             
              <Route path="/student/assignmentor/:id" element={<AssignMentor teachers={teachers} updateCount={updateCount} teacherDetails={teacherDetails}/>}></Route>
              <Route path='teacher' element={<ListTeacher teachers={teachers}/>}> </Route>           
              <Route path='/teacher/create-teacher' element={<CreateTeacher  updateCount={updateCount}/>}></Route>
              <Route path='/teacher/studentlist/:id' element={<StudentList/>}></Route>
              <Route path='/teacher/assignStudents/:id' element={<AssignStudents students={students} Allteachers={teachers} updateCount={updateCount}/>}></Route>
                 
          </Routes> 
        
        </div>
    )
}