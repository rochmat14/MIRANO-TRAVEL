import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';

export default class extends Component{
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

        // validasi nama
        if (!inputs["nama"]) {

            formValidation = false;
            errors["nama"] = "Nama tidak boleh kosong";

        } else {

            errors["nama"] = "";

        }

        // validasi nomor telepon
        if (!inputs["nomor_telepon"]) {

            formValidation = false;
            errors["nomor_telepon"] = "Nomor telepon tidak boleh kosong";

        }   else if (!(inputs["nomor_telepon"].length >= 11 && inputs["nomor_telepon"].length <= 12)) {
                
            formValidation = false;
            errors["nomor_telepon"] = "Nomor telepon minimal harus 11 atau 12 angka";

        }   else {

            errors["nomor_telepon"] = "";

        }

        // validasi alamat
        if (!inputs["alamat"]) {

            formValidation = false;
            errors["alamat"] = "Alamat tidak boleh kosong";

        }  else {

            errors["alamat"] = "";

        }
        
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

    handleChange = (input, e) => {
        let inputs = this.state.inputs;
        inputs[input] = e.target.value;
        this.setState({ inputs });
    }
    
    handleSubmit = (event) => {
        event.preventDefault();

        if (this.handleValidation()) {
            const data = {
                nama         : event.target.nama.value,
                jenis_kelamin: event.target.jenis_kelamin.value,
                nomor_telepon: event.target.nomor_telepon.value,
                alamat       : event.target.alamat.value,
                email        : event.target.email.value,
                password     : event.target.password.value
            }
            
            Axios.post('admin/register', data)
                .then(response => {
                    console.log(response.data);

                    alert("Registrasi berhasil silakan login");
                })
                .catch(error => {
                    console.log(error);

                    alert("Registrasi tidak berhasil");
                })

            event.target.nama.value = ''
            event.target.jenis_kelamin.value = 'laki-laki'
            event.target.nomor_telepon.value = ''
            event.target.alamat.value = ''
            event.target.email.value = ''
            event.target.password.value = ''
        } else {
        }
    }
    
    toggleUserHeader = () => {
        
        this.setState(prevState => ({ toggleShowPassword: !prevState.toggleShowPassword }));
    };

    render () {
        const {toggleShowPassword} = this.state;

        return (
            <React.Fragment>
                <main className="col">
                    <div id="content">
                        <article>
                            <section >
                                <div className="d-flex justify-content-center">
                                    <div className="mt-5 card">
                                        <div className="card-header text-center bg-info text-light">Register Admin Mirano Travel</div>                        
                                        
                                        <div className="card-body">
                                            <form onSubmit={this.handleSubmit}>
                                                <div className="form-group">
                                                    <input type="text" name="nama" value={this.state.inputs["nama"]} onChange={this.handleChange.bind(this, "nama")} placeholder="Nama" className="form-control" />
                                                    <center><span style={{ color: "red" }}>{this.state.errors["nama"]}</span></center>
                                                </div>

                                                <div className="form-group">
                                                    <select name="jenis_kelamin" className="form-control">
                                                        <option value="laki-laki">Laki-Laki</option>
                                                        <option value="perempuan">Perempuan</option>
                                                    </select>
                                                </div>

                                                <div className="form-group">
                                                    <input type="text" name="nomor_telepon" value={this.state.inputs["nomor_telepon"]} onChange={this.handleChange.bind(this, "nomor_telepon")} placeholder="Nomor Telepon" className="form-control" />
                                                    <center><span style={{ color: "red" }}>{this.state.errors["nomor_telepon"]}</span></center>
                                                </div>

                                                <div className="form-group">
                                                    <input type="text" name="alamat" value={this.state.inputs["alamat"]} onChange={this.handleChange.bind(this, "alamat")} placeholder="Alamat" className="form-control" />
                                                    <center><span style={{ color: "red" }}>{this.state.errors["alamat"]}</span></center>
                                                </div>

                                                <div className="form-group">
                                                    <input type="text" name="email" value={this.state.inputs["email"]} onChange={this.handleChange.bind(this, "email")} placeholder="Email" className="form-control" />
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

                                                <button type="submit" className="btn btn-success btn-sm float-left"><i className="fa fa-save"></i> SIMPAN</button>
                                                
                                                <Link to="/admin/login" className="btn btn-warning btn-sm float-right"><i className="fas fa-sign-in-alt"></i> LOGIN</Link>
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