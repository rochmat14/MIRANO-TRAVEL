import Axios from 'axios';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, ButtonToolbar } from 'react-bootstrap';

import gambarBri from '../../images/bank-bri.jpg';
import gambarBca from '../../images/bank-bca.jpg';

// librari moment js
import moment from 'moment';
// agar moment js bahasa indonesia
import 'moment/locale/id';

import Loader from '../loading/LoadingData';
import AdminDetailJadwal from '../admin/booking/AdminDetailJadwal';
import AdminDetailPelanggan from '../admin/booking/AdminDetailPelanggan';
import AdminDetailJumlahPenumpang from '../admin/booking/AdminDetailJumlahPenumpang';

export default class extends Component {
    constructor(props) {
        super(props);

        this.input = React.createRef();

        this.state = {
            loading: true,
            detailModalTanggalBerankat: false,
            bookings: [],
            pembayarans: [],
        }

    }

    componentDidMount() {
        this.getDataPembayaran();

        this.getDataUser();

        this.getDataBooking();
    }

    componentDidUpdate() {
        // document.getElementById("button").click();
        // this.getDataBooking();
    }

    getDataUser() {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        };

        if (!localStorage.getItem('token')) {

        } else {
            Axios.get('user', config).then(
                res => {
                    this.setState({
                        user: res.data
                    });
                },
                err => {
                    console.log("anda belum login")
                }
            )
        }
    }

    getDataBooking() {
        const cari = {
            user_id: this.props.match.params.user_id
        }

        Axios.post('booking', cari)
            .then((response) => {
                // this.setState({
                //     bookings : response.data
                // })
                const bookings = response.data;
                this.setState({ bookings, loading: false })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getDataPembayaran() {
        Axios.get('user/pembayaran')
            .then((response) => {
                this.setState({
                    pembayarans: response.data
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(money);
    }

    render() {
        if (!localStorage.getItem('token')) {
            return <Redirect to={'/login'} />
        }

        if (this.state.user) {

            if (!(this.props.match.params.user_id == this.state.user.id)) {
                return <Redirect to={'/login'} />
            }
        }

        const { bookings,
            pembayarans,
            nomorBooking,
            bookingDetail,
            tanggalBerangkat,
            armadaJenis,
            jumlahKursi,
            keberangkatan,
            tujuan,
            namaSupir,
            hargaTiket,
            waktuBerangkat,
            nama,
            jenisKelamin,
            nomorTelepon,
            alamat,
            email,
        } = this.state;

        let detailTanggalBerangkat = () => this.setState({ detailModalTanggalBerankat: false });
        let detailPelanggan = () => this.setState({ detailModalPelanggan: false });
        let detailJumlahPenumpang = () => this.setState({ detailModalJumlahPenumpang: false });
        let detailStatusBayar = () => this.setState({ detailModalStatusBayar: false });
        return (
            <React.Fragment>
                <main className="col">
                    <div id="content">
                        <article>
                            <section >
                                <div className="jumbotron mt-3">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <p className="text-center">Sebelum konfirmasi transfer, silakan transfer dana sesuai nominal total bayar ke salah satu rekening dibawah ini</p>
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <div className="col-sm-12">
                                                    <div className="form-group">
                                                        <center><img src={gambarBri} alt="gambar-bri" width="150px" /></center>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <span>{"No. Rekening :"}</span>
                                                    </div>

                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            {"5951-01-014122-xx-xx"}
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-6">
                                                        <span>{"Atas Nama :"}</span>
                                                    </div>

                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            {"Mirano Travel"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <div className="col-sm-12">
                                                    <div className="form-group">
                                                        <center><img src={gambarBca} alt="gambar-bca" width="150px" height="84px" /></center>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <span>{"No. Rekening :"}</span>
                                                    </div>

                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            {"1122-0928-2309-xx-xx"}
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-6">
                                                        <span>{"Atas Nama :"}</span>
                                                    </div>

                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            {"Mirano Travel"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-header">
                                        Riwayat Booking
                                    </div>

                                    {this.state.loading ? <Loader /> :
                                        <React.Fragment>

                                            <div className="card-body">
                                                {bookings.map((booking, i) =>
                                                    <div className="card mt-3" key={i}>
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col-sm-3">
                                                                    <div className="form-group">
                                                                        <label>Nomor Booking</label>
                                                                        <input type="text" defaultValue={booking.nomor_booking} className="form-control" readOnly />
                                                                    </div>
                                                                </div>

                                                                <div className="col-sm-3">
                                                                    <div className="form-group">
                                                                        <label className="float-left">Jadwal</label>
                                                                        <div className="input-group mb-3">
                                                                            <div className="input-group-prepend">
                                                                                <button
                                                                                    className='btn btn-sm input-group-text'
                                                                                    onClick={() => this.setState({
                                                                                        detailModalTanggalBerankat: true,
                                                                                        nomorBooking: booking.nomor_booking,
                                                                                        tanggalBerangkat: booking.jadwal.tanggal_berangkat,
                                                                                        armadaJenis: booking.jadwal.armada.jenis.toUpperCase(),
                                                                                        jumlahKursi: booking.jadwal.armada.jumlah_kursi,
                                                                                        keberangkatan: booking.jadwal.jurusan.keberangkatan.toUpperCase(),
                                                                                        tujuan: booking.jadwal.jurusan.tujuan.toUpperCase(),
                                                                                        namaSupir: booking.jadwal.supir.nama.toUpperCase(),
                                                                                        hargaTiket: booking.jadwal.harga_tiket,
                                                                                        waktuBerangkat: booking.jadwal.jurusan.waktu
                                                                                    })}
                                                                                >
                                                                                    <i className="fa fa-eye"></i>
                                                                                </button>
                                                                            </div>

                                                                            <input readOnly type="text" defaultValue={moment(booking.jadwal.tanggal_berangkat).format('DD MMMM YYYY')} className="form-control" />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-sm-3">
                                                                    <div className="form-group">
                                                                        <label>Nama Pemesan</label>
                                                                        <div className="input-group">
                                                                            <div className="input-group-prepend">
                                                                                <button
                                                                                    className='btn btn-sm input-group-text'
                                                                                    onClick={() => this.setState({
                                                                                        detailModalPelanggan: true,
                                                                                        nomorBooking: booking.nomor_booking,
                                                                                        nama: booking.user.nama.toUpperCase(),
                                                                                        jenisKelamin: booking.user.jenis_kelamin.toUpperCase(),
                                                                                        nomorTelepon: booking.user.nomor_telepon,
                                                                                        alamat: booking.user.alamat.toUpperCase(),
                                                                                        email: booking.user.email
                                                                                    })}
                                                                                >
                                                                                    <i className="fa fa-eye"></i>
                                                                                </button>
                                                                            </div>
                                                                            <input readOnly type="text" defaultValue={booking.user.nama.toUpperCase()} className="form-control" />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-sm-3">
                                                                    <div className="form-group">
                                                                        <label>Jumlah Penumpang</label>
                                                                        <div className="input-group">
                                                                            <div className="input-group-prepend">
                                                                                <button
                                                                                    className='btn btn-sm input-group-text'

                                                                                    onClick={() => this.setState({
                                                                                        detailModalJumlahPenumpang: true,
                                                                                        nomorBooking: booking.nomor_booking,
                                                                                        bookingDetail: booking.booking_detail
                                                                                    })}
                                                                                ><i className="fa fa-eye"></i></button>
                                                                            </div>
                                                                            <input readOnly type="text" defaultValue={booking.jumlah_penumpang} className="form-control" />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-sm-3">
                                                                    <div className="form-group">
                                                                        <label>Hara Total</label>
                                                                        <input type="text" defaultValue={this.formatRupiah(booking.harga_total)} className="form-control" readOnly />
                                                                    </div>
                                                                </div>

                                                                <div className="col-sm-3">
                                                                    <div className="form-group">
                                                                        <label>Tanggal Booking</label>
                                                                        <input type="text" defaultValue={moment(booking.tanggal_booking).format('DD MMMM YYYY')} className="form-control" readOnly />
                                                                    </div>
                                                                </div>

                                                                <div className="col-sm-3">
                                                                    <div className="form-group">
                                                                        <label>Status Booking</label>
                                                                        <input type="text" defaultValue={booking.status_booking.toUpperCase()} className="form-control" readOnly />
                                                                    </div>
                                                                </div>

                                                                <div className="col-sm-3">
                                                                    <div className="form-group">
                                                                        <label>Status Bayar</label>
                                                                        <input type="text" defaultValue={booking.status_bayar.toUpperCase()} className="form-control" readOnly />
                                                                    </div>
                                                                </div>

                                                                {(() => {
                                                                    if (booking.status_booking === "aktif" && booking.status_bayar === "belum dibayar") {
                                                                        return (
                                                                            <React.Fragment>
                                                                                <div className="col-sm-12">
                                                                                    <div className="form-group">
                                                                                        <Link to={`/konfirmasi-transfer/${booking.nomor_booking}/${this.props.match.params.user_id}`} className="btn btn-success btn-sm btn-block">Konfirmasi Transfer</Link>
                                                                                    </div>
                                                                                </div>
                                                                            </React.Fragment>
                                                                        )
                                                                    } else if (booking.status_booking === "aktif" && booking.status_bayar === "pending") {
                                                                        return (
                                                                            <React.Fragment>
                                                                                {(() => {
                                                                                    if (pembayarans.some(el => el.nomor_booking === booking.nomor_booking)) {
                                                                                        return (
                                                                                            <div className="col-sm-6">
                                                                                                <div className="form-group">
                                                                                                    <Link to={`/detail-bayar/${booking.nomor_booking}/${this.props.match.params.user_id}`} className="btn btn-warning btn-sm btn-block">Detail Bayar</Link>
                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                })()}
                                                                                <div className="col-sm-6">
                                                                                    <div className="form-group">
                                                                                        <Link to={`/konfirmasi-transfer-edit/${booking.nomor_booking}/${this.props.match.params.user_id}`} className="btn btn-info btn-sm btn-block">Edit Konfirmasi Transfer</Link>
                                                                                    </div>
                                                                                </div>
                                                                            </React.Fragment>
                                                                        )
                                                                    } else if (booking.status_booking === "aktif" && booking.status_bayar === "lunas") {
                                                                        return (
                                                                            <div className="col-sm-12">
                                                                                <div className="form-group">
                                                                                    <Link to={`/detail-bayar/${booking.nomor_booking}/${this.props.match.params.user_id}`} className="btn btn-warning btn-sm btn-block">Detail Bayar</Link>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    } else if (booking.status_booking === "cancel" && booking.status_bayar === "belum dibayar") {

                                                                    } else {

                                                                    }
                                                                })()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </React.Fragment>
                                    }

                                    <AdminDetailJadwal
                                        show={this.state.detailModalTanggalBerankat}
                                        onHide={detailTanggalBerangkat}
                                        post_nomorbooking={nomorBooking}
                                        post_tanggalberangkat={tanggalBerangkat}
                                        post_armadajenis={armadaJenis}
                                        post_jumlahkursi={jumlahKursi}
                                        post_keberangkatan={keberangkatan}
                                        post_tujuan={tujuan}
                                        post_namasupir={namaSupir}
                                        post_hargatiket={hargaTiket}
                                        post_waktuberangkat={waktuBerangkat}
                                    />

                                    <AdminDetailPelanggan
                                        show={this.state.detailModalPelanggan}
                                        onHide={detailPelanggan}
                                        post_nama={nama}
                                        post_nomorbooking={nomorBooking}
                                        post_jeniskelamin={jenisKelamin}
                                        post_nomortelepon={nomorTelepon}
                                        post_alamat={alamat}
                                        post_email={email}
                                    />

                                    <AdminDetailJumlahPenumpang
                                        show={this.state.detailModalJumlahPenumpang}
                                        onHide={detailJumlahPenumpang}
                                        post_nomorbooking={nomorBooking}
                                        post_bookingdetail={bookingDetail}
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