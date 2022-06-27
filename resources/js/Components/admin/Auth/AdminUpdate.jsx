import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';

import Loader from '../../loading/LoadingData';

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            admin: [],
            errors : {}
        }
    }

    handleValidation = () => {
        let admin = this.state.admin;
        let errors = this.state.errors;
        let formValidation = true;

        // // validasi nama
        if (!admin["nama"]) {

            formValidation = false;
            errors["nama"] = "Nama tidak boleh kosong";

        }  else {

            errors["nama"] = "";

        }

        // validasi nomor telepon
        if (!admin["nomor_telepon"]) {

            formValidation = false;
            errors["nomor_telepon"] = "Nomor telepon tidak boleh kosong";

        }   else if (!(admin["nomor_telepon"].length >= 11 && admin["nomor_telepon"].length <= 12)) {
                
            formValidation = false;
            errors["nomor_telepon"] = "Nomor telepon minimal harus 11 atau 12 angka";

        }   else {

            errors["nomor_telepon"] = "";

        }

        // validasi alamat
        if (!admin["alamat"]) {

            formValidation = false;
            errors["alamat"] = "Alamat tidak boleh kosong";

        }   else {

            errors["alamat"] = "";

        }

        // validasi email
        if (!admin["email"]) {

            formValidation = false;
            errors["email"] = "Email tidak boleh kosong";

        }   else if (!admin["email"].match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                
            formValidation = false;
            errors["email"] = "Bukan jenis email";

        }   else {

            errors["email"] = "";

        }

        this.setState({ errors: errors });
        return formValidation;
    }

    handleChange(input, e) {
        let admin = this.state.admin;
        admin[input] = e.target.value;
        this.setState({ admin });
    }

    componentDidMount() {
        this.getDataAdmin();
    }  

    getDataAdmin() {
        
        if(!localStorage.getItem('token_admin')) {
            console.log("belum login");
        } else {
            const config = {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token_admin')
                }
            };
            
            Axios.get('admin', config)
                .then((res) => {
                    // this.setState({
                    //     admin: res.data
                    // });
                    const admin = res.data;
                    this.setState({ admin, loading: false })
                },
                err => {
                    console.log(err)
                }
            )
        }
    }

    handleSumbit = (event) => {
        event.preventDefault();

        if(this.handleValidation()){
            const data = {
                id : event.target.id.value,
                nama : event.target.nama.value,
                jenis_kelamin : event.target.jenis_kelamin.value,
                nomor_telepon : event.target.nomor_telepon.value,
                alamat : event.target.alamat.value,
                email : event.target.email.value,
                password : event.target.password.value
            }
    
            Axios.post('admin/update', data)
                .then(response => {
                    console.log(response.data);

                    alert("Data user berhasil di ubah");

                    window.location.reload();
                })
                .catch(error => {
                    console.log(error);

                    alert("Data user gagal di ubah");
                })
        }else{
        }
    }
    
    render() {
        if(!localStorage.getItem('token_admin')) {
            return <Redirect to="/admin/login" />
        }

        return(
            <React.Fragment>
                <main className="col">
                    <div id="content">
                        <article>
                            <section >
                                <div className="d-flex justify-content-center">
                                    {this.state.loading ? <Loader /> : 
                                        <React.Fragment>

                                            <div className="card mt-3">
                                                <div className="card-header">
                                                    Update Akun Admin
                                                </div>

                                                <div className="card-body">
                                                    <form onSubmit={this.handleSumbit}>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <input type="hidden" name="id" defaultValue={this.state.admin.id} />
                                                                <div className="form-group">
                                                                    <label htmlFor="nama">Nama :</label>
                                                                    <input type="text" id="nama" name="nama" defaultValue={this.state.admin["nama"]} onChange={this.handleChange.bind(this, "nama")} className="form-control" />
                                                                    <span style={{ color: "red" }}>{this.state.errors["nama"]}</span>
                                                                </div>
                                                            </div>

                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="jenis_kelamin">Jenis Kelamin :</label>
                                                                    <select name="jenis_kelamin" id="jenis_kelamin" className="form-control">
                                                                        <option value="laki-laki" selected={this.state.admin.jenis_kelamin == "laki-laki"}>laki-laki</option>
                                                                        <option value="perempuan" selected={this.state.admin.jenis_kelamin == "perempuan"}>perempuan</option>
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="nomor_telepon">Nomor Telepon :</label>
                                                                    <input type="text" id="nomor_telepon" name="nomor_telepon" defaultValue={this.state.admin["nomor_telepon"]} onChange={this.handleChange.bind(this, "nomor_telepon")} className="form-control" />
                                                                    <span style={{ color: "red" }}>{this.state.errors["nomor_telepon"]}</span>
                                                                </div>
                                                            </div>

                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="alamat">Alamat :</label>
                                                                    <input type="text" id="alamat" name="alamat" defaultValue={this.state.admin["alamat"]} onChange={this.handleChange.bind(this, "alamat")} className="form-control" />
                                                                    <span style={{ color: "red" }}>{this.state.errors["alamat"]}</span>
                                                                </div>
                                                            </div>

                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="email">Email :</label>
                                                                    <input type="text" id="email" name="email"  defaultValue={this.state.admin["email"]} onChange={this.handleChange.bind(this, "email")} className="form-control" />
                                                                    <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                                                                </div>
                                                            </div>

                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="password">Password : </label>
                                                                    <label className="text-danger">Jika Password Tidak Diuban Kosongkan</label>
                                                                    <input type="text" id="password" name="password" className="form-control" />
                                                                </div>
                                                            </div>

                                                            <div className="col-sm-12">
                                                                <div className="form-group">
                                                                    <button type="submit" className="btn btn-success btn-sm">UBAH</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    }
                                </div>
                            </section>
                        </article>
                    </div>
                </main>
            </React.Fragment>
        )
    }
}