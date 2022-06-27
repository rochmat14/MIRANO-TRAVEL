import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import Axios from 'axios';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    
    handleLogout = () => {
        localStorage.removeItem('token');
        
        this.props.setUser(null);
    }
    
    render() {
        let dataUser, riwayatBooking;

        if (this.props.user) {
            dataUser = (
                <React.Fragment>
                    <span className="navbar-text">
                        <div className="pull-right">
                            <ul className="nav pull-right">
                                <li className="dropdown"><a href="#" className="dropdown-toggle text-white" data-toggle="dropdown">Hallo, {this.props.user.nama.toUpperCase()} <b className="caret"></b></a>
                                    <ul className="dropdown-menu bg-warning">
                                        <Link to="/update-user" className='dropdown-item font-weight-bold'>Ubah</Link>
                                        <div className="dropdown-divider"></div>
                                        <button onClick={this.handleLogout} className="dropdown-item font-weight-bold">Keluar</button>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </span>
                </React.Fragment>
            )

            riwayatBooking = (
                <React.Fragment>
                    <li className="nav-item">
                        <Link to={`/riwayat-booking/${this.props.user.id}`} className="nav-link text-white">Riwayat Booking</Link>
                    </li>
                </React.Fragment>
            )
        } else {
            dataUser = (
                <React.Fragment>
                    <div className="navbar-collapse w-100 order-3 dual-collapse2">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link text-white">LOGIN</Link>
                            </li>
                        </ul>
                    </div>
                </React.Fragment>
            )
        }
        
        return(
            <React.Fragment>
                <nav style={{ zIndex: "4" }} className="navbar navbar-expand-lg navbar-light bg-info">
                        <Link to="" className="navbar-brand text-warning font-weight-bold">Mirano Travel</Link>
                        
                        <button className="navbar-toggler bg-warning" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to={``} className="nav-link text-white">Home</Link>
                            </li>
                            {riwayatBooking}
                            {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </li> */}
                            </ul>

                            {dataUser}
                        </div>
                    </nav>
            </React.Fragment>
        )
    }
}