import React from "react";
import { Link } from "react-router-dom";

export default function NavBar(){
    return(
        
        <div>
    
                 <ul className="nav bg-primary  navbar-expand-lg justify-content-center">
  
                   <li className="nav-item"> 
                   <Link to='/student'>    
                     <p className="nav-link text-white fs-3"  >Student Management</p>
                    </Link> 
                 </li>
  
                  <li className="nav-item">
                  <Link to='/teacher'>     
                    <p className="nav-link text-white fs-3" >Teacher Management</p>
                    </Link>
                 </li>
  
               </ul>
                  

            
        </div>
    )
}