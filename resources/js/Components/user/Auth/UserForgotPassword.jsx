import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';

export default class UserForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputs : {},
            errors : {}
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
                email : event.target.email.value
            }
    
            Axios.post('user/forgot-password', data)
                .then(response => {
                    alert('Silakan periksa email anda');
                })
                .catch(error => 
                    alert("Gagal dalam pengiriman email")
                )
        }
    }
    
    render () {
        return (
            <React.Fragment>
                <main className="col">
                    <div id="content">
                        <article>
                            <section >
                                <div className="d-flex justify-content-center">
                                    <div className="card mt-5">
                                        <div className="card-header">
                                            Forgot Password Pelanggan e-Ticketing Travel
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={this.handleSubmit}>
                                                <div className="form-group">
                                                    <label>Email</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        name="email" 
                                                        value={this.state.inputs["email"]} 
                                                        onChange={this.handleChange.bind(this, "email")}
                                                    />
                                                    <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                                                </div>

                                                <button type="submit" className="btn btn-info btn-sm">KIRIM</button>

                                                <Link to="/login" className="btn btn-warning btn-sm float-right">LOGIN</Link>
                                            </form>
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