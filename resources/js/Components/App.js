import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../Scss/App.scss';
import '../fontawesome-free/css/all.min.css';
Axios.defaults.baseURL = "http://localhost:8000/api/mirano-travel/";

import AdminRegister            from './admin/Auth/AdminRegister';
import AdminLogin               from './admin/Auth/AdminLogin';
import AdminForgotPassword      from './admin/Auth/AdminForgotPassword';
import CetakLaporanJadwal       from './admin/Laporan/LaporanJadwal/CetakLaporanJadwal';
import CetakLaporanBooking      from './admin/Laporan/LaporanBooking/CetakLaporanBooking';
import AdminLayout              from './AdminLayout';

import UserRegister             from './user/Auth/UserRegister';
import UserLogin                from './user/Auth/UserLogin';
import UserForgotPassword       from './user/Auth/UserForgotPassword';
import UserLayout               from './UserLayout';

class App extends Component {
    state={};

    render () {
        return (
            <BrowserRouter>
                <Switch>
                    {/* file "/admin/Auth/AdminRegister" */}
                    <Route exact path="/admin/register" component={AdminRegister} />
                    
                    {/* file "/admin/Auth/AdminLogin" */}
                    <Route exact path="/admin/login" component={() => <AdminLogin setAdmin={this.setAdmin} />} />

                    {/* file "/admin/Auth/AdminForgotPassword" */}
                    <Route exact path="/admin/forgot-password" component={AdminForgotPassword} />

                    {/* file "/admin/Laporan/LaporanJadwal/CetakLaporanJadwal" */}
                    <Route exact path="/admin/cetak-laporan-jadwal/:tanggal_berangkat/:armada/:supir" component={CetakLaporanJadwal} /> 
                    
                    {/* file "/admin/Laporan/LaporanBooking/CetakLaporanBooking" */}
                    <Route exact path="/admin/cetak-laporan-booking/:tanggal_booking" component={CetakLaporanBooking} /> 
                                        
                    {/* file "/AdminLayout" */}
                    <Route path="/admin" component={AdminLayout} />



                    {/* file "/user/Auth/UserRegister" */}
                    <Route exact path="/register" component={UserRegister} />
                    
                    {/* file "/user/Auth/UserLogin" */}
                    <Route exact path="/login" component={() => <UserLogin setUser={this.setUser} />} />
                
                    {/* file "/user/Auth/UserForgotPassword" */}
                    <Route exact path="/forgot-password" component={UserForgotPassword} />
                    
                    {/* file "/UserLayout" */}
                    <Route path="" component={UserLayout} />
                </Switch>
            </BrowserRouter>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('app'))