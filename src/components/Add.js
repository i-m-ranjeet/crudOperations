import React,{useState, useEffect} from 'react'

function Add({newEntry, update, letedit, oldvalue}) {
    const [data,setData]=useState([]);
    const [letEDIT,setLetEdit]=useState(letedit);
    // const [old,setOld]=useState(oldvalue);


    const handleChange=(e)=>{
        setData(e.target.value);
    }


    const addNew=()=>{
        newEntry(data);
        setData("");
    }
    
    const editOld=()=>{
        update(data);
        setLetEdit(!letEDIT)
        setData("");
    }


    useEffect(() => {
        setData(oldvalue);
        setLetEdit(!letedit)
    }, [oldvalue,letedit]);


    const add = <label htmlFor="Add"  onClick={addNew} >Add to List</label>;
    const edit = <label htmlFor="Add" className="editbtn" onClick={editOld} >Edit in List</label>;

    return (
        <div className="add">
            <input type="text" name="" placeholder="Enter Here..." /*value={letedit?data:data}*/ value={data} onChange={handleChange} />
            {!letEDIT ? edit : add}
        </div>
    )
}

export default Add
