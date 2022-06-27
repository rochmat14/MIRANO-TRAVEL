import Axios from 'axios';
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import Loader from '../../../loading/LoadingData';

export default class CetakLaporanJadwal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            laporans : [],
        }
    }

    componentDidMount() {
        this.getLaporans(); 
    }

    getLaporans() { 
        let tanggal_booking;
        
        let kosong = "";
        
        if(this.props.match.params.tanggal_booking == "-") {
            tanggal_booking = kosong
        } else {
            tanggal_booking = this.props.match.params.tanggal_booking
        }
        
        let data = {
            tanggal_booking : tanggal_booking,
        }
        
        Axios.post('admin/laporan-booking', data)
            .then(response => {
                // this.setState({
                //     laporans : response.data
                // })
                const laporans = response.data;
                this.setState({laporans, loading: false})
            })
            .catch(error => {
                console.log(error)
            })
    }

    formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            // minimumFractionDigits: 2 //menambah 0 dibelakang koma
        }).format(money);
    } 

    keluar() {
        window.close();
    }

    print(){
        
        var printButton = document.getElementById("print");
        var keluarButton = document.getElementById("keluar");

        //Set the print button visibility to 'hidden' 
        printButton.style.visibility = 'hidden';
        keluarButton.style.visibility = 'hidden';

        //Print the page content
        window.print();
        printButton.style.visibility = 'visible';
        keluarButton.style.visibility = 'visible';
        
        return true;
    }

    render() {
        if(!localStorage.getItem('token_admin')) {
            window.location.href = "/admin/login";
        }
        
        const {laporans} = this.state;

        return(
            <React.Fragment>
                <main className="col">
                    <div id="content">
                        <article>
                            <section >
                                {this.state.loading ? <Loader /> :
                                    <div className="container-fluid">
                                        <h1 className="text-center mt-3 mb-3">Laporan Booking</h1>

                                        {(() => {
                                            if(laporans.length > 0) {
                                                return (
                                                    <React.Fragment>
                                                        <table className="table table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th>No.</th>
                                                                    <th>Nomor Booking</th>
                                                                    <th>Jadwal</th>
                                                                    <th>Pemesan (Customor)</th>
                                                                    <th>Jumlah Penumpang</th>
                                                                    <th>Harga Total</th>
                                                                    <th>Tanggal Booking</th>
                                                                    <th>Status Booking</th>
                                                                    <th>Status Bayar</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {laporans.map((laporan, i) =>
                                                                    <tr>
                                                                        <td>{i}</td>
                                                                        <td>{laporan.nomor_booking}</td>
                                                                        <td>{laporan.tanggal_berangkat}</td>
                                                                        <td>{laporan.nama}</td>
                                                                        <td>{laporan.jumlah_penumpang}</td>
                                                                        <td>{laporan.harga_total}</td>
                                                                        <td>{laporan.tanggal_booking}</td>
                                                                        <td>{laporan.status_booking}</td>
                                                                        <td>{laporan.status_bayar}</td>
                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>
                
                                                        <button onClick={this.keluar} id="keluar" className="btn btn-danger">Keluar</button>
                
                                                        <button onClick={this.print} id="print" className='btn btn-warning float-right'>Cetak</button>
                                                    </React.Fragment>
                                                )
                                            }else{
                                                return (
                                                    <React.Fragment>
                                                        <center>
                                                            <h3 className='mb-3'>Laporan Jadwal Tidak Ditemukan</h3>

                                                            <button onClick={this.keluar} id="keluar" className="btn btn-danger">Keluar</button>                                                        </center>

                                                    </React.Fragment>
                                                )
                                            }
                                        })()}
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