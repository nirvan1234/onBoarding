// import React, { PureComponent } from "react";
// import AsyncSelect from "react-select/async";

// class Categories extends PureComponent {
//   state = { selectedUsers: [] };

//   onChange = (selectedUsers) => {
//     this.setState({
//       selectedUsers: selectedUsers || [],
//     });
//   };

//   loadOptions = async (inputText, callback) => {
//     const response = await fetch(
//       `http://localhost:3003/profile?employee_like=${inputText}`
//     );
//     const json = await response.json();
//     callback(json.map((i) => ({ label: i.employee, value: i.id })));
//   };

//   renderEveryUser = (user) => {
//     return <p></p>;
//   };

//   render() {
//     return (
      // <div className="users">
      //   <AsyncSelect
      //     isMulti
      //     value={this.state.selectedUsers}
      //     onChange={this.onChange}
      //     loadOptions={this.loadOptions}
      //     theme={(theme) => ({
      //       ...theme,
      //       borderRadius: 5,
      //       width: "60%",
      //       DropdownIndicator: {
      //         color: "darkblue",
      //       },
      //       colors: {
      //         ...theme.colors,
      //         primary25: "green",
      //         primary: "ligntblue",
      //         neutral0: "#f1f1f1",
      //         neutral90: "#f1f1f1",
      //       },
      //     })}
      //   />

      //   <div
      //     className="row"
      //     style={{ display: "flex", marginTop: "40px", position: "absolute" }}
      //   >
      //     {this.state.selectedUsers.map((o) => (
      //       <div className="col-sm-6" style={{ display: "flex" }}>
      //         <input
      //           type="checkbox"
      //           className="form-check-input"
      //           id="exampleCheck1"
      //         />
      //         <span
      //           style={{
      //             color: "darkBlue",
      //             fontWeight: "600",
      //             marginLeft: "15px",
      //           }}
      //         >
      //           {o.label}
      //         </span>
      //         <br />
      //       </div>
      //     ))}
      //   </div>
      // </div>
//     );
//   }
// }

// export default Categories;

// import React ,{useState,useEffect} from 'react'
// import ReactDom from "react-dom"
// import axios from 'axios'

// function Categories() {

//   const [employee, setEmployee] = useState([]);
//   const [search , setSearch] = useState('');
//   const [filtered, SetFiltered] = useState([]);

// useEffect(() => {
//   getemployee();
// }, []);


//   async function getemployee(){
//     try{
//       const emp = await axios.get("http://localhost:3003/profile");
//       setEmployee(emp.data);
//     } catch(error){
//       console.log('Something is Wrong')
//     }
//   }



// useEffect( ()=>{
//  SetFiltered(
//   employee.filter( p =>{
//     return (p.employee.toLowerCase().includes(search.toLowerCase()))
//   })
//  )
// },[search,employee])


//   return (
//     <div className="users">

//     <input type="text" placeholder="search" onChange={e => setSearch(e.target.value)}/>
//     <div
//       className="row"
//       style={{ display: "flex", marginTop: "40px", position: "absolute" }} 
//     >
//       {filtered.map((o) => (
//         <div className="col-sm-6" style={{ display: "flex" }}>
//           <input
//             type="checkbox"
//             className="form-check-input"
//             id="exampleCheck1"
//           />
//           <span
//             style={{
//               color: "darkBlue",
//               fontWeight: "600",
//               marginLeft: "15px",
//             }}
//           >
//             {o.employee}
//           </span>
//           <br />
//         </div>
//       ))}
//     </div>
//   </div>
      
    
//   )
// }

// export default Categories

import React ,{useState,useEffect} from 'react'
import ReactDom from "react-dom"
import axios from 'axios'

function Categories() {

  const [employee, setEmployee] = useState([]);
  const [search , setSearch] = useState('');
  const [filtered, SetFiltered] = useState([]);
  const [profession, setProfession] = useState();

useEffect(() => {
  getemployee();
}, []);


  async function getemployee(){
    try{
      const emp = await axios.get("http://localhost:3003/person");
      setEmployee(emp.data);
    } catch(error){
      console.log('Something is Wrong')
    }
  }



useEffect( ()=>{
 SetFiltered(
  employee.filter( p =>{
    return (p.name.toLowerCase().includes(search.toLowerCase()))
  })
 )
},[search,employee])

const handleSearch = () => {
 const newData = employee.filter(p => p.department == (profession == '' ? p.department: profession))
 setProfession(newData)
 SetFiltered(newData)
}

  return (
    <div className="users"  style={{ display: "flex", position: "absolute" }} >


    <select className="form-control" onChange={(e)=>setProfession(e.target.value)}>
      <option value=''>-Select-</option>
      <option value='hr'>HR</option>
      <option value='finance'>Finance</option>
      <option value='dev'>Development</option>
      <option value='acc'>Accounts</option>
      <option value='bde'>BDE</option>
    </select>
    <button onClick={()=>handleSearch()}> Search </button>

    <input type="text" placeholder="search" onChange={e => setSearch(e.target.value)}/>
    
    <div
      className="row"
      style={{ display: "flex", marginTop: "40px", position: "absolute" }} 
    >
      
      {filtered.map((o) => (
        <div className="col-sm-6" style={{ display: "flex" }}>
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <span
            style={{
              color: "darkBlue",
              fontWeight: "600",
              marginLeft: "15px",
            }}
          >
            {o.name}
          </span>
          <br />
        </div>
      ))}
    </div>
  </div>
      
    
  )
}

export default Categories

