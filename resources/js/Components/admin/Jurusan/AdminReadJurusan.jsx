import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';

import Loader from '../../loading/LoadingData';
import { AdminCreateJurusan } from './AdminCreateJurusan';
import { AdminUpdateJurusan } from './AdminUpdateJurusan';

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            jurusans: [],
            addModalShow: false,
            editModalShow: false
        }
    }

    componentDidMount() {
        this.getJurusan();
    }

    componentDidUpdate() {
        this.getJurusan();
    }

    getJurusan() {
        Axios.get('admin/jurusan')
            .then(response => {
                // this.setState({
                //     jurusans : response.data
                // })
                const jurusans = response.data;
                this.setState({ jurusans, loading: false })
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteArmada(id, event) {
        if (window.confirm("Apakah anda yakin untuk menghapus ?")) {
            Axios.delete(`admin/jurusan-delete/${id}`)
                .then(response => { })
                .catch(error => console.log(error));
        }
    }

    render() {
        if (!localStorage.getItem('token_admin')) {
            return <Redirect to="/admin/login" />
        }

        const { jurusans, id, keberangkatan, tujuan, waktu } = this.state;

        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });

        return (
            <React.Fragment>
                <main className="col">
                    <div id="content">
                        <article>
                            <section >
                                <div className="container-fluid">
                                    <h1>Data Jurusan</h1>

                                    {this.state.loading ? <Loader /> :
                                        <React.Fragment>
                                            <table className="mt-4 table border table-striped table-web-admin">
                                                <thead>
                                                    <tr>
                                                        <th>NO</th>
                                                        <th>KEBERANGKATAN</th>
                                                        <th>TUJUAN</th>
                                                        <th>WAKTU</th>
                                                        <th>
                                                            <button
                                                                className='btn btn-info btn-sm'
                                                                onClick={() => this.setState({ addModalShow: true })}
                                                            >Tambah Jurusan</button>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {jurusans.map((jurusan, i) =>
                                                        <tr key={jurusan.id}>
                                                            <td>{i + 1}</td>
                                                            <td>{jurusan.keberangkatan.toUpperCase()}</td>
                                                            <td>{jurusan.tujuan.toUpperCase()}</td>
                                                            <td>{("pukul " + jurusan.waktu).toUpperCase()}</td>
                                                            <td>
                                                                <button
                                                                    className='btn btn-warning btn-sm mr-3'
                                                                    onClick={() => this.setState({
                                                                        editModalShow: true,
                                                                        id: jurusan.id,
                                                                        keberangkatan: jurusan.keberangkatan,
                                                                        tujuan: jurusan.tujuan,
                                                                        waktu: jurusan.waktu
                                                                    })}
                                                                >Ubah</button>

                                                                <button className="btn btn-danger btn-sm" onClick={(event) => this.deleteArmada(jurusan.id, event)}>Hapus</button>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>

                                            <div className="table-android-admin mt-4">
                                                <button
                                                    className='btn btn-info btn-block'
                                                    onClick={() => this.setState({ addModalShow: true })}
                                                >Tambah Jurusan</button>

                                                {jurusans.map((jurusan, i) =>
                                                    <div key={i} className="card mt-4">
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <center><label className='font-weight-bold'>Keberangkatan</label></center>
                                                                        <center><p>{jurusan.keberangkatan.toUpperCase()}</p></center>
                                                                    </div>
                                                                </div>

                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <center><label className='font-weight-bold'>Tujuan</label></center>
                                                                        <center><p>{jurusan.tujuan.toUpperCase()}</p></center>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-12">
                                                                    <div className="form-group">
                                                                        <center><label className='font-weight-bold'>Waktu</label></center>
                                                                        <center><p>{("pukul " + jurusan.waktu).toUpperCase()}</p></center>
                                                                    </div>
                                                                </div>

                                                                <div className="col-sm-12">
                                                                    <button
                                                                        className='btn btn-warning'
                                                                        onClick={() => this.setState({
                                                                            editModalShow: true,
                                                                            id: jurusan.id,
                                                                            keberangkatan: jurusan.keberangkatan,
                                                                            tujuan: jurusan.tujuan,
                                                                            waktu: jurusan.waktu
                                                                        })}
                                                                    >Ubah</button>

                                                                    <button className="btn btn-danger float-right" onClick={(event) => this.deleteArmada(jurusan.id, event)}>Hapus</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </React.Fragment>
                                    }

                                    <AdminCreateJurusan
                                        show={this.state.addModalShow}
                                        onHide={addModalClose}
                                    />

                                    <AdminUpdateJurusan
                                        show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        post_id={id}
                                        post_keberangkatan={keberangkatan}
                                        post_tujuan={tujuan}
                                        post_waktu={waktu}
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