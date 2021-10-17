import React,{useState, useEffect} from 'react';
import axios from "axios";
import Add from './Add';



  

function View() { 

///////   Creating States      ///////////
  const [state,setState]=useState([]);
  const [deleted,setDeleted]=useState(true);


///////   Getting Data From    //////////
  const getInitialData = ()=>{
    axios.get("http://5.189.130.81:1337/restaurants").then((res)=>{
      setState([...res.data]);
      // console.log(state);
    });
  }


///////   Delete An  Item or object from API     //////////
  const deleteItem=(e)=>{
    axios.delete(`http://5.189.130.81:1337/restaurants/${e.target.parentElement.firstElementChild.innerText}`)
    setDeleted(!deleted);
  }


  const updateItem=(e)=>{
    const update={name:"Ranjeet"};
    axios.put(`http://5.189.130.81:1337/restaurants/${e.target.parentElement.firstElementChild.innerText}`,update)
    setDeleted(!deleted);
  }


////////  Getting Data from ./Add.js component And Posting to API    //////
  const newEntry=(gettingnew)=>{
    const newpayload={name:gettingnew};
    axios.post("http://5.189.130.81:1337/restaurants",newpayload);
  }


/////// Calling useEffect Whwnever Data Added, Deleted and Updated in API //////
  useEffect(() => {
    getInitialData()
  }, [state,deleted]);
  

    return (
        <div className="container">
          <Add newEntry={newEntry} />
          <table cellSpacing="5px">
            <tbody>
            <tr>
            <th>ID</th>
            <th>Name</th>
            <th>created at</th>
            <th>published at</th>
            <th colSpan="2">Edit/Delete</th>
            </tr>
            </tbody>
            {
            state.map((el)=>(
             <tbody key={el.id}>
                <tr>
                <td className="id">{el.id}</td>
                <td>{el.name}</td>
                <td>{el.created_at}</td>
                <td>{el.published_at}</td>
                <td className="edit" onClick={updateItem}>&#9998;</td>
                <td className="close" onClick={deleteItem}>&#10007;</td>
              </tr>
             </tbody>
    ))}

          </table>
      </div>
    )
}

export default View
