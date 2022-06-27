import React, { Component } from 'react';
import { Link, matchPath } from 'react-router-dom'
import Axios from 'axios';

// librari moment js
import moment from 'moment';
// agar moment js bahasa indonesia
import 'moment/locale/id';

import Loader from '../loading/LoadingData';

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            jadwal: [],
            jadwals: [],
            tanggal_berangkat: this.props.match.params.tanggalBerangkat,
            kota_asal: this.props.match.params.kotaAsal,
            kota_tujuan: this.props.match.params.kotaTujuan,
            jumlah_penumpang: this.props.match.params.jumlahPenumpang
        }
    }

    componentDidMount() {
        this.getCariJadwal();
        this.getTglKeberangkatan();
        this.getJadwal();
    }

    getCariJadwal() {
        const data = {
            tanggal_berangkat: this.props.match.params.tanggalBerangkat,
            keberangkatan: this.props.match.params.kotaAsal,
            tujuan: this.props.match.params.kotaTujuan,
        }

        Axios.post("user/cari-jadwal", data)
            .then(response => {
                // this.setState({
                //     jadwal: response.data
                // })
                const jadwal = response.data;
                this.setState({ jadwal, loading: false })
            })
            .catch(error => console.log(error))
    }

    getTglKeberangkatan() {
        Axios.get('admin/jadwal')
            .then(response => {
                this.setState({
                    tanggal_keberangkatan: response.data
                })
            })
            .catch(error => console.log(error))
    }

    getJadwal() {
        Axios.get('admin/jadwal')
            .then(response => {
                this.setState({
                    jadwals: response.data
                })
            })
            .catch(error => console.log(error))
    }

    tanggalBerangkat = (e) => {
        this.setState({ tanggal_berangkat: e.target.value });
    };

    kotaAsal = (e) => {
        this.setState({ kota_asal: e.target.value });
    };

    kotaTujuan = (e) => {
        this.setState({ kota_tujuan: e.target.value });
    };

    JumlahPenumpang = (e) => {
        this.setState({ jumlah_penumpang: e.target.value });
    }

    formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(money);
    }


    render() {
        // console.log(moment(this.props.match.params.tanggalBerangkat).format('dddd, DD-MM-YYYY, h:mm:ss a'))

        const { jadwals, jadwal } = this.state;

        const tanggal_keberangkatan = Object.values(jadwals.reduce((r, c) => {
            r[c.tanggal_berangkat] = c
            return r
        }, {}));

        const kotas_asal = Object.values(jadwals.reduce((r, c) => {
            r[c.keberangkatan] = c
            return r
        }, {}));

        const kotas_tujuan = Object.values(jadwals.reduce((r, c) => {
            r[c.tujuan] = c
            return r
        }, {}));

        let tBody, tBody1;

        if (jadwal.length > 0) {
            tBody = (
                <React.Fragment>
                    {jadwal.map((jadwal, no) =>
                        <div className="card mt-3 bg-info text-white" key={jadwal.id}>
                            <div className="card-body">
                                <div className="row table-web-user">
                                    <div className="col-md-2">
                                        {jadwal.jenis.toUpperCase()}
                                    </div>

                                    <div className="col-md-2">
                                        {moment(jadwal.tanggal_berangkat).format('DD MMMM YYYY')}
                                    </div>

                                    <div className="col-md-4">
                                        {jadwal.keberangkatan.toUpperCase()}&nbsp;Ke&nbsp;{jadwal.tujuan.toUpperCase()}
                                    </div>

                                    <div className="col-md-2">
                                        {jadwal.jumlah_kursi - jadwal.penumpang_pasti}
                                    </div>

                                    <div className="col-md-2 text-white">
                                        <div className="form-group">
                                            <center>{this.formatRupiah(jadwal.harga_tiket)}</center>
                                        </div>

                                        {/* {this.props.location.post_jumlahPenumpang <= jadwal.jumlah_kursi && 
                                    <button className="btn btn-info">pesan</button>
                                } */}

                                        {(() => {
                                            if (this.props.match.params.jumlahPenumpang < (jadwal.jumlah_kursi - jadwal.penumpang_pasti)) {
                                                return (
                                                    <React.Fragment>
                                                        {/* <Link to={{ 
                                                            pathname : '/pemesanan-jadwal', 
                                                            post_id : jadwal.id,
                                                            post_jenisArmada : jadwal.jenis,
                                                            post_jumlahKursi : jadwal.jumlah_kursi,
                                                            post_kotaAsal : jadwal.keberangkatan,
                                                            post_kotaTujuan : jadwal.tujuan,
                                                            post_tanggalBerangkat : jadwal.tanggal_berangkat,
                                                            post_hargaTiket : jadwal.harga_tiket,
                                                            post_jumlahPenumpang : this.props.location.post_jumlahPenumpang,
                                                        }} 
                                                        className="btn btn-info">Pesan</Link> */}
                                                        <center>
                                                            <Link
                                                                to={`/pemesanan-jadwal/${jadwal.id}/${jadwal.jenis}/${jadwal.jumlah_kursi - jadwal.penumpang_pasti}/${jadwal.keberangkatan}/${jadwal.tujuan}/${jadwal.tanggal_berangkat}/${jadwal.harga_tiket}/${this.props.match.params.jumlahPenumpang}/${jadwal.id}`}
                                                                className="btn btn-success btn-sm btn-block"
                                                            >
                                                                Pesan
                                                            </Link>
                                                        </center>
                                                    </React.Fragment>
                                                )
                                            } else if (this.props.match.params.jumlahPenumpang == (jadwal.jumlah_kursi - jadwal.penumpang_pasti)) {
                                                return (
                                                    <center>
                                                        <Link to={`/pemesanan-jadwal/${jadwal.id}/${jadwal.jenis}/${jadwal.jumlah_kursi - jadwal.penumpang_pasti}/${jadwal.keberangkatan}/${jadwal.tujuan}/${jadwal.tanggal_berangkat}/${jadwal.harga_tiket}/${this.props.match.params.jumlahPenumpang}/${jadwal.id}`}
                                                            className="btn btn-danger btn-sm">Pesan Jumlah Terbatas</Link>
                                                    </center>
                                                )
                                            } else {

                                            }
                                            // return null;
                                        })()}
                                    </div>
                                </div>

                                {/* ====================================================================================================================== */}
                                {/* data daftar jadwak mode android */}
                                <div className="row table-android-user">
                                    <div className="col-sm-2">
                                        <div className="form-group">
                                            <label htmlFor="">Armada</label>
                                            <input readOnly type="text" defaultValue={jadwal.jenis.toUpperCase()} className="form-control" readOnly />
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <div className="form-group">
                                            <label htmlFor="">Tanggal Berangkat</label>
                                            <input readOnly type="text" defaultValue={moment(jadwal.tanggal_berangkat).format('DD MMMM YYYY')} className="form-control" readOnly />
                                        </div>
                                    </div>

                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label htmlFor="">Jurusan</label>
                                            <input readOnly type="text" defaultValue={[jadwal.keberangkatan.toUpperCase()] + " ke " + [jadwal.tujuan.toUpperCase()]} className="form-control" readOnly />
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <div className="form-group">
                                            <label htmlFor="">Jumlah Kursi</label>
                                            <input readOnly type="text" defaultValue={jadwal.jumlah_kursi - jadwal.penumpang_pasti} className="form-control" readOnly />
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div className="form-group">
                                            <label htmlFor="">Harga Tiket</label>
                                            <input readOnly defaultValue={this.formatRupiah(jadwal.harga_tiket)} className="form-control" readOnly />
                                        </div>
                                    </div>

                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            {/* {this.props.location.post_jumlahPenumpang <= jadwal.jumlah_kursi && 
                                            <button className="btn btn-info">pesan</button>
                                            } */}

                                            {(() => {
                                                if (this.props.match.params.jumlahPenumpang < (jadwal.jumlah_kursi - jadwal.penumpang_pasti)) {
                                                    return (
                                                        <React.Fragment>
                                                            <center>
                                                                <Link to={`/pemesanan-jadwal/${jadwal.id}/${jadwal.jenis}/${jadwal.jumlah_kursi - jadwal.penumpang_pasti}/${jadwal.keberangkatan}/${jadwal.tujuan}/${jadwal.tanggal_berangkat}/${jadwal.harga_tiket}/${this.props.match.params.jumlahPenumpang}/${jadwal.id}`}
                                                                    className="btn btn-success btn-sm btn-block">
                                                                    Pesan
                                                                </Link>
                                                            </center>
                                                        </React.Fragment>
                                                    )
                                                } else if (this.props.match.params.jumlahPenumpang == (jadwal.jumlah_kursi - jadwal.penumpang_pasti)) {
                                                    return (
                                                        <center>
                                                            <Link to={`/pemesanan-jadwal/${jadwal.id}/${jadwal.jenis}/${jadwal.jumlah_kursi - jadwal.penumpang_pasti}/${jadwal.keberangkatan}/${jadwal.tujuan}/${jadwal.tanggal_berangkat}/${jadwal.harga_tiket}/${this.props.match.params.jumlahPenumpang}/${jadwal.id}`}
                                                                className="btn btn-danger btn-sm btn-block">Pesan Jumlah Terbatas</Link>
                                                        </center>
                                                    )
                                                } else {

                                                }
                                            })()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </React.Fragment>
            )
        } else {
            tBody = (
                <div className="card">
                    <div className="card-body">
                        <h5 colSpan="7" className="text-center">Maaf jadwal tidak ditemukan harap cari kembali dengan tombol Cari Jadwal di bawah ini</h5>
                    </div>
                </div>
            )
        }

        return (
            <React.Fragment>
                <main className="col">
                    <div id="content">
                        <article>
                            <section >
                                <div className="container-fluid">
                                    <ol>
                                        {/* <li>Tanggal Berangkat : {this.props.location.post_tanggalBerangkat}</li>
                                        <li>Kota Asal : {this.props.location.post_kotaAsal}</li>
                                        <li>Kota Tujuan : {this.props.location.post_kotaTujuan}</li>
                                        <li>Jumlah Penumpang : {this.props.location.post_jumlahPenumpang}</li> */}

                                        {/* <li>Tanggal Berangkat : {this.props.match.params.tanggalBerangkat}</li>
                                        <li>Kota Asal : {this.props.match.params.kotaAsal}</li>
                                        <li>Kota Tujuan : {this.props.match.params.kotaTujuan}</li>
                                        <li>Jumlah Penumpang : {this.props.match.params.jumlahPenumpang}</li> */}
                                    </ol>

                                    <div className="card bg-info">
                                        <div className="card-body">
                                            <h3 className='text-warning'>
                                                {(() => {
                                                    if (!(this.props.match.params.kotaAsal === "kosong") && !(this.props.match.params.kotaTujuan === "kosong")) {
                                                        return (
                                                            <React.Fragment>
                                                                {this.props.match.params.kotaAsal.toUpperCase()} Ke {this.props.match.params.kotaTujuan.toUpperCase()}
                                                            </React.Fragment>
                                                        )
                                                    } else if (this.props.match.params.kotaAsal === "kosong" && this.props.match.params.kotaTujuan === "kosong") {

                                                    } else if (this.props.match.params.kotaTujuan === "kosong") {
                                                        return (
                                                            <React.Fragment>
                                                                Kota asal {this.props.match.params.kotaAsal.toUpperCase()}
                                                            </React.Fragment>
                                                        )
                                                    } else {
                                                        return (
                                                            <React.Fragment>
                                                                Kota Tujuan {this.props.match.params.kotaTujuan.toUpperCase()}
                                                            </React.Fragment>
                                                        )
                                                    }
                                                })()}
                                            </h3>

                                            <p className='text-white'>{moment(this.props.match.params.tanggalBerangkat).format('dddd, DD MMMM YYYY')} - {this.props.match.params.jumlahPenumpang} Orang</p>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <h4 className='text-warning'>Tanggal Berangkat</h4>

                                                        <div className="input-group input-group-sm">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fa fa-calendar"></i></span>
                                                            </div>

                                                            <select onChange={this.tanggalBerangkat} className="form-control">
                                                                <option value="">Tanggal Berangkat</option>
                                                                {tanggal_keberangkatan.map((tgl_berangkat) => (
                                                                    <option key={tgl_berangkat.id} value={tgl_berangkat.tanggal_berangkat} selected={tgl_berangkat.tanggal_berangkat == this.props.match.params.tanggalBerangkat}>{tgl_berangkat.tanggal_berangkat}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <h4 className='text-warning'>Koda Asal</h4>

                                                        <div className="input-group mb-3 input-group-sm">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fa fa-car"></i></span>
                                                            </div>

                                                            <select onChange={this.kotaAsal} className="form-control">
                                                                <option value="kosong">Pilih Kota Asal</option>
                                                                {kotas_asal.map((jadwal) => (
                                                                    <option key={jadwal.id} value={jadwal.keberangkatan} selected={jadwal.keberangkatan == this.props.match.params.kotaAsal}>{jadwal.keberangkatan.toUpperCase()}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <h4 className='text-warning'>Kota Tujuan</h4>

                                                        <div className="input-group mb-3 input-group-sm">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fa fa-car"></i></span>
                                                            </div>

                                                            <select onChange={this.kotaTujuan} className="form-control">
                                                                <option value="kosong">Pilih Kota Tujuan</option>
                                                                {kotas_tujuan.map((jadwal) =>
                                                                    <option key={jadwal.id} value={jadwal.tujuan} selected={jadwal.tujuan == this.props.match.params.kotaTujuan}>{jadwal.tujuan.toUpperCase()}</option>
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <h4 className='text-warning'>Jumlah Penumpang</h4>

                                                        <div className="input-group input-group-sm">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-male"></i></span>
                                                            </div>

                                                            <select name="" id="" className="form-control" onChange={this.JumlahPenumpang}>
                                                                <option value="1" selected={"1" == this.props.match.params.jumlahPenumpang}>1</option>
                                                                <option value="2" selected={"2" == this.props.match.params.jumlahPenumpang}>2</option>
                                                                <option value="3" selected={"3" == this.props.match.params.jumlahPenumpang}>3</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-12">
                                                    {(() => {
                                                        if (!this.state.jumlah_penumpang == 0 && !this.state.tanggal_berangkat == 0) {
                                                            return (
                                                                <a href={`/daftar-jadwal/${this.state.tanggal_berangkat}/${this.state.kota_asal}/${this.state.kota_tujuan}/${this.state.jumlah_penumpang}`} className="btn btn-warning btn-sm mt-md-3">CARI JADWAL</a>
                                                            )
                                                        } else {
                                                            return (
                                                                <button className="btn btn-warning btn-sm mt-md-3" disabled>Cari Jadwal</button>
                                                            )
                                                        }
                                                    })()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* judul bulan dan tahun hasil pencarian bagian tengah */}
                                    <div className="alert alert-info mt-4">
                                        <center>{moment(this.props.match.params.tanggalBerangkat).format('MMMM YYYY')}</center>
                                    </div>
                                    <hr className="bg-success" />

                                    {this.state.loading ? <Loader /> : 
                                        <React.Fragment>
                                            <div className="card bg-info text-white table-web-user">
                                                <div className="card-body">
                                                    <div className="row font-weight-bold text-warning">
                                                        <div className="col-md-2">Armada</div>
                                                        <div className="col-md-2">Tanggal</div>
                                                        <div className="col-md-4">Jurusan</div>
                                                        <div className="col-md-2">Jumlah Kursi</div>
                                                        <div className="col-md-2"><center>Harga Tiket</center></div>
                                                    </div>
                                                </div>
                                            </div>
        
                                            {tBody}
                                        </React.Fragment>
                                    }

                                    {/* <table className="table table-striped border mt-5">
                                        <thead>
                                            <tr>
                                                <th>Armada</th>
                                                <th>Berangkat</th>
                                                <th>Jurusan</th>
                                                <th>Harga Tiket</th>
                                                <th>Tersedia</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        {tBody1}
                                    </table>

                                    <Link to="/cari-jadwal" className="btn btn-danger btn-sm">Cari Jadwal</Link> */}
                                </div>
                            </section>
                        </article>
                    </div>
                </main>
            </React.Fragment>
        )
    }
}