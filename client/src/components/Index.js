import React  from 'react'
import { Link , useHistory } from 'react-router-dom'


export default function Index(props) {

    let userinfo = JSON.parse(localStorage.getItem('userinfo'));
    let history = useHistory();

    const handleupdate = (id) =>{
       history.push(`/edit/${id}`);
    }
    
    return (
        <div className="container">
            <h4 className="text-center mt-5 mb-5">All Data</h4>
            <h5 className="text-right mt-5 mb-5"><Link to="/insert">Insert Data</Link></h5>
            <hr />

            <table className="table table-bordered mt-3">
                <thead>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">City</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {

                       userinfo &&  userinfo.map((value , index) => {
                            
                            return (
                            <tr key={value.id}>
                                <th>{index + 1}</th>
                                <td>{value.name}</td>
                                <td>{value.email}</td>
                                <td>{value.address + value.address2}</td>
                                <td>{value.city}</td>
                                <td><button onClick={() => handleupdate(value.id)}>Edit</button></td>
                            </tr>
                            )
                        })
                    }

                </tbody>
            </table>

        </div>
    )
}
