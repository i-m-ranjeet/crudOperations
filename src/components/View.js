import React,{useState, useEffect} from 'react';
import axios from "axios";
import Add from './Add';



  

function View() { 

///////   Creating States      ///////////
  const [state,setState]=useState([]);
  const [deleted,setDeleted]=useState(true);
  const [key,setKey]=useState();
  const [letedit,setLetEdit]=useState(false);
  const [oldvalue,setOldValue]=useState();


///////   Getting Data From    //////////
  const getInitialData = ()=>{
    axios.get("http://5.189.130.81:1337/restaurants").then((res)=>{
      setState([...res.data]);
    });
  }


///////   Delete An  Item or object from API     //////////
  const deleteItem=(e)=>{
    axios.delete(`http://5.189.130.81:1337/restaurants/${e.target.parentElement.firstElementChild.innerText}`)
    setDeleted(!deleted);
  }

////////// Getting Key for update API value  /////////
  const updateItem=(e)=>{
    const getkey = e.target.parentElement.firstElementChild.innerText;
    const value = e.target.parentElement.childNodes[1].innerText;
    setOldValue(value);
    // e.target.parentElement.parentElement.parentElement.classList.toggle("active")
    // console.log(e.target.parentElement.parentElement.parentElement)
    setKey(getkey);
    setLetEdit(true)
  }

//////////////  Updating exist value //////////////////
  const update=(newupdate)=>{
    const update={name:newupdate};
    axios.put(`http://5.189.130.81:1337/restaurants/${key}`,update);
    setDeleted(!deleted);
    setLetEdit(false);
  }


/////////////    Getting Data from ./Add.js component And Posting to API    //////
  const newEntry=(gettingnew)=>{
    const newpayload={name:gettingnew};
    axios.post("http://5.189.130.81:1337/restaurants",newpayload);
  }


//////////  Calling useEffect Whenever Data Added, Deleted and Updated in API    ////////
  useEffect(() => {
    getInitialData()
  }, [state,deleted]);
  

    return (
        <div className="container">
          <Add newEntry={newEntry}  update={update} letedit={letedit} oldvalue={oldvalue} />
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
