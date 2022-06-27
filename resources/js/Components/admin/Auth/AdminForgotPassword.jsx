import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';

export default class extends Component {
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

    handleChange = (input, e) => {
        let inputs = this.state.inputs;
        inputs[input] = e.target.value;
        this.setState({ inputs });
    }
    
    handleSubmit = (event) => {
        event.preventDefault();

        if (this.handleValidation()) {
            const data = {
                email : event.target.email.value,
            }

            Axios.post('admin/forgot-password', data)
                .then(response => {
                    console.log(response.data);

                    this.setState({
                        emailBenar : true
                    })
                })
                .catch(error => {
                    console.log("salah");

                    this.setState({
                        emailSalah : true
                    })
                })
        } else {
            alert("Email kosong");
        }
    }
    
    render () {
        let emailSalah;

        if(this.state.emailBenar){
            emailSalah = (
                <React.Fragment>
                    <center><span className='text-danger'>Password baru dikirim</span></center>
                </React.Fragment>
            )
        }

        if(this.state.emailSalah) {
            emailSalah = (
                <React.Fragment>
                    <center><span className='text-danger'>Email Tidak Ditemukan</span></center>
                </React.Fragment>
            )
        }
        
        return (
            <React.Fragment>
                <main className="col">
                    <div id="content">
                        <article>
                            <section >
                                <div className="d-flex justify-content-center">
                                    <div className="card mt-5">
                                        <div className="card-header text-center bg-info text-light">
                                            Forgot Password <br/> Admin Mirano Travel
                                        </div>
                                    
                                        <div className="card-body">
                                            <form onSubmit={this.handleSubmit}>
                                                <div className="form-group">
                                                    <input type="text" name="email" value={this.state.inputs["email"]} onChange={this.handleChange.bind(this, "email")} placeholder="Email" className="form-control" />
                                                    <center><span style={{ color: "red" }}>{this.state.errors["email"]}</span></center>
                                                </div>
                                                
                                                <button type="submit" className="btn btn-info btn-sm">KIRIM</button>

                                                <Link to="/admin/login" className="btn btn-warning btn-sm btn float-right">LOGIN</Link>
                                            </form>
                                        </div>

                                        {emailSalah}
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