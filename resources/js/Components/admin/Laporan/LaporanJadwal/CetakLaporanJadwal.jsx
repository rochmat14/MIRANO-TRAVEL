import Axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// librari moment js
import moment from 'moment';
// agar moment js bahasa indonesia
import 'moment/locale/id';

import Loader from '../../../loading/LoadingData';

export default class CetakLaporanJadwal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            laporans: [],
        }
    }

    componentDidMount() {
        this.getLaporans();
    }

    getLaporans() {
        let tanggal_berangkat_value;
        let armada_value;
        let supir_value;

        let kosong = "";

        if (this.props.match.params.tanggal_berangkat == "-") {
            tanggal_berangkat_value = kosong
        } else {
            tanggal_berangkat_value = this.props.match.params.tanggal_berangkat
        }

        if (this.props.match.params.armada == "-") {
            armada_value = kosong
        } else {
            armada_value = this.props.match.params.armada
        }

        if (this.props.match.params.supir == "-") {
            supir_value = kosong
        } else {
            supir_value = this.props.match.params.supir
        }

        let data = {
            tanggal_berangkat: tanggal_berangkat_value,
            armada: armada_value,
            supir: supir_value
        }

        Axios.post('admin/cari-laporan-jadwal', data)
            .then(response => {
                // this.setState({
                //     laporans: response.data
                // })
                const laporans = response.data;
                this.setState({ laporans, loading: false })
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

    kembali() {
        window.close();

        return true;
    }    

    print() {
        
        var printButton = document.getElementById("print");
        var kembaliButton = document.getElementById("kembali");

        //Set the print button visibility to 'hidden' 
        printButton.style.visibility = 'hidden';
        kembaliButton.style.visibility = 'hidden';

        //Print the page content
        window.print();
        printButton.style.visibility = 'visible';
        kembaliButton.style.visibility = 'visible';
        
        return true;
    }
    
    render() {
        if (!localStorage.getItem('token_admin')) {
            return <Redirect to="/admin/login" />
        }

        const { laporans } = this.state;

        return (
            <React.Fragment>
                <main className="col">
                    <div id="content">
                        <article>
                            <section >
                                {this.state.loading ? <Loader /> : 
                                    <div className="container-fluid">
                                        <div id="printableArea">
                                            <h1 className="text-center mt-3 mb-3">Laporan Jadwal</h1>

                                            {(() => {
                                                if(laporans.length > 0) {
                                                    return (
                                                        <React.Fragment>
                                                            <table className="table table-bordered">
                                                                <thead>
                                                                    <tr>
                                                                        <th>No.</th>
                                                                        <th>Tgl Berangkat</th>
                                                                        <th>Armada</th>
                                                                        <th>Jumlah Kursi</th>
                                                                        <th>Jurusan</th>
                                                                        <th>Supir</th>
                                                                        <th>Harga Tiket</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {laporans.map((laporan, i) =>
                                                                        <tr key={i}>
                                                                            <td>{i+1}</td>
                                                                            <td>{moment(laporan.tanggal_berangkat).format('DD MMMM YYYY')}</td>
                                                                            <td>{laporan.jenis}</td>
                                                                            <td>{laporan.jumlah_kursi}</td>
                                                                            <td>{laporan.keberangkatan}</td>
                                                                            <td>{laporan.nama}</td>
                                                                            <td>{this.formatRupiah(laporan.harga_tiket)}</td>
                                                                        </tr>
                                                                    )}
                                                                </tbody>
                                                            </table>
                                                            
                                                            <button onClick={this.kembali} id="kembali" className='btn btn-danger'>Kembali</button>
                
                                                            <button onClick={this.print} id="print" className='btn btn-warning float-right'>Cetak</button>
                                                        </React.Fragment>
                                                    )
                                                }else{
                                                    return (
                                                        <React.Fragment>
                                                            <center>
                                                                <h3 className='mb-3'>Laporan Jadwal Tidak Ditemukan</h3>

                                                                <button onClick={this.kembali} id="kembali" className='btn btn-danger'>Kembali</button>
                                                            </center>

                                                        </React.Fragment>
                                                    )
                                                }
                                            })()}
                                        </div>

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