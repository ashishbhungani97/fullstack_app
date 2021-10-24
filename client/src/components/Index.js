import React, { useEffect, useState }  from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';


export default function Index(props) {
    let history = useHistory();
    const [userinfo, setuserinfo] = useState([]);
    const [lastupdate,setlastupdate] = useState(new Date());

    useEffect(() => {
        axios.get('http://localhost:3001/api/user/getusers').catch((error)=>{

        }).then((result)=>{
            if (result.data.error === 'OK') {
                setuserinfo(JSON.parse(result.data.users))
            }
            else{
                setuserinfo(false);
            }
        });
        
        
    }, [lastupdate])
   

    const handledelete = (email) =>{
        axios.post('http://localhost:3001/api/user/deleteuser',{email}).catch((error)=>{

        }).then((result)=>{
            if (result.data.error === 'OK') {
                setlastupdate(new Date());
            }
            else{
                setuserinfo(false);
            }
        });
    }
    

    const handleupdate = (id) => {
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

                        userinfo && userinfo.map((value, index) => {

                            return (
                                <tr key={value._id}>
                                    <td>{index + 1}</td>
                                    <td>{value.name}</td>
                                    <td>{value.email}</td>
                                    <td>{value.address + value.address2}</td>
                                    <td>{value.city}</td>
                                    <td>
                                        <button onClick={() => handleupdate(value._id)}>Edit</button>
                                        <button onClick={() => handledelete(value.email)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>

        </div>
    )
}
