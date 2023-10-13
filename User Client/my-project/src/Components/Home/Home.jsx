import React from 'react';

const Home = () => {

    const handleUser = (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const photo = e.target.userPhoto.value
        const email = e.target.email.value

        
        const user = {
            name,
            photo,
            email
        }

        console.log(user)

        fetch("http://localhost:5000/users",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.insertedId){
              alert("Data is added")
              e.target.reset()
            }
        })
    }
    return (
        <div className=' h-[90vh] justify-center items-center flex flex-col p-2'>
            <h2 className=' font-bold text-3xl '>User Information</h2>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleUser} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">User Name</span>
          </label>
          <input type="text" name='name' placeholder="username" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">User Photo</span>
          </label>
          <input type="text" name='userPhoto' placeholder="user-photo" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">User Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required />
        </div>
        
        <div className="form-control mt-6">
          <button type='submit' className="btn btn-primary">Add User</button>
        </div>
      </form>
    </div>
        </div>
    );
};

export default Home;