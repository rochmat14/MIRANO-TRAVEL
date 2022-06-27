import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';


// librari moment js
import moment from 'moment';
// agar moment js bahasa indonesia
import 'moment/locale/id';

import Loader from '../../loading/LoadingData';
import AdminCreateJadwal from './AdminCreateJadwal';
import AdminUpdateJadwal from './AdminUpdateJadwal';

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            jadwals: [],
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
        Axios.get('admin/jadwal')
            .then(response => {
                const jadwals = response.data;
                this.setState({ jadwals, loading: false })
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteJadwal(id, event) {
        if (window.confirm("Apakah anda yakin untuk menghapus ?")) {
            Axios.delete(`admin/jadwal-delete/${id}`)
                .then(response => {
                })
                .catch(error => console.log(error));
        }
    }

    tanggalIndonesia(string) {
        let bulanIndo = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

        let tanggal = string.split("-")[2];
        let bulan = string.split("-")[1];
        let tahun = string.split("-")[0];

        return tanggal + " " + bulanIndo[Math.abs(bulan)] + " " + tahun;
    }

    formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(money);
    }

    render() {
        if (!localStorage.getItem('token_admin')) {
            return <Redirect to="/admin/login" />
        }

        const { jadwals, id, jadwalid, tanggalberangkat, armadaid, jenis, tujuan, nama, hargatiket } = this.state;

        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });

        return (
            <React.Fragment>
                <main className="col">
                    <div id="content">
                        <article>
                            <section >
                                <div className="container-fluid">
                                    <h1>Data Jadwal</h1>

                                    {this.state.loading ? <Loader /> :
                                        <React.Fragment>
                                            <div className="mt-4">
                                                <button
                                                    className='btn btn-info btn-block'
                                                    onClick={() => this.setState({ addModalShow: true })}
                                                >Tambah Jadwal</button>

                                                {jadwals.map((jadwal, i) =>
                                                    <div key={i} className="card mt-4">
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col-sm-3">
                                                                    <div className="form-group">
                                                                        <center><label className='font-weight-bold'>Tanggal Berangkat</label></center>
                                                                        <center><p>{moment(jadwal.tanggal_berangkat).format('DD MMMM YYYY')}</p></center>
                                                                    </div>
                                                                </div>

                                                                <div className="col-sm-3">
                                                                    <div className="form-group">
                                                                        <center><label className='font-weight-bold'>Jenis Armada</label></center>
                                                                        <center><p>{jadwal.jenis.toUpperCase()}</p></center>
                                                                    </div>
                                                                </div>

                                                                <div className="col-sm-3">
                                                                    <div className="form-group">
                                                                        <center><label className='font-weight-bold'>Jumlah Kursi</label></center>
                                                                        <center><p>{jadwal.jumlah_kursi}</p></center>
                                                                    </div>
                                                                </div>

                                                                <div className="col-sm-3">
                                                                    <div className="form-group">
                                                                        <center><label className='font-weight-bold'>Jurusan</label></center>
                                                                        <center><p>{([jadwal.keberangkatan] + ' ke ' + [jadwal.tujuan] + ' (' + [jadwal.waktu] + ')').toUpperCase()}</p></center>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-3">
                                                                    <div className="form-group">
                                                                        <center><label className='font-weight-bold'>Nama Supir</label></center>
                                                                        <center><p>{jadwal.nama.toUpperCase()}</p></center>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-3">
                                                                    <div className="form-group">
                                                                        <center><label className='font-weight-bold'>Harga Tiket</label></center>
                                                                        <center><p>{this.formatRupiah(jadwal.harga_tiket)}</p></center>
                                                                    </div>
                                                                </div>

                                                                <div className="col-sm-12">
                                                                    <Button
                                                                        variant='warning'
                                                                        onClick={() => this.setState({
                                                                            editModalShow: true,
                                                                            id: jadwal.id,
                                                                            jadwalid: jadwal.jurusan_id,
                                                                            tanggalberangkat: jadwal.tanggal_berangkat,
                                                                            armadaid: jadwal.armada_id,
                                                                            jenis: jadwal.jenis,
                                                                            tujuan: jadwal.tujuan,
                                                                            nama: jadwal.nama,
                                                                            hargatiket: jadwal.harga_tiket
                                                                        })}
                                                                    >Ubah</Button>

                                                                    <button className="btn btn-danger float-right" onClick={(event) => this.deleteJadwal(jadwal.id, event)}>Hapus</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </React.Fragment>
                                    }

                                    <AdminCreateJadwal
                                        show={this.state.addModalShow}
                                        onHide={addModalClose}
                                    />

                                    <AdminUpdateJadwal
                                        show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        post_id={id}
                                        post_jadwalid={jadwalid}
                                        post_tanggalberangkat={tanggalberangkat}
                                        post_armadaid={armadaid}
                                        post_jenis={jenis}
                                        post_tujuan={tujuan}
                                        post_nama={nama}
                                        post_hargatiket={hargatiket}
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