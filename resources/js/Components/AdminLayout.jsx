import { Route, Switch } from 'react-router-dom';
import React, {Component} from 'react';
import Axios from 'axios';

import AdminHeader                from '../Common/Admin/AdminHeader';
import AdminSidebar               from '../Common/Admin/AdminSidebar';
import AdminDashboard             from './admin/AdminDashboard';
import AdminUpdate                from './admin/Auth/AdminUpdate';
import AdminReadPelanggan         from './admin/Pelanggan/AdminReadPelanggan';
import AdminReadSupir             from './admin/Supir/AdminReadSupir';
import AdminReadArmada            from './admin/Armada/AdminReadArmada';
import AdminReadJurusan           from './admin/Jurusan/AdminReadJurusan';
import AdminReadJadwal            from './admin/Jadwal/AdminReadJadwal';
import AdminReadBooking           from './admin/booking/AdminReadBooking';
import CariLaporanJadwal          from './admin/Laporan/LaporanJadwal/CariLaporanJadwal';
import CariLaporanBooking         from './admin/Laporan/LaporanBooking/CariLaporanBooking';

export default class extends Component {
    state={};

    componentDidMount() {

        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        };

        Axios.get('user', config)
            .then((res) => {
                this.setUser(res.data)
        })
        .catch((error) => {
            console.log(error);
        });
    }

    setUser = user => {
        this.setState({
            user: user
        });
    }
    
    render () {
        return (
            <React.Fragment>
                <div>
                    {/* file "/Common/Admin/AdminHeader" */}
                    <AdminHeader />

                    <div className="row">
                        {/* file "/Common/Admin/AdminSidebar" */}
                        <AdminSidebar /> 

                        <Switch>
                            {/* file "/admin/AdminDashboard" */}
                            <Route exact path="/admin" component={AdminDashboard} />
                                                        
                            {/* file "/admin/Auth/AdminUpdate" */}
                            <Route exact path="/admin/update-admin" component={AdminUpdate} />
                            
                            {/* file "/admin/Pelanggan/AdminReadPelanggan" */}
                            <Route exact path="/admin/pelanggan" component={AdminReadPelanggan} />
                            
                            {/* file "/admin/Supir/AdminReadSupir" */}
                            <Route exact path="/admin/supir" component={AdminReadSupir} />
                            
                            {/* file "/admin/Armada/AdminReadArmada" */}
                            <Route exact path="/admin/armada" component={AdminReadArmada} />
                            
                            {/* file "/admin/Jurusan/AdminReadJurusan" */}
                            <Route exact path="/admin/jurusan" component={AdminReadJurusan} />
                            
                            {/* file "/admin/Jadwal/AdminReadJadwal" */}
                            <Route exact path="/admin/jadwal" component={AdminReadJadwal} />
                            
                            {/* file "/admin/booking/AdminReadBooking" */}
                            <Route exact path="/admin/data-booking" component={AdminReadBooking} />
                            
                            {/* file "/admin/Laporan/LaporanJadwal/CariLaporanJadwal" */}
                            <Route exact path="/admin/cari-laporan-jadwal" component={CariLaporanJadwal} /> 
                            
                            {/* file "/admin/Laporan/LaporanBooking/CariLaporanBooking" */}
                            <Route exact path="/admin/cari-laporan-booking" component={CariLaporanBooking} /> 
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}