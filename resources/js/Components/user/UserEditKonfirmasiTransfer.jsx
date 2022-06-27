import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';

import LoaderGetData from '../loading/LoadingData';

const LoaderSave = () => (
    <div className="divLoader">
        <svg className="svgLoader position-fixed" style={{ zIndex: 8, marginTop: "220px" }} viewBox="0 0 100 100" width="10em" height="10em">
            <path stroke="none" d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="red" transform="rotate(179.719 50 51)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 51;360 50 51" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></path>
        </svg>
    </div>
);

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingGetData: true,
            loadingSave: true,
            dataBooking: [],
            bookings: [],
            totalBayar: [],
            errors: {}
        }
    }
    
    componentDidMount () {
        this.getDataPembayaran();
        this.getDataBooking();
        this.getTotalBayar();
    }

    getDataPembayaran () {
        const nomor_booking = {
            nomor_booking: this.props.match.params.nomor_booking
        }
        
        Axios.post('user/pembayaran', nomor_booking)
            .then((response) => {
                const dataBooking = response.data;
                this.setState({ dataBooking, loadingGetData: false })
            })
            .catch((error) => (
                console.log(error)
            ))
    }

    getDataBooking() {
        const cari = {
            nomor_booking: this.props.match.params.nomor_booking
        }

        Axios.post('booking', cari)
            .then((response) => {
                this.setState({
                    bookings : response.data
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getTotalBayar() {
        const nomor_booking = {
            nomor_booking: this.props.match.params.nomor_booking
        }
        
        Axios.post('user/konfirmasi-tiket', nomor_booking)
            .then((response) => {
                this.setState({
                    totalBayar: response.data
                })
            })
            .catch((error) => (
                console.log(error)
            ))
    }

    handleSubmit = (e) => {
        e.preventDefault();


        let errors = this.state.errors;
        let formValidation = true;

        if (!e.target.dari_bank.value) {
            formValidation = false;
            errors["dari_bank"] = "Dari Bank tidak boleh kosong";

        }  else {
            errors["dari_bank"] = "";
        }
        
        if(!e.target.ke_bank.value) {
            formValidation = false;
            errors["ke_bank"] = "Ke Bank tidak boleh kosong";

        } else {
            errors["ke_bank"] = "";
        }
        
        if(!e.target.nomor_rekening.value) {
            formValidation = false;
            errors["nomor_rekening"] = "Nomor Rekening tidak boleh kosong";

        } else if(e.target.nomor_rekening.value.length < 10) {
            formValidation = false;
            errors["nomor_rekening"] = "Nomor Rekening minimal 10 angka";

        } else {
            errors["nomor_rekening"] = "";
        }
        
        if(!e.target.atas_nama.value) {
            formValidation = false;
            errors["atas_nama"] = "Atas Nama tidak boleh kosong";

        } else {
            errors["atas_nama"] = "";
            
        }

        // kondisi jika nominal transfer tidak sesuai dengan total bayar maka validasi terjadi
        if(this.state.totalBayar.length)
        // console.log(this.state.bookings[0].harga_total);
        if(!e.target.nominal_transfer.value) {
            formValidation = false;
            errors["nominal_transfer"] = "Nominal Transfer tidak boleh kosong";

        } else if(!(e.target.nominal_transfer.value == this.state.totalBayar[0].harga_total)) {
            formValidation = false;
            errors["nominal_transfer"] = "Nominal harus sesuai dengan total bayar";
            
        }else {
            errors["nominal_transfer"] = "";
            
        }

        if(!e.target.gambar_bukti.files[0]) {
            // formValidation = false;
            errors["gambar_bukti"] = "";

        } else if(e.target.gambar_bukti.files[0].size > '1040282') {
            formValidation = false;
            errors["gambar_bukti"] = "Ukuran tidak boleh melebihi 1 mb";
            
        } else {
            errors["gambar_bukti"] = "";
            
        }
        
        this.setState({ errors: errors });

        if(formValidation == true) {
            this.setState({ loadingSave: false })
            
            let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];    
            let tahun = (new Date().getFullYear());
            let bulan = months[(new Date().getMonth())];
            let tanggal = (new Date().getDate());
            let tanggalKonfirmasi = tahun+"-"+bulan+"-"+tanggal;
            
            const data = new FormData;

            data.append('nomor_booking', e.target.nomor_booking.value);
            data.append('dari_bank', e.target.dari_bank.value);
            data.append('ke_bank', e.target.ke_bank.value);
            data.append('nomor_rekening', e.target.nomor_rekening.value);
            data.append('atas_nama', e.target.atas_nama.value);
            data.append('nominal_transfer', e.target.nominal_transfer.value);
            data.append('tanggal_konfirmasi', tanggalKonfirmasi);
            data.append('photo', e.target.gambar_bukti.files[0]);

            console.log(data);
            
            Axios.post('user/pembayaran-update', data)
                .then((response) => {
                    console.log(response.data);
                    
                    this.setState({
                        successSubmit : true
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
        }else{

        }
    }

    formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(money);
    }
    
    render () {
        if (!localStorage.getItem('token')) {
            return <Redirect to={'/login'} />
        }

        if (this.state.user) {

            if (!(this.props.match.params.user_id == this.state.user.id)) {
                return <Redirect to={'/login'} />
            }
        }
        
        // if succes update konfirm transfer then redirect to riwayat booking
        if(this.state.successSubmit) {
            // window.location.href = `/riwayat-booking/${this.props.match.params.user_id}`;
            return <Redirect to={`/riwayat-booking/${this.props.match.params.user_id}`} />
        }

        const {dataBooking, bookings} = this.state; 

        return (
            <React.Fragment>
                <main className="col">
                    <div id="content">
                        <article>
                            <section >
                                 {/* loading ketika simpan data */}
                                {this.state.loadingSave == false ? <LoaderSave /> : null}
                                
                                {/* loading ketika menampilkan data */}
                                {this.state.loadingGetData ? <LoaderGetData /> : 
                                    <div className="card mt-3">
                                        <div className="card-header">

                                            <div className="row">
                                                <div className="col-sm-11">
                                                    <div className="form-group">
                                                        Edit Konfirmasi Pembayaran (Transfer)
                                                    </div>
                                                </div>
                                                <div className="col-sm-1">
                                                    <Link  
                                                        to={`/riwayat-booking/${this.props.match.params.user_id}`} 
                                                        className="btn btn-warning btn-sm"
                                                    >
                                                        Kembali
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        <form onSubmit={this.handleSubmit}>
                                            {dataBooking.map((item, i) => 
                                                <ul className="list-group list-group-flush" key={i}>
                                                    <li className="list-group-item">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="">No. Booking</label>
                                                                    <input type="text" name="nomor_booking" defaultValue={item.nomor_booking} readOnly className="form-control" />
                                                                </div>

                                                                {bookings.map((booking, idx) =>
                                                                    <div className="form-group" key={idx}>
                                                                        <label htmlFor="">Total Bayar</label>
                                                                            <input type="text" name="harga_total" defaultValue={booking.harga_total} hidden className="form-control" />
                                                                            <input type="text" defaultValue={this.formatRupiah(booking.harga_total)} readOnly className="form-control" />
                                                                    </div>
                                                                )}

                                                                <div className="form-group">
                                                                    <label htmlFor="">dari Bank</label>
                                                                    <input type="text" name="dari_bank" defaultValue={item.dari_bank} className="form-control" />
                                                                    <span style={{ color: "red" }}>{this.state.errors["dari_bank"]}</span>
                                                                </div>

                                                                <div className="form-group">
                                                                    <label htmlFor="">ke Bank</label>
                                                                    <select name="ke_bank" className="form-control">
                                                                        <option value="">Pilih Bank Tujuan</option>
                                                                        <option value="bri" selected={"bri" === item.ke_bank}>Bri</option>
                                                                        <option value="bca" selected={"bca" === item.ke_bank}>Bca</option>
                                                                    </select>
                                                                    <span style={{ color: "red" }}>{this.state.errors["ke_bank"]}</span>
                                                                </div>

                                                                <div className="form-group">
                                                                    <label htmlFor="">No. Rekening</label>
                                                                    <input type="text" name="nomor_rekening" defaultValue={item.nomor_rekening} className="form-control" />
                                                                    <span style={{ color: "red" }}>{this.state.errors["nomor_rekening"]}</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="">Atas Nama</label>
                                                                    <input type="text" name="atas_nama" defaultValue={item.atas_nama} className="form-control" />
                                                                    <span style={{ color: "red" }}>{this.state.errors["atas_nama"]}</span>
                                                                </div>

                                                                <div className="form-group">
                                                                    <label htmlFor="">Nominal yang Ditransfer</label>
                                                                    <input type="text" name="nominal_transfer" defaultValue={item.nominal_transfer} className="form-control" />
                                                                    <span style={{ color: "red" }}>{this.state.errors["nominal_transfer"]}</span>
                                                                </div>

                                                                <div className="form-group">
                                                                    <label htmlFor="">Foto Bukti Transaksi</label>
                                                                    <br />
                                                                    <div className='resonsive-div-pelanggan'>
                                                                        <img src={`http://localhost:8000/${item.lokasi_gambar}`} height="200px" />
                                                                    </div>
                                                                </div>

                                                                <div className="form-group">
                                                                    <input type="file" name="gambar_bukti" className="form-control" />
                                                                    <span style={{ color: "red" }}>{this.state.errors["gambar_bukti"]}</span>
                                                                </div>
                                                                
                                                                <button type="submit" className="btn btn-success btn-sm">Submit</button>
                                                            </div>
                                                        </div>

                                                    </li>
                                                </ul>
                                            )}
                                        </form>
                                    </div>
                                }
                            </section>
                        </article>
                    </div>
                </main>
            </React.Fragment>
        )
    }
}