import React,{useState , useEffect}  from 'react'
import { useParams } from "react-router-dom";

function Pagination(props) {

    const { id } = useParams();
    console.log(props.Name);

    const data = {name:'Raghu'};

    const [currentPage , setCurrentPage] = useState(1);
    const [itemsPerPage , setItemPerPage] = useState(5);
   
    const [pageNumberLimit, setpageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);


    const pages =[];
    for(let i =1; i<=Math.ceil(props.Name.length/itemsPerPage);i++){
             pages.push(i);
    }
   
    const indexOfLastItem = currentPage *itemsPerPage;
   //  1  X 15 = 15 and 2 X 10 = 30   1 X 5 =5 
    const indexOfFistItem = indexOfLastItem - itemsPerPage;
   //   30 -15 = 15 and 15 -15 = 0
    const currentItem = props.Name.slice(indexOfFistItem,indexOfLastItem);
   
    const handleNewClick = (event) => {
     setCurrentPage(Number(event.target.id));
   };
    const renderPageNumbers = pages.map((number)=>{
     // return(
     //     <li key={number} id ={number} onClick={handleNewClick} className={currentPage == number ? "active" : null}>
     //       {number}
     //     </li>
     // );
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



    return (
        <div>
          <button onClick={()=>props.alert(data)}>Hello World</button>

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
            
        </div>
    )
}

export default Pagination;
