import React, { useState, useEffect } from "react";
import "./Employee.css";
import { Link, useHistory, useParams  } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import AlertModel from "../../common/AlertModel.js"



const Employee = () => {
  const { id } = useParams();
  const [student, setStudent] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState(false)
 const [modalOpen, setModalOpen] = useState(false);

 const [currentPage , setCurrentPage] = useState(1);
    const [itemsPerPage , setItemPerPage] = useState(5);
   
    const [pageNumberLimit, setpageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);



    const pages =[];
    for(let i =1; i<=Math.ceil(student.length/itemsPerPage);i++){
             pages.push(i);
    }
   
    const indexOfLastItem = currentPage *itemsPerPage;
   //  1  X 15 = 15 and 2 X 10 = 30
    const indexOfFistItem = indexOfLastItem - itemsPerPage;
   //   30 -15 = 15 and 15 -15 = 0
    const currentItem = student.slice(indexOfFistItem,indexOfLastItem);
   
    const handleNewClick = (event) => {
     setCurrentPage(Number(event.target.id));
   };
    const renderPageNumbers = pages.map((number)=>{
    
     if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
       return(
         <li key={number} id ={number} onClick={handleNewClick} className={currentPage == number ? "active" : null}>
           {number}
         </li>
     )
    } else {
           return null;
         }
    });
    
   
    const handleNextbtn = () => {
     setCurrentPage(currentPage + 1);
   
     if (currentPage + 1 > maxPageNumberLimit) {
       setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
       setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
     }
   };
   
   const handlePrevbtn = () => {
     setCurrentPage(currentPage - 1);
   
     if ((currentPage - 1) % pageNumberLimit == 0) {
       setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
       setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
     }
   };
   
   let pageIncrementBtn = null;
   if (pages.length > maxPageNumberLimit) {
     pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
   }
   
   let pageDecrementBtn = null;
   if (minPageNumberLimit >= 1) {
     pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
   }
   //  className={currentPage == number ? "active" : null}




 const [ids,setID]=useState()
  const history = useHistory();
  const routeChange = () =>{ 
    let path = `./AddPeople`; 
    history.push(path);
  }
  useEffect(() => {
    getAllStudent();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      searchHandler()
    } else {
      getAllStudent()
      setSearch(false)
    }
  }, [searchQuery])

  const delAlert=(id)=> {
    setModalOpen(true)
      setID(id)
  }

  const searchHandler = () => {
    let filterDAta = student.filter((data) =>
  //  console.log("data",data)
       data.useremail.includes(searchQuery)
    );
    if (filterDAta.length > 0) {
      console.log("filterDAta",filterDAta)
      setStudent(filterDAta);
    }
    setSearch(true)
  };
  async function getAllStudent() {
    try {
      const student = await axios.get("http://localhost:3003/posts");
      setStudent(student.data);
    } catch (error) {
      console.log("something is wrong");
    }
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3003/posts/${id}`);
    var newstudent = student.filter((item) => {
      return item.id !== id;
    });
    setStudent(newstudent);
     setModalOpen(false)
    
  };

  return (
    <div className="header">
      <Header headerName="Employee List" />
      {modalOpen ? <AlertModel setOpenModal={setModalOpen} handleDelete={(id)=>handleDelete(id)} id={ids}/>:      <div className="main">
        <div style={{marginTop:"4%"}}>
          <div class="row">
            <div class="col-sm-6" style={{marginTop: "5px"}}>
              <div class="col-sm-5">
              <div class="input-group">
                <input
                  class="form-control  border"
                  type="search"
                  id="example-search-input"
                  placeholder="Search here.."
                  //value={searchQuery}
                  onChange={(value) => setSearchQuery(value.target.value)}
                  style={{
                    backgroundImage:search==false? "url(images/Search.png)":"",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right",
                    backgroundOrigin:"content-box",
                    padding: "5px",
                   backgroundColor:"#f1f1f1"
                  }}
                />
                </div>
              </div>
            </div>
            <div class="col-sm-6" >
              <div className="pos">
                <button
                  className="btn  float-right"
                  type="submit"
                >
                  <Link to="/">
                    <img
                      className="export_image"
                      src="images/Export.png"
                      alt="logo"
                    />
                  </Link>
                  Export
                </button>
                <button
                  className="btn btn-outline-success float-right"
                  type="submit"
                >
                  <Link to="/">
                    <img
                      className="filter_image"
                      src="images/Filter.png"
                      alt="logo"
                    />
                  </Link>
                  Filter
                </button>
                <button
                  className="btn btn-outline-success float-right"
                  style={{ backgroundColor: "#003366", color: "white" }}
                  type="submit"
                  onClick={routeChange}
                >
                  Add Employee
                </button>
              </div>
            </div>
          </div>
        </div>
        <table class="employee-header">
       
            <tr>
                <th>ID  <img  src="images/Sort.png"  alt="logo" /></th>
                <th>Name <img  src="images/Sort.png"  alt="logo" /></th>
                <th>Email <img  src="images/Sort.png"  alt="logo" /></th>
                <th>Phone No </th>
                <th>DOB</th>
                <th>Role <img  src="images/Sort.png"  alt="logo" /></th>
                <th>Action</th>
            </tr>
       
    
    
        {currentItem.map((students, i) => {
          return (


  
            <tr>
                <td class="geeks">{students.id}</td>
                <td>{students.username}</td>
                <td><a href="#" class="user-email">{students.useremail}</a></td>
                <td>8989898989</td>
                <td>10/01/1990</td>
                <td>Developer</td>
                <td><button> <img
                      src="images/Edit.png"
                      alt="logo"
                    /></button><button   onClick={() => delAlert(students.id)}><img src="images/Del.png" alt="logo" /></button>
                
                </td>
            </tr>
 
 
          );
        })}
         </table>



<ul className="pageNumbers">
        <li>
          <button
            onClick={handlePrevbtn}
            disabled={currentPage == pages[0] ? true : false}
          >
            Previous
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}

        <li>
          <button
            onClick={handleNextbtn}
            disabled={currentPage == pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
        </li>
      </ul>


      </div>}

    </div>
  );
};

export default Employee;
