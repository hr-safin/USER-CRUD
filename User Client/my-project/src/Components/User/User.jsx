import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const User = () => {

    const loader = useLoaderData()
    const [deleteOne, setDelete] = useState(loader)

    const handleRemove = (id) => {

        fetch(`http://localhost:5000/users/${id}`, {
            method : "DELETE"
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.deletedCount > 0){
                alert("Deleted Successfully")
                const deleted = deleteOne.filter(item => item._id !== id)
                setDelete(deleted)
            }
        })
    }

    console.log(loader)
    return (
        <div className=' grid grid-cols-1 md:grid-cols-3 gap-10 py-16 lg:px-28 px-6'>
            {deleteOne.map(data => {
                return <div className="card w-96 h-[500px] bg-base-100 shadow-xl">
                <figure><img src={data.photo} alt="Shoes" /></figure>
                <div className="card-body">
                  <h2 className="card-title">Name : {data.name}</h2>
                  <h2 className="card-title">Email : {data.email}</h2>
                  <div className="card-actions justify-end">
                    <Link to={`/users/${data._id}`}><button className="btn btn-primary">update</button></Link>
                 
                  
                    <button onClick={() =>handleRemove(data._id)} className="btn btn-warning">remove</button>
                  </div>
                </div>
              </div>
            })}
        </div>
    );
};

export default User;