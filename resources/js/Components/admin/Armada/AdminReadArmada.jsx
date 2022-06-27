import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';

import Loader from '../../loading/LoadingData';
import { AdminCreateArmada } from './AdminCreateArmada';
import { AdminUpdateArmada } from './AdminUpdateArmada';

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            armadas: [],
            addModalShow: false,
            editModalShow: false
        }
    }

    componentDidMount() {
        this.getArmadas();
    }

    componentDidUpdate() {
        this.getArmadas();
    }

    getArmadas() {
        Axios.get('admin/armada')
            .then(response => {
                // this.setState({
                //     armadas : response.data
                // })
                const armadas = response.data;
                this.setState({ armadas, loading: false })
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteArmada(id, event) {
        if (window.confirm("Apakah anda yakin untuk menghapus ?")) {
            Axios.delete(`admin/armada-delete/${id}`)
                .then(response => { })
                .catch(error => console.log(error));
        }
    }

    render() {
        if (!localStorage.getItem('token_admin')) {
            return <Redirect to="/admin/login" />
        }

        const { armadas, id, nomorpolisi, jenis, jumlahkursi } = this.state;

        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });

        return (
            <React.Fragment>
                <main className="col">
                    <div id="content">
                        <article>
                            <section >
                                <div className="container-fluid">
                                    <h1>Data Armada</h1>

                                    {this.state.loading ? <Loader /> :
                                        <React.Fragment>
                                            <table className="mt-4 table border table-striped table-web-admin">
                                                <thead>
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Nomor Polisi</th>
                                                        <th>Jenis</th>
                                                        <th>Jumlah Kursi</th>
                                                        <th>
                                                            <Button
                                                                variant='info'
                                                                onClick={() => this.setState({ addModalShow: true })}
                                                            >Tambah Armada</Button>
                                                        </th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {armadas.map((armada, i) =>
                                                        <tr key={armada.id}>
                                                            <td>{i + 1}</td>
                                                            <td>{armada.nomor_polisi.toUpperCase()}</td>
                                                            <td>{armada.jenis.toUpperCase()}</td>
                                                            <td>{armada.jumlah_kursi}</td>
                                                            <td>
                                                                <div className="row">
                                                                    <div className="col-sm-3">
                                                                        <Button
                                                                            variant='warning btn-sm'
                                                                            onClick={() => this.setState({ editModalShow: true, id: armada.id, nomorpolisi: armada.nomor_polisi, jenis: armada.jenis, jumlahkursi: armada.jumlah_kursi })}
                                                                        >Edit</Button>
                                                                    </div>

                                                                    <div className="col-sm-3">
                                                                        <button className="btn btn-danger btn-sm" onClick={(event) => this.deleteArmada(armada.id, event)}>Hapus</button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>

                                            <div className="table-android-admin mt-4">
                                                    <Button
                                                        variant='info btn-block'
                                                        onClick={() => this.setState({ addModalShow: true })}
                                                    >Tambah Armada</Button>

                                                {armadas.map((armada, i) =>
                                                    <div key={i} className="card mt-4">
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <center><label className="font-weight-bold">Nomor Polisi</label></center>
                                                                        <center><p>{armada.nomor_polisi.toUpperCase()}</p></center>
                                                                    </div>
                                                                </div>

                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <center><label className="font-weight-bold">Jenis</label></center>
                                                                        <center><p>{armada.jenis.toUpperCase()}</p></center>
                                                                    </div>
                                                                </div>

                                                                <div className="col-sm-12">
                                                                    <div className="form-group">
                                                                        <center><label className='font-weight-bold'>Jumlah Kursi</label></center>
                                                                        <center><p>{armada.jumlah_kursi}</p></center>
                                                                    </div>
                                                                </div>

                                                                <div className="col-sm-12">
                                                                    <div className="form-group">
                                                                        <Button
                                                                            variant='warning'
                                                                            onClick={() => this.setState({ editModalShow: true, id: armada.id, nomorpolisi: armada.nomor_polisi, jenis: armada.jenis, jumlahkursi: armada.jumlah_kursi })}
                                                                        >Edit</Button>

                                                                        <button className="btn btn-danger float-right" onClick={(event) => this.deleteArmada(armada.id, event)}>Hapus</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </React.Fragment>
                                    }

                                    <AdminCreateArmada
                                        show={this.state.addModalShow}
                                        onHide={addModalClose}
                                    />

                                    <AdminUpdateArmada
                                        show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        post_id={id}
                                        post_nomorpolisi={nomorpolisi}
                                        post_jenis={jenis}
                                        post_jumlahkursi={jumlahkursi}
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