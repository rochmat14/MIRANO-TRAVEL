import Axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CariLaporanBooking extends Component {
    constructor(props) {
        super(props);

        this.state = {
            armadas : [],
            supirs : [],
            tanggal_booking : '',
        }
    }

    tanggalBooking = (e) => {
        this.setState({ tanggal_booking: e.target.value });
    };

    getValueTanggalBooking() {
        return this.state.tanggal_booking;
    }

    render() {
        if(!localStorage.getItem('token_admin')) {
            window.location.href = "/admin/login";
        }
        
        const {armadas, supirs} = this.state;

        let valueTanggalBooking;

        if(Object.keys(this.getValueTanggalBooking()).length == 0) {
            valueTanggalBooking = (
                "-"
            )
        } else {
            valueTanggalBooking = (
                this.getValueTanggalBooking()
            )
        }

        return(
            <React.Fragment>
                <main className="col">
                    <div id="content">
                        <article>
                            <section >
                                <div className="container-fluid">
                                    <h1 className="cetak-laporan-booking">Laporan Booking</h1>

                                    <div className="card">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">
                                                <div className="row">
                                                    <div className="form-group col-sm-4">
                                                        <label>Tanggal Booking</label>
                                                        <input type="date" onChange={this.tanggalBooking} className="form-control" />
                                                    </div>
                                                </div>

                                                <a target="_blank" href={`/admin/cetak-laporan-booking/${valueTanggalBooking}`} className="btn btn-warning btn-sm"><i className="fa fa-print"> Cetak</i></a>
                                            </li>
                                        </ul>
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