import React,{useState} from 'react'

function Add({newEntry}) {
    const [data,setData]=useState([])
    const handleChange=(e)=>{
        setData(e.target.value);
    }
    const addNew=()=>{
        newEntry(data);
    }
    return (
        <div className="add">
            <input type="text" name="" placeholder="Enter Here..." onChange={handleChange} />
            <label htmlFor="Add" onClick={addNew} >Add to List</label>
        </div>
    )
}

export default Add
