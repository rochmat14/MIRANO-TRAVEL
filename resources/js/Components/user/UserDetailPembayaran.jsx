import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';

import Loader from '../loading/LoadingData';

export default class DetailBayar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            dataBooking: [],
            bookings: []
        }
    }
    
    componentDidMount () {
        this.getDataPembayaran();
        this.getDataBooking();
    }
    
    getDataPembayaran () {
        const nomor_booking = {
            nomor_booking: this.props.match.params.nomor_booking
        }
        
        Axios.post('user/pembayaran', nomor_booking)
            .then((response) => {
                const dataBooking = response.data;
                this.setState({ dataBooking, loading: false })
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
        
        const {dataBooking, bookings} = this.state; 

        return (
            <React.Fragment>
                <main className="col">
                    <div id="content">
                        <article>
                            <section >
                                {this.state.loading ? <Loader /> : 
                                    <div className="card mt-3">
                                        <div className="card-header">

                                            <div className="row">
                                                <div className="col-sm-11">
                                                    <div className="form-group">
                                                        Detail Pembayaran (Transfer)
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
                                                                        <input type="text" name="harga_total" defaultValue={this.formatRupiah(booking.harga_total)} readOnly className="form-control" />
                                                                    </div>
                                                                )}

                                                                <div className="form-group">
                                                                    <label htmlFor="">dari Bank</label>
                                                                    <input type="text" name="dari_bank" defaultValue={item.dari_bank.toUpperCase()} readOnly className="form-control" />
                                                                </div>

                                                                <div className="form-group">
                                                                    <label htmlFor="">ke Bank</label>
                                                                    <input type="text" name="ke_bank" defaultValue={item.ke_bank.toUpperCase()} readOnly className="form-control" />
                                                                </div>

                                                                <div className="form-group">
                                                                    <label htmlFor="">No. Rekening</label>
                                                                    <input type="text" name="nomor_rekening" defaultValue={item.nomor_rekening} readOnly className="form-control" />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="">Atas Nama</label>
                                                                    <input type="text" name="atas_nama" defaultValue={item.atas_nama.toUpperCase()} readOnly className="form-control" />
                                                                </div>

                                                                <div className="form-group">
                                                                    <label htmlFor="">Nominal yang Ditransfer</label>
                                                                    <input type="text" name="nominal_transfer" defaultValue={this.formatRupiah(item.nominal_transfer)} readOnly className="form-control" />
                                                                </div>

                                                                <div className="form-group">
                                                                    <label htmlFor="">Foto Bukti Transaksi</label>
                                                                    <br />
                                                                    <div className='resonsive-div-pelanggan'>
                                                                        <img src={`http://localhost:8000/${item.lokasi_gambar}`} height="200px" />
                                                                    </div>
                                                                </div>
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