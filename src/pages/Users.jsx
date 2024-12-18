import React, { useContext, useEffect,useState } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContextProvider';

const getCurrentPage=(pageNumber)=>{
    pageNumber= Number(pageNumber);

    if(typeof pageNumber !== "number" && pageNumber<=0){
        pageNumber=1;
    }

    if(!pageNumber){
        pageNumber=1;
    }
    return pageNumber;
}



const Users = () => {

    
    const [data, setData]=useState([]);
   const {isAuth} =useContext(AuthContext);
   //1. getting the page number from query parameter
   let [searchParams, setSearchParams]=useSearchParams();
   const initialPage= getCurrentPage(searchParams.get("page"));
   const navigate=  useNavigate();
   const [page, setPage]= useState(initialPage);


    async function fetchingData(page){
        try{

            let response= await fetch(`https://reqres.in/api/users?page=${page}`);
            let data= await response.json();
    
            // console.log(data.data);
            setData(data?.data || []);
        }
        catch(error){
            console.log(error);
        }

    }
    useEffect(()=>{
       fetchingData(page);
    },[page])

    useEffect(()=>{
        setSearchParams({page})
    },[page])

   const handlePageChange=(val)=>{
    const changeBy=  page +val;
    setPage(changeBy);
   }
 
    return (
        <>
    <h1>Users page</h1>
        <button onClick={()=>navigate('/')}>go to home page using useNavigate hook</button>
       <Link to="/">
        <button>go to home page using link</button>
       </Link>
    {
        data.map((user)=>{
            return<div style={{border:"1px solid white", margin:"10px"}}>
            <img src={user.avatar} alt="" />
            
           <Link to={`${user.id}`}>
           {user.first_name}
           </Link>
            </div>
        })
    }
    <button onClick={()=>handlePageChange(-1)}>previous</button>
    <button onClick={()=>handlePageChange(1)}>next</button>
    </>
  )
}

export default Users