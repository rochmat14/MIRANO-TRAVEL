import {Redirect} from 'react-router-dom';
import React, { Component } from 'react';
import Axios from 'axios';

// librari moment js
import moment from 'moment';
// agar moment js bahasa indonesia
import 'moment/locale/id';

import Loader from '../../loading/LoadingData';
import AdminUpdateStatusBooking from './AdminUpdateStatusBooking';
import AdminUpdateStatusBayar from './AdminUpdateStatusBayar';
import AdminDetailJadwal from './AdminDetailJadwal';
import AdminDetailPelanggan from './AdminDetailPelanggan';
import AdminDetailJumlahPenumpang from './AdminDetailJumlahPenumpang';
import AdminDetailPembayaran from './AdminDetailPembayaran';

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            bookings: [],
            detailModalTanggalBerankat: false,
            detailModalPelanggan: false,
            detailModalJumlahPenumpang: false,
            detailModalStatusBayar: false,
            updateModalStatusBooking: false,
            updateModalStatusBayar: false
        }
    }

    componentDidMount() {
        this.getDataBooking();
    }

    componentDidUpdate() {
        this.getDataBooking();
    }

    getDataBooking() {
        Axios.get('admin/booking')
            .then((response) => {
                // this.setState({
                //     bookings : response.data
                // })
                const bookings = response.data;
                this.setState({ bookings, loading: false })
            })
            .catch((error) => {
                // console.log(error)
            })
    }

    deleteBooking = (nomor_booking, event) => {
        if(window.confirm("apakah anda yakin ingin menghapus data booking ?")) {
            Axios.delete(`admin/booking/${nomor_booking}`)
                .then(res => {
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            // minimumFractionDigits: 2 //menambah 0 dibelakang koma
        }).format(money);
    }

    render() {
        if (!localStorage.getItem('token_admin')) {
            return <Redirect to="/admin/login" />
        }

        const { bookings,
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
            statusBooking,
            statusBayar,
            jumlahPenumpang,
            penumpangPasti,
            dariBank,
            keBank,
            nomorRekening,
            atasNama,
            nominalTransfer,
            buktiTransfer } = this.state;

        let detailTanggalBerangkat = () => this.setState({ detailModalTanggalBerankat: false });
        let detailPelanggan = () => this.setState({ detailModalPelanggan: false });
        let detailJumlahPenumpang = () => this.setState({ detailModalJumlahPenumpang: false });
        let detailStatusBayar = () => this.setState({ detailModalStatusBayar: false });
        let editModalStatusBookingClose = () => this.setState({ updateModalStatusBooking: false });
        let editModalStatusKonfirmasiClose = () => this.setState({ updateModalStatusBayar: false });

        // ========================================================================
        //format rupiah manual
        const thouSep = ".";
        const decSep = ",";
        // format to money
        const toMoney = (num) => { return "Rp " + (Math.round(num * 100) / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(/[,.]/g, function (m) { return m === ',' ? thouSep : decSep; }) };

        // var a= 1234567.89;
        // console.log(toMoney(a)) // "1.234.567,89"
        // ===========================================================================

        return (
            <React.Fragment>
                <main className="col">
                    <div id="content">
                        <article>
                            <section >
                                <div className="container-fluid">
                                    <h1>Data Booking</h1>
                                    <hr />

                                    <div className="mt-4">
                                        {this.state.loading ? <Loader /> : null}
                                        {bookings.map((booking, i) =>
                                            <div key={i} className="card mt-4">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <label>Nomor Booking</label>
                                                                <input readOnly type="text" defaultValue={booking.nomor_booking} className="form-control" />
                                                            </div>
                                                        </div>

                                                        <div className="col-sm-6">
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

                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <label>Pelanggan</label>
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

                                                        <div className="col-sm-6">
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

                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Harga Total</label>
                                                                <input readOnly type="text" defaultValue={this.formatRupiah(booking.harga_total)} className="form-control" />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Tanggal Booking</label>
                                                                <input readOnly type="text" defaultValue={moment(booking.tanggal_booking).format('DD MMMM YYYY')} className="form-control" />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Status Booking</label>
                                                                <input readOnly type="text" defaultValue={booking.status_booking.toUpperCase()} className="form-control" />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Status Bayar</label>
                                                                <input readOnly type="text" defaultValue={booking.status_bayar.toUpperCase()} className="form-control" />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-12" hidden>
                                                            <div className="form-group">
                                                                <center>
                                                                    <label>Bukti Pembayaran</label>
                                                                    <div className='resonsive-div-pelanggan'>
                                                                        {/* jika array pembayaran kosong maka tidak menampilkan gambar */}
                                                                        {(() => {
                                                                            if (booking.pembayaran === null) {

                                                                            } else {
                                                                                return (
                                                                                    <img src={`http://localhost:8000/${booking.pembayaran.lokasi_gambar}`} height="200px" />
                                                                                )
                                                                            }
                                                                        })()}

                                                                    </div>
                                                                </center>
                                                            </div>
                                                        </div>

                                                        <div className="col-sm-12">
                                                            {(() => {
                                                                if (booking.status_booking === 'aktif' && booking.status_bayar === 'pending' || booking.status_booking === 'selesai' && booking.status_bayar === 'pending' || booking.status_booking === 'selesai' && booking.status_bayar === 'lunas') {
                                                                    return (
                                                                        <React.Fragment>
                                                                            <button
                                                                                className='btn btn-success btn-lg btn-block'
                                                                                onClick={() => this.setState({
                                                                                    detailModalStatusBayar: true,
                                                                                    statusBooking: booking.status_booking,
                                                                                    nomorBooking: booking.nomor_booking,
                                                                                    dariBank: booking.pembayaran.dari_bank,
                                                                                    keBank: booking.pembayaran.ke_bank,
                                                                                    nomorRekening: booking.pembayaran.nomor_rekening,
                                                                                    atasNama: booking.pembayaran.atas_nama,
                                                                                    nominalTransfer: booking.pembayaran.nominal_transfer,
                                                                                    buktiTransfer: booking.pembayaran.lokasi_gambar
                                                                                })}
                                                                            >Detail</button>

                                                                            <button
                                                                                className='btn btn-warning btn-sm btn-block'
                                                                                onClick={() => this.setState({
                                                                                    updateModalStatusBayar: true,
                                                                                    nomorBooking: booking.nomor_booking,
                                                                                    statusBooking: booking.status_booking,
                                                                                    statusBayar: booking.status_bayar,
                                                                                    jumlahPenumpang: booking.jumlah_penumpang,
                                                                                    penumpangPasti: booking.penumpang_booking.penumpang_pasti
                                                                                })}
                                                                            >Edit Bayar</button>
                                                                        </React.Fragment>
                                                                    )
                                                                }
                                                            })()}

                                                            {(() => {
                                                                if (booking.status_booking === 'aktif' && booking.status_bayar === 'belum dibayar') {
                                                                    return (
                                                                        <button
                                                                            className='btn btn-info btn-sm btn-block'
                                                                            onClick={() => this.setState({
                                                                                updateModalStatusBooking: true,
                                                                                nomorBooking: booking.nomor_booking,
                                                                                statusBooking: booking.status_booking,
                                                                                statusBayar: booking.status_bayar,
                                                                                jumlahPenumpang: booking.jumlah_penumpang,
                                                                                penumpangPasti: booking.penumpang_booking.penumpang_pasti
                                                                            })}
                                                                        >Edit Booking</button>
                                                                    )
                                                                    
                                                                } else if (booking.status_booking === 'selesai' && booking.status_bayar === 'pending') {
                                                                    return (
                                                                        <React.Fragment>
                                                                            <button
                                                                                className='btn btn-info btn-sm btn-block mt-2'
                                                                                onClick={() => this.setState({
                                                                                    updateModalStatusBooking: true,
                                                                                    nomorBooking: booking.nomor_booking,
                                                                                    statusBooking: booking.status_booking,
                                                                                    statusBayar: booking.status_bayar,
                                                                                    jumlahPenumpang: booking.jumlah_penumpang,
                                                                                    penumpangPasti: booking.penumpang_booking.penumpang_pasti
                                                                                })}
                                                                            >Edit Booking</button>
                                                                        </React.Fragment>
                                                                    )

                                                                } else {
                                                                    return (
                                                                        <React.Fragment>
                                                                            <button
                                                                                className='btn btn-info btn-sm btn-block mt-2'
                                                                                onClick={() => this.setState({
                                                                                    updateModalStatusBooking: true,
                                                                                    nomorBooking: booking.nomor_booking,
                                                                                    statusBooking: booking.status_booking,
                                                                                    statusBayar: booking.status_bayar,
                                                                                    jumlahPenumpang: booking.jumlah_penumpang,
                                                                                    penumpangPasti: booking.penumpang_booking.penumpang_pasti
                                                                                })}
                                                                            >Edit Booking</button>
                                                                        </React.Fragment>
                                                                    )
                                                                }
                                                            })()}

                                                            {(() => {
                                                                if(booking.status_booking === 'selesai' && booking.status_bayar === 'pending' || booking.status_booking === 'selesai' && booking.status_bayar === 'lunas' || booking.status_booking === 'cancel' && booking.status_bayar === 'belum dibayar') {
                                                                    return(
                                                                        <React.Fragment>
                                                                            <button className='btn btn-danger btn-lg btn-block mt-2' onClick={(event) => this.deleteBooking(booking.nomor_booking, event)}>Hapus</button>
                                                                        </React.Fragment>

                                                                    )
                                                                }
                                                            })()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* modal detail jadwal */}
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

                                        {/* modal detail pelanggan */}
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

                                        {/* modal detail jumlah penumpang */}
                                        <AdminDetailJumlahPenumpang
                                            show={this.state.detailModalJumlahPenumpang}
                                            onHide={detailJumlahPenumpang}
                                            post_nomorbooking={nomorBooking}
                                            post_bookingdetail={bookingDetail}
                                        />

                                        {/* modal detail pembayaran/transfer */}
                                        <AdminDetailPembayaran
                                            show={this.state.detailModalStatusBayar}
                                            onHide={detailStatusBayar}
                                            post_statusbooking={statusBooking}
                                            post_nomorbooking={nomorBooking}
                                            post_daribank={dariBank}
                                            post_kebank={keBank}
                                            post_nomorrekening={nomorRekening}
                                            post_atasnama={atasNama}
                                            post_nomorbooking={nomorBooking}
                                            post_nominaltransfer={nominalTransfer}
                                            post_buktitransfer={buktiTransfer}
                                        />

                                        {/* modal edit status booking */}
                                        <AdminUpdateStatusBooking
                                            show={this.state.updateModalStatusBooking}
                                            onHide={editModalStatusBookingClose}
                                            post_nomorbooking={nomorBooking}
                                            post_statusbooking={statusBooking}
                                            post_statusbayar={statusBayar}
                                            post_jumlahpenumpang={jumlahPenumpang}
                                            post_penumpangpasti={penumpangPasti}
                                        />

                                        {/* modal update status bayar */}
                                        <AdminUpdateStatusBayar
                                            show={this.state.updateModalStatusBayar}
                                            onHide={editModalStatusKonfirmasiClose}
                                            post_nomorbooking={nomorBooking}
                                            post_statusbooking={statusBooking}
                                            post_statusbayar={statusBayar}
                                            post_jumlahpenumpang={jumlahPenumpang}
                                            post_penumpangpasti={penumpangPasti}
                                        />
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