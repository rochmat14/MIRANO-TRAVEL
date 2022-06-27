import Axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CariLaporanJadwal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            armadas : [],
            supirs : [],
            tanggal_berangkat : '',
            armada: '',
            supir:''
        }
    }

    componentDidMount() {
        this.getArmadas();
        this.getSupirs();
    }

    componentDidUpdate() {
        this.getArmadas();
        this.getSupirs();
    }

    getArmadas() {
        Axios.get('admin/armada')
            .then(response => {
                this.setState({
                    armadas : response.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    getSupirs() {
        Axios.get('admin/supir')
            .then(response => {
                this.setState({
                    supirs : response.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    tanggalBerangkat = (e) => {
        this.setState({ tanggal_berangkat: e.target.value });
    };

    getValueTanggalBerangkat() {
        return this.state.tanggal_berangkat;
    }

    armada = (e) => {
        this.setState({ armada: e.target.value });
    };

    getValueArmada() {
        return this.state.armada;
    }

    supir = (e) => {
        this.setState({ supir: e.target.value });
    };

    getValueSupir() {
        return this.state.supir;
    }

    render() {
        if(!localStorage.getItem('token_admin')) {
            window.location.href = "/admin/login";
        }
        
        const {armadas, supirs} = this.state;

        let valueTanggalBerangkat;
        let valueArmada ;
        let valueSupir;

        if(Object.keys(this.getValueTanggalBerangkat()).length == 0) {
            valueTanggalBerangkat = (
                "-"
            )
        } else {
            valueTanggalBerangkat = (
                this.getValueTanggalBerangkat()
            )
        }

        if(Object.keys(this.getValueArmada()).length == 0) {
            valueArmada = (
                "-"
            )
        } else {
            valueArmada = (
                this.getValueArmada()
            )
        }

        if(Object.keys(this.getValueSupir()).length == 0) {
            valueSupir = (
                "-"
            )
        } else {
            valueSupir = (
                this.getValueSupir()
            )
        }

        return(
            <React.Fragment>
                <main className="col">
                    <div id="content">
                        <article>
                            <section >
                                <div className="container-fluid">
                                    <h1 className="header-laporan-jadwal">Laporan Jadwal</h1>

                                    <div className="card">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">
                                                <div className="row">
                                                    <div className="form-group col-sm-4">
                                                        <label>Tanggal Berangkat</label>
                                                        <input type="date" onChange={this.tanggalBerangkat} className="form-control" />
                                                    </div>

                                                    <div className="form-group col-sm-4">
                                                        <label>Armada</label>
                                                        <select name="armada" onChange={this.armada} className="form-control">
                                                            <option value="-">Pilih Armada</option>
                                                            {armadas.map((armada, i) => 
                                                                <option value={armada.jenis} key={i}>{armada.jenis}</option>
                                                            )}
                                                        </select>
                                                    </div>

                                                    <div className="form-group col-sm-4">
                                                        <label>Supir</label>
                                                        <select name="supir" onChange={this.supir} className="form-control">
                                                            <option value="-">Pilih Supir</option>
                                                            {supirs.map((supir, i) => 
                                                                <option value={supir.nama} key={i}>{supir.nama}</option>
                                                            )}
                                                        </select>
                                                    </div>

                                                    <div className="col-sm-12">
                                                        <a target="_blank" href={`/admin/cetak-laporan-jadwal/${valueTanggalBerangkat}/${valueArmada}/${valueSupir}`} className="btn btn-warning btn-sm"><i className="fa fa-print"> Cari</i></a>
                                                    </div>
                                                </div>

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