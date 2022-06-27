import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs : {},
            errors : {},
            toggleShowPassword : false
        }
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
            const data = {
                email : event.target.email.value,
                password : event.target.password.value
            }
    
            Axios.post('admin/login', data)
                .then(response => {
                    localStorage.setItem('token_admin', response.data.token);
    
                    this.setState({
                        loggedIn_admin:true
                    })
    
                    this.props.setAdmin(response.data.admin);
                })
                .catch(error => {
                    this.setState({
                        loggedIn_gagal:true
                    })
                });
        }else{
            // this.setState({
            //     loggedIn_gagal:false
            // })
        }
    }

    toggleUserHeader = () => {
        
        this.setState(prevState => ({ toggleShowPassword: !prevState.toggleShowPassword }));
    };

    render () {
        let alertLogin;


        if(this.state.loggedIn_admin) {
            alertLogin = (
                <React.Fragment>
                </React.Fragment>
            )

            return <Redirect to={'/admin'} />;
        }else if(this.state.loggedIn_gagal) {
            alertLogin = (
                <React.Fragment>
                    <center><span style={{ color: "red" }}>login gagal</span></center>
                </React.Fragment>
            )
        }

        const {toggleShowPassword} = this.state;

        return (
            <React.Fragment>
                <main className="col">
                    <div id="content">
                        <article>
                            <section >
                                <form onSubmit={this.handleSubmit}>
                                    <div className="d-flex justify-content-center">
                                        <div className="card mt-5 ">
                                            <div className="card-header text-center bg-info text-light">
                                                Login Admin Mirano Travel
                                            </div>
                                        
                                            <div className="card-body">
                                                    <div className="form-group">
                                                        <input 
                                                            type="text" 
                                                            name="email"    
                                                            value={this.state.inputs["email"]} 
                                                            onChange={this.handleChange.bind(this, "email")} 
                                                            className="form-control" 
                                                            placeholder="email" 
                                                        /> 
                                                        <center><span style={{ color: "red" }}>{this.state.errors["email"]}</span></center>
                                                    </div>
                                                    
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className='btn btn-danger' onClick={this.toggleUserHeader}>
                                                                    <i className="fa fa-eye"></i>
                                                                </span>
                                                            </div>

                                                            <input
                                                                type={`${toggleShowPassword ? "text" : "password"}`}                                                        className="form-control"
                                                                name="password"
                                                                value={this.state.inputs["password"]}
                                                                placeholder="password"
                                                                onChange={this.handleChange.bind(this, "password")}
                                                            />
                                                        </div>
                                                        <center><span style={{ color: "red" }}>{this.state.errors["password"]}</span></center>
                                                    </div>
                                                
                                                    <div className="form-group">
                                                        <button type="submit" className="btn btn-info btn-sm">Login</button>

                                                        <Link to="/admin/register" className="btn btn-warning btn-sm btn float-right">REGISTER</Link>
                                                    </div>
                                                {alertLogin}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </section>
                        </article>
                    </div>
                </main>
            </React.Fragment>
        )
    }
}