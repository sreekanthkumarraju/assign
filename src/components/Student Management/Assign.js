import axios from "axios";
import React, { useEffect, useState } from "react";
import { Formik } from 'formik';
import Select from 'react-select';


export default function AssignMentor({teachers,students}){

  const poststudents =async (values)=>{

    await axios.post('http://localhost:8000/assignstudents',values)
      .then((res)=>{
        console.log(res)
      })
     .catch((err)=>{
         console.log(err)
     })
         

  }

    return(
        
      <div> 
     <Formik
            initialValues={{
                mentor: "",
                students:''
            }}
            onSubmit={values =>{
                
                alert(JSON.stringify(values, null, 2))
               console.log(values)
               poststudents(values)
            
            }
            }
            >
            {
                
                props => {
                    const {
                        values,
                        handleSubmit,
                        handleBlur,
                        setFieldValue
                    } = props;
                    return (
                       
                        <form onSubmit={handleSubmit}>
                            <div style={{width: "200px", marginBottom: "15px"}}>
                                <Select
                                    id={"mentor"}
                                    type={"text"}
                                    value={values.mentor}
                                    onChange={option => setFieldValue("mentor", option)}
                                   
                                        
                                    options={
                                        
                        
                                        teachers.map((teacher,index)=>{
                                            return({
                                                value: teacher._id,
                                                label:index
                                            })
                                        })
                                        
                                    
                                       
                                    }
                                  
                                
                                    onBlur={handleBlur}
                                />
                            </div>

                            <div style={{width: "200px", marginBottom: "15px"}}>
                                <Select
                                    id={"students"}
                                    isMulti={true}
                                    type={"text"}
                                    value={values.students}
                                    onChange={option => setFieldValue("students", option)}
                                    options={
                                        (students !=={}) ?
                                         
                                        students.map((student,index)=>{
                                           return (
                                               { 
                                                   value : student._id,
                                                   label:index
                                                }
                                           )
                                       })
                                        : null
                                    }
                                    onBlur={handleBlur}
                                />
                            </div>
                            <button type='submit'>Submit</button>
                        </form>
                    );
                }
               
            }
        </Formik>
      
        </div>  

     
         
    )
        
}

