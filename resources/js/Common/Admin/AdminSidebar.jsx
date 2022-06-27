import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleSidebarActive: false,  
            toggleDropdownAdmin: false,
            toggleDropdownMasterDataActive: false,
            toggleDropdownLaporanActive: false,
        }
    }

    componentDidMount() {
        this.getDataAdmin();
        this.getDataUser();
    }  

    getDataAdmin() {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token_admin')
            }
        };

        if(!localStorage.getItem('token_admin')) {
            // console.log("belum login");
        } else {
            Axios.get('admin', config).then(
                res => {
                    this.setAdmin(res.data);
                },
                err => {
                    console.log(err)
                }
            )
        }
    }

    setAdmin = admin => {
        this.setState({
            admin: admin
        });
    }

    getDataUser() {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        };

        if(!localStorage.getItem('token')) {
            // console.log("belum login");
        } else {
            Axios.get('user', config).then(
                res => {
                    this.setUser(res.data);
                },
                err => {
                    console.log(err)
                }
            )
        }
    }

    setUser = user => {
        this.setState({
            user: user
        });
    }

    handleLogout = () => {
        localStorage.removeItem('token_admin');
        
        this.setAdmin(null);
    }

    toggleSidebar = () => {
        this.setState(prevState => ({ toggleSidebarActive: !prevState.toggleSidebarActive }));
    };

    toggleDropdownAdmin = () => {
        this.setState(prevState => ({ toggleDropdownAdminActive: !prevState.toggleDropdownAdminActive }));
    };
    
    toggleDropdownMasterData = () => {
        this.setState(prevState => ({ toggleDropdownMasterDataActive: !prevState.toggleDropdownMasterDataActive }));
    };

    toggleDropdownLaporan = () => {
        this.setState(prevState => ({ toggleDropdownLaporanActive: !prevState.toggleDropdownLaporanActive }));
    };

    render() {
        const { 
            toggleDropdownAdminActive, 
            toggleDropdownMasterDataActive, 
            toggleDropdownLaporanActive, 
            toggleSidebarActive 
        } = this.state;

        let namaAdmin;

        if(this.state.admin) {
            namaAdmin =(
                <React.Fragment>
                    {this.state.admin.nama}
                </React.Fragment>
            )
        } else {
            namaAdmin =(
                <React.Fragment>
                    Unknow
                </React.Fragment>
            )
        }

        return (
            <React.Fragment>
                 <div id="toggle" onClick={this.toggleSidebar}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div> 

                <div id="sidebar-container" className={`sidebar-android sidebar-expanded d-md-block responsive-sidebar  ${toggleSidebarActive ? "" : "sidebar-active"}`}>
                    <ul className="list-group">  
                        <li className="dropdown btn-MD list-group-item font-weight-bold text-bl" onClick={this.toggleDropdownAdmin}>
                            <span className="fas fa-user"></span>&nbsp;
                            {namaAdmin}
                        </li>
                        <ul id="seconddiv" className={`dropdown-container MD list-btn ${toggleDropdownAdminActive ? "slide-admin" : ""}`}>
                            <li className="list-group-item font-weight-bold bg-bl">
                                <Link to={'/admin/update-admin'}><i className="fa fa-edit"></i> Update Akun</Link>
                            </li>

                            <li className="list-group-item font-weight-bold bg-bl">
                                <span className="fas fa-sign-out-alt text-list"></span>&nbsp;
                                <Link to="/admin/login" onClick={this.handleLogout}>Logout</Link>
                            </li>
                        </ul>
                        
                        <li className="dropdown btn-MD list-group-item font-weight-bold text-bl">
                            <span className="fas fa-tachometer-alt"></span>&nbsp;
                            <Link to="/admin" className="text-bl">Dashboard</Link>
                        </li>
                    
                        <li className="dropdown btn-MD list-group-item font-weight-bold text-bl" onClick={this.toggleDropdownMasterData}>
                            <span className="fa fa-server"></span>&nbsp;
                            Master Data &nbsp;
                            <span className="fa fa-arrow-down"></span>
                        </li>
                        <ul id="seconddiv" className={`dropdown-container MD list-btn ${toggleDropdownMasterDataActive ? "slide-master-data" : ""}`}>
                            <li className="list-group-item font-weight-bold bg-bl">
                                <span className="fa fa-database text-list"></span>&nbsp;
                                <Link to="/admin/pelanggan">Data Pelanggan</Link>
                            </li>
                        
                            <li className="list-group-item font-weight-bold bg-bl">
                                <span className="fa fa-database text-list"></span>&nbsp;
                                <Link to="/admin/supir">Data Supir</Link>
                            </li>

                        
                            <li className="list-group-item font-weight-bold bg-bl">
                                <span className="fa fa-database text-list"></span>&nbsp;
                                <Link to="/admin/armada">Data Armada</Link>
                            </li>

                            <li className="list-group-item font-weight-bold bg-bl">
                                <span className="fa fa-database text-list"></span>&nbsp;
                                <Link to="/admin/jurusan">Data Jurusan</Link>
                            </li>
                        
                            <li className="list-group-item font-weight-bold bg-bl">
                                <span className="fa fa-database text-list"></span>&nbsp;
                                <Link to="/admin/jadwal">Data Jadwal</Link>
                            </li>
                        </ul>

                        <li className="dropdown btn-MD list-group-item font-weight-bold text-bl">
                                <span className="fa fa-database"></span>&nbsp;
                                <Link to="/admin/data-booking" className="text-bl"> Data Booking</Link>
                        </li>
        
                        
                        <li className="dropdown btn-MD list-group-item font-weight-bold text-bl" onClick={this.toggleDropdownLaporan}>
                            <span className="fas fa-server"></span>&nbsp;
                            Laporan &nbsp;
                            <span className="fa fa-arrow-down"></span>
                        </li>
                        <ul id="seconddiv" className={`dropdown-container MD list-btn ${toggleDropdownLaporanActive ? "slide-laporan" : ""}`}>
                            <li className="list-group-item font-weight-bold bg-bl">
                                <span className="fas fa-print text-list"></span>&nbsp;
                                <Link to="/admin/cari-laporan-jadwal">Laporan Jadwal</Link>
                            </li>
                        
                            <li className="list-group-item font-weight-bold bg-bl">
                                <span className="fas fa-print text-list"></span>&nbsp;
                                <Link to="/admin/cari-laporan-booking">Laporan Booking</Link>
                            </li>
                        </ul>

                        <li className="dropdown btn-MD list-group-item font-weight-bold text-bl">
                            <span className="fa fa-eye"></span>&nbsp;
                            <Link to="/" className="text-bl"> Lihat Website</Link>
                        </li>
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}