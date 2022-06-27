import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Axios from 'axios';

export default class UserLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputs : {},
            errors : {},
            toggleHeaderUserActive : false
        };
    }

    handleValidation = () => {
        let inputs = this.state.inputs;
        let errors = this.state.errors;
        let formValidation = true;

        // validasi email
        if (!inputs["email"]) {

            formValidation = false;
            errors["email"] = "Email tidak boleh kosong";

        }   else if (!inputs["email"].match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                
            formValidation = false;
            errors["email"] = "Bukan jenis email";

        }   else {

            errors["email"] = "";

        }

        // validasi password
        if (!inputs["password"]) {

            formValidation = false;
            errors["password"] = "password tidak boleh kosong";

        }  else {

            errors["password"] = "";

        }

        this.setState({ errors: errors });
        return formValidation;
    }

    handleChange(input, e) {
        let inputs = this.state.inputs;
        inputs[input] = e.target.value;
        this.setState({ inputs });
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        
        if(this.handleValidation()) {
            const dataUser = {
                email  : event.target.email.value,
                password : event.target.password.value
            }
    
            Axios.post('user/login', dataUser)
                .then(response => {
                    localStorage.setItem('token', response.data.token);

                    this.setState({
                        loggedIn_user:true
                    })

                })
                .catch(error => {
                    this.setState({
                        loggedIn_gagal:true
                    })
                })
        } else {
            this.setState({
                loggedIn_gagal:false
            })
        }
    }

    toggleUserHeader = () => {
        
        this.setState(prevState => ({ toggleHeaderUserActive: !prevState.toggleHeaderUserActive }));
    };
    
    render() {
        let loginGagal;
        
        if(this.state.loggedIn_user) {
            return <Redirect to={""}/>
        }

        if(this.state.loggedIn_gagal == true) {
            loginGagal = (
                <React.Fragment>
                    <center><span style={{ color: "red" }}>login gagal</span></center>
                </React.Fragment>
            )
        } else {
            loginGagal = (
                <React.Fragment>
                </React.Fragment>
            )
        }
        
        const {toggleHeaderUserActive} = this.state;
        return(
            <React.Fragment>
                <main className="col">
                    <div id="content">
                        <article>
                            <section >
                                <div className="d-flex justify-content-center">
                                    <div className="card mt-5">
                                        <div className="card-header">
                                            Login Pelanggan e-Ticketing Travel
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={this.handleSubmit}>
                                                <div className="form-group">
                                                    <label>Email</label>
                                                    <input 
                                                        type="text" 
                                                        name="email" 
                                                        value={this.state.inputs["email"]} 
                                                        onChange={this.handleChange.bind(this, "email")} 
                                                        className="form-control" 
                                                    />
                                                    <center><span style={{ color: "red" }}>{this.state.errors["email"]}</span></center>
                                                </div>

                                                <div className="form-group">
                                                    <label className="">Password</label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className='btn btn-danger' onClick={this.toggleUserHeader}>
                                                                <i className="fa fa-eye"></i>
                                                            </span>
                                                        </div>

                                                        <input
                                                            type={`${toggleHeaderUserActive ? "text" : "password"}`}                                                        className="form-control"
                                                            name="password"
                                                            value={this.state.inputs["password"]}
                                                            onChange={this.handleChange.bind(this, "password")}
                                                        />
                                                    </div>
                                                    <center><span style={{ color: "red" }}>{this.state.errors["password"]}</span></center>
                                                </div>

                                                <div className="form-group">
                                                    <button type="submit" className="btn btn-info btn-sm">LOGIN</button>

                                                    <Link to="/register" className="btn btn-warning btn-sm float-right">REGISTER</Link>
                                                </div>
                                            </form>
                                                {loginGagal}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </article>
                    </div>
                </main>
            </React.Fragment>
        )
    }
}