import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';

export default class UserRegister extends Component{
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

        if (!inputs['nama']) {
            formValidation = false;
            errors["nama"] = "Nama tidak boleh kosong";

        }  else {
            errors["nama"] = "";
        }
        
        if(!inputs['jenis_kelamin']) {
            formValidation = false;
            errors["jenis_kelamin"] = "Jenis Kelamin harus di pilih tidak boleh kosong";

        } else {
            errors["jenis_kelamin"] = "";
        }
        
        if(!inputs['nomor_telepon']) {
            formValidation = false;
            errors["nomor_telepon"] = "Nomor telepon tidak boleh kosong";

        } else if(!(inputs['nomor_telepon'].length >= 11 && inputs['nomor_telepon'].length <= 12)) {
            formValidation = false;
            errors["nomor_telepon"] = "Nomor telepon harus 11 atau 12";

        }  else {
            errors["nomor_telepon"] = "";
        }
        
        if(!inputs['alamat']) {
            formValidation = false;
            errors["alamat"] = "Alamat tidak boleh kosong";

        } else {
            errors["alamat"] = "";
            
        }

        if (!inputs["email"]) {

            formValidation = false;
            errors["email"] = "Email tidak boleh kosong";

        }   else if (!inputs["email"].match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                
            formValidation = false;
            errors["email"] = "Bukan jenis email";

        }   else {

            errors["email"] = "";

        }

        if(!inputs['password']) {
            formValidation = false;
            errors["password"] = "Password tidak boleh kosong";

        } else {
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

        let inputs = this.state.inputs;
        
        if(this.handleValidation()) {
            const data = {
                nama: event.target.nama.value,
                jenis_kelamin: event.target.jenis_kelamin.value,
                nomor_telepon: event.target.nomor_telepon.value,
                alamat: event.target.alamat.value,
                email: event.target.email.value,
                password: event.target.password.value,
            }
    
            Axios.post('user/register', data)
            .then(response => {
                console.log(response.data);

                alert("Registrasi berhasil silakan login");
            })
            .catch(error => {
                alert("Registrasi tidak berhasil");
            })
    
            inputs['nama'] = '';
            inputs['jenis_kelamin'] = '';
            inputs['nomor_telepon'] = '';
            inputs['alamat'] = '';
            inputs['email'] = '';
            inputs['password'] = '';
        }
        
    } 

    toggleUserHeader = () => {
        
        this.setState(prevState => ({ toggleShowPassword: !prevState.toggleShowPassword }));
    };
    
    render() {
        const {toggleShowPassword} = this.state;

        return(
            <React.Fragment>
                <main className="col">
                    <div id="content">
                        <article>
                            <section >
                                <div className="d-flex justify-content-center">
                                    <div className="card mt-5">
                                        <div className="card-header">
                                            Register Pelanggan e-Ticketing Travel
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={this.handleSubmit}>
                                                <div className="form-group">
                                                    <label>Nama</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        name="nama"  
                                                        value={this.state.inputs["nama"]} 
                                                        onChange={this.handleChange.bind(this, "nama")}
                                                    />
                                                    <span style={{ color: "red" }}>{this.state.errors["nama"]}</span>
                                                </div>

                                                <div className="form-group">
                                                    <label>Jenis Kelamin</label>
                                                    <select 
                                                        name="jenis_kelamin" 
                                                        className="form-control"
                                                        value={this.state.inputs["jenis_kelamin"]} 
                                                        onChange={this.handleChange.bind(this, "jenis_kelamin")}
                                                    >
                                                        <option value="">Jenis Kelamin</option>
                                                        <option value="laki-laki">Laki-Laki</option>
                                                        <option value="perempuan">Perempuan</option>
                                                    </select>
                                                    <span style={{ color: "red" }}>{this.state.errors["jenis_kelamin"]}</span>
                                                </div>

                                                <div className="form-group">
                                                    <label>Nomor Telepon</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control"    
                                                        name="nomor_telepon"
                                                        value={this.state.inputs["nomor_telepon"]} 
                                                        onChange={this.handleChange.bind(this, "nomor_telepon")}
                                                    />
                                                    <span style={{ color: "red" }}>{this.state.errors["nomor_telepon"]}</span>
                                                </div>

                                                <div className="form-group">
                                                    <label>Alamat</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control"    
                                                        name="alamat" 
                                                        value={this.state.inputs["alamat"]} 
                                                        onChange={this.handleChange.bind(this, "alamat")}
                                                    />
                                                    <span style={{ color: "red" }}>{this.state.errors["alamat"]}</span>
                                                </div>
                                                
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

                                                <div className="form-group">
                                                    <label className="">Password</label>
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
                                                            onChange={this.handleChange.bind(this, "password")}
                                                        />
                                                    </div>
                                                    <center><span style={{ color: "red" }}>{this.state.errors["password"]}</span></center>
                                                </div>

                                                <button type="submit" className="btn btn-info btn-sm">SIMPAN</button>

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