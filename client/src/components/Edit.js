import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import Alerts from './Alerts';


export default function Edit() {

    const history = useHistory();
    let { slug } = useParams();
    let all = JSON.parse(localStorage.getItem('userinfo'))
    let olddata1 = all.filter(check => check.id === slug)

    if (olddata1.length <= 0) {
        history.push('/');

    }




    const [userdata, setUserdata] = useState(olddata1[0]);

    const [alert, setAlert] = useState(null);

    const changeHandle = (e) => {
        setUserdata(prevuserdata => [{ ...prevuserdata, [e.target.name]: e.target.value }]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // if(userdata.acept === 'off' || userdata.email === '' ||  userdata.password === '' || userdata.address === '' || userdata.address2 === '' || userdata.city === '' ){
        //     setAlert({ type : "danger" , msg : "All Filed Required !"})
        //     return false;
        // }

        setAlert(null);
        
        let filtercurrent = all.map((check, index) => {
            if (check.id === slug) {
                return all[index] = check[index]; 
            }
        })


        console.log(filtercurrent);

        // let userinfo = JSON.stringify([...current]);
        // localStorage.setItem('userinfo', userinfo);
        // history.push('/');
    }


    return (

        <div className="container mt-5">

            <Alerts alert={alert} />
            <h2 className="text-center mt-1 mb-4">Insert Data</h2>
            <h5 className="text-left"><Link to="/"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z" />
            </svg>  Home</Link></h5>
            <hr />
            {
                olddata1.length > 0 &&

                <form onSubmit={handleSubmit}>
                    <div className="form-row">

                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Email</label>
                            <input type="email" name="email" className="form-control" id="inputEmail4" placeholder="Email" onChange={changeHandle} value={userdata.email} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Password</label>
                            <input type="password" name="password" className="form-control" id="inputPassword4" placeholder="Password" onChange={changeHandle} value={userdata.password} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Address</label>
                        <input type="text" className="form-control" name="address" id="inputAddress" placeholder="1234 Main St" onChange={changeHandle} value={userdata.address} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress2">Address 2</label>
                        <input type="text" className="form-control" name="address2" id="inputAddress2" placeholder="Apartment, studio, or floor" onChange={changeHandle} value={userdata.address2} />
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputCity">City</label>
                            <input type="text" name="city" className="form-control" id="inputCity" onChange={changeHandle} value={userdata.city} />
                        </div>


                    </div>
                    <div className="form-group">
                        <div className="form-check">
                            <input className="form-check-input" name="acept" onChange={changeHandle} type="checkbox" id="gridCheck" />
                            <label className="form-check-label" htmlFor="gridCheck">
                                Acept Term And Conditions
                            </label>
                        </div>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Submit" />
                </form>
            }
        </div>

    )

}
