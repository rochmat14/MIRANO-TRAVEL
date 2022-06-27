import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';

import Loader from '../../loading/LoadingData';
import { AdminCreateSupir } from './AdminCreateSupir';
import { AdminUpdateSupir } from './AdminUpdateSupir';

export default class ReadSupir extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            supirs: [],
            addModalShow: false,
            editModalShow: false
        }
    }

    componentDidMount() {
        this.getSupirs();
    }

    componentDidUpdate() {
        this.getSupirs();
    }



    dataSupirs() {
        this.setState({
            supirs: [
                { "nama": "ujang", "nomor_sim": 1212345, "nomor_telepon": "0812-6161-781" },
                { "nama": "maman", "nomor_sim": 9090876, "nomor_telepon": "0838-4479-8871" }
            ]
        });
    }

    getSupirs() {
        Axios.get('admin/supir')
            .then(response => {
                // this.setState({
                //     supirs : response.data
                // })
                const supirs = response.data;
                this.setState({ supirs, loading: false })
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteSupir(id, event) {
        if (window.confirm("Apakah anda yakin untuk menghapus ?")) {
            Axios.delete(`admin/supir-delete/${id}`)
                .then(response => { })
                .catch(error => console.log(error));
        }
    }

    render() {
        if (!localStorage.getItem('token_admin')) {
            return <Redirect to="/admin/login" />
        }

        const { supirs, id, nama, nomorsim, nomortelepon, alamat } = this.state;

        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });

        return (
            <React.Fragment>
                <main className="col">
                    <div id="content">
                        <article>
                            <section >
                                <div className="container-fluid">
                                    <h1>Data Supir</h1>

                                    {this.state.loading ? <Loader /> :
                                        <React.Fragment>

                                            <table className="mt-4 table border table-striped table-web-admin">
                                                <thead>
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Nama</th>
                                                        <th>Nomor SIM</th>
                                                        <th>Nomor Telepon</th>
                                                        <th>Alamat</th>
                                                        <th>
                                                            <Button
                                                                variant='info'
                                                                onClick={() => this.setState({ addModalShow: true })}
                                                            >Tambah Supir</Button>
                                                        </th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {supirs.map((supir, i) =>
                                                        <tr key={supir.id}>
                                                            <td>{i + 1}</td>
                                                            <td>{supir.nama.toUpperCase()}</td>
                                                            <td>{supir.nomor_sim}</td>
                                                            <td>{supir.nomor_telepon}</td>
                                                            <td>{supir.alamat.toUpperCase()}</td>
                                                            <td>
                                                                <button
                                                                    className='btn btn-warning btn-sm float-left'
                                                                    onClick={() => this.setState({
                                                                        editModalShow: true,
                                                                        id: supir.id,
                                                                        nama: supir.nama,
                                                                        nomorsim: supir.nomor_sim,
                                                                        nomortelepon: supir.nomor_telepon,
                                                                        alamat: supir.alamat
                                                                    })}
                                                                >edit</button>

                                                                <button className="btn btn-danger btn-sm ml-3" onClick={(event) => this.deleteSupir(supir.id, event)}>Hapus</button>

                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>

                                            <div className="table-android-admin mt-4">
                                                <Button
                                                    variant='info btn-block'
                                                    onClick={() => this.setState({ addModalShow: true })}
                                                >Tambah Supir</Button>

                                                {supirs.map((supir, i) =>
                                                    <div key={i} className="card mt-4">
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <center><label className="font-weight-bold">Nama</label></center>
                                                                        <center><p>{supir.nama.toUpperCase()} </p></center>
                                                                    </div>

                                                                    <div className="form-group">
                                                                        <center><label className="font-weight-bold">Nomor Sim</label></center>
                                                                        <center><p>{supir.nomor_sim}</p></center>
                                                                    </div>
                                                                </div>

                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <center><label className="font-weight-bold">Nomor Telepon</label></center>
                                                                        <center><p>{supir.nomor_telepon}</p></center>
                                                                    </div>

                                                                    <div className="form-group">
                                                                        <center><label className='font-weight-bold'>Alamat</label></center>
                                                                        <center><p>{supir.alamat.toUpperCase()}</p></center>
                                                                    </div>
                                                                </div>

                                                                <div className="col-sm-12">
                                                                        <button
                                                                            className='btn btn-warning btn-sm'
                                                                            onClick={() => this.setState({
                                                                                editModalShow: true,
                                                                                id: supir.id,
                                                                                nama: supir.nama,
                                                                                nomorsim: supir.nomor_sim,
                                                                                nomortelepon: supir.nomor_telepon,
                                                                                alamat: supir.alamat
                                                                            })}
                                                                        >edit</button>

                                                                    <button className="btn btn-danger btn-sm float-right" onClick={(event) => this.deleteSupir(supir.id, event)}>Hapus</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </React.Fragment>
                                    }

                                    <AdminCreateSupir
                                        show={this.state.addModalShow}
                                        onHide={addModalClose}
                                    />

                                    <AdminUpdateSupir
                                        show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        post_id={id}
                                        post_nama={nama}
                                        post_nomorsim={nomorsim}
                                        post_nomortelepon={nomortelepon}
                                        post_alamat={alamat}
                                    />
                                </div>
                            </section>
                        </article>
                    </div>
                </main>
            </React.Fragment>
        )
    }
}