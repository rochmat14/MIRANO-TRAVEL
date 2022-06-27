import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';


export default class extends Component {
    constructor() {
        super();
        this.state = {
            jadwals: [],
            tanggal_berangkat: '',
            kota_asal: '',
            kota_tujuan: '',
            jumlah_penumpang: '',
            toggleDropdownUserActive: false,
        };
    }

    componentDidMount() {
        this.getTglKeberangkatan();
        this.getJadwal();
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

    toggleDropdownUser = () => {
        this.setState(prevState => ({ toggleDropdownUserActive: !prevState.toggleDropdownUserActive }));
    };

    scrollSidebar() {
        if (window.innerWidth <= 700) {
            // do any 480 width stuff here, or simply do nothing
            return;
        } else {
            if (document.getElementById("sidebar-user") !== null) {
                if (document.body.scrollTop > 59 || document.documentElement.scrollTop > 56) {
                    document.getElementById("sidebar-user").style.top = "0px";
                } else {
                    document.getElementById("sidebar-user").style.top = "56px";
                }
            }
            // do all your cool stuff here for larger screens
        }
    }

    render() {
        window.onscroll = this.scrollSidebar; //single function

        const { jadwals } = this.state;

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


        let cariTanggalBerangkat, cariKotaAsal, cariKotaTujuan;

        if (this.state.tanggal_berangkat == 0) {
            cariTanggalBerangkat = "kosong"
        } else {
            cariTanggalBerangkat = this.state.tanggal_berangkat
        }

        if (this.state.kota_asal == 0) {
            cariKotaAsal = "kosong"
        } else {
            cariKotaAsal = this.state.kota_asal
        }

        if (this.state.kota_tujuan == 0) {
            cariKotaTujuan = "kosong"
        } else {
            cariKotaTujuan = this.state.kota_tujuan
        }

        return (
            <React.Fragment>
                <div id="sidebar-user" className={`sidebar-expanded-user d-md-block  sidebar-active-user-home`}>
                    <ul className="list-group">
                        <li className="dropdown-container list-group-item font-weight-bold ml--5">
                            <div className="form-group">
                                <select onChange={this.tanggalBerangkat} className="form-control">
                                    <option value="">Tanggal Berangkat</option>
                                    {tanggal_keberangkatan.map((tgl_berangkat) => (
                                        <option key={tgl_berangkat.id} value={tgl_berangkat.tanggal_berangkat}>{tgl_berangkat.tanggal_berangkat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <select onChange={this.kotaAsal} className="form-control">
                                    <option value="">Pilih Kota Asal</option>
                                    {kotas_asal.map((jadwal) => (
                                        <option key={jadwal.id} value={jadwal.keberangkatan}>{jadwal.keberangkatan.toUpperCase()}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <select onChange={this.kotaTujuan} className="form-control">
                                    <option value="">Pilih Kota Tujuan</option>
                                    {kotas_tujuan.map((jadwal) =>
                                        <option key={jadwal.id} value={jadwal.tujuan}>{jadwal.tujuan.toUpperCase()}</option>
                                    )}
                                </select>
                            </div>

                            <div className="form-group">
                                <select onChange={this.JumlahPenumpang} className="form-control">
                                    <option value="">Jumlah Penumpang</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>


                            {(() => {
                                if (!this.state.tanggal_berangkat == 0 && !this.state.jumlah_penumpang == 0) {
                                    return (
                                        <Link
                                            to={`/daftar-jadwal/${cariTanggalBerangkat}/${cariKotaAsal}/${cariKotaTujuan}/${this.state.jumlah_penumpang}`}
                                            className="btn btn-warning btn-sm btn-block">
                                            Cari Jadwal
                                        </Link>
                                    )
                                } else {
                                    return (
                                        <button className="btn btn-warning btn-sm btn-block" disabled>Cari Jadwal</button>
                                    )
                                }
                            })()}
                            {/* {(() => {
                                if(
                                    !this.state.tanggal_berangkat == 0 &&
                                    !this.state.kota_asal == 0 &&
                                    !this.state.kota_tujuan == 0 &&
                                    !this.state.jumlah_penumpang == 0
                                ) {
                                    return ( */}
                            {/* <Link 
                                            to={`/daftar-jadwal/${this.state.tanggal_berangkat}/${this.state.kota_asal}/${this.state.kota_tujuan}/${this.state.jumlah_penumpang}`}
                                            className="btn btn-warning btn-sm btn-block">
                                            Cari Jadwal
                                        </Link> */}
                            {/* )
                                }else{
                                    return (
                                        <button className='btn btn-warning btn-sm btn-block' disabled>Cari Jadwal</button>
                                    )
                                }
                            })()} */}
                        </li>
                    </ul>

                    {/* {riwayatBooking} */}
                </div>
            </React.Fragment>
        )
    }
}