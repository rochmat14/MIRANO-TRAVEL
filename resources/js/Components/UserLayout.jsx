import { Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import Axios from 'axios';

import UserHeader from '../Common/User/UserHeader';
import UserHome from './user/UserHome';
import UserUpdate from './user/Auth/UserUpdate';
import UserDaftarJadwal from './user/UserDaftarJadwal';
import UserPemesananJadwal from './user/UserPemesananJadwal';
import UserRiwayatBooking from './user/UserRiwayatBooking';
import UserKonfirmasiTransfer from './user/UserKonfirmasiTransfer';
import UserEditKonfirmasiTransfer from './user/UserEditKonfirmasiTransfer';
import UserDetailPembayaran from './user/UserDetailPembayaran';

export default class extends Component {
    state = {};

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

    render() {
        return (
            <React.Fragment>
                <div>
                    {/* file "/Common/User/UserHeader" */}
                    <UserHeader user={this.state.user} setUser={this.setUser} />

                    <div className="row" style={{ marginBottom: "19px" }}>
                        <Switch>

                            {/* file "/user/UserHome" */}
                            <Route exact path="/" component={UserHome} />

                            {/* file "/user/Auth/UserUpdate" */}
                            <Route exact path="/update-user" component={UserUpdate} />
                            
                            {/* file "/user/UserDaftarJadwal" */}
                            <Route exact path="/daftar-jadwal/:tanggalBerangkat/:kotaAsal/:kotaTujuan/:jumlahPenumpang" component={UserDaftarJadwal} />
                            
                            {/* file "/user/UserPemesananJadwal" */}
                            <Route exact path="/pemesanan-jadwal/:id/:jenis/:jumlahKursi/:keberangkatan/:tujuan/:tanggalBerangkat/:hargaTiket/:jumlahPenumpang/:jadwalId" component={UserPemesananJadwal} />
                            
                            {/* file "/user/UserRiwayatBooking" */}
                            <Route exact path="/riwayat-booking/:user_id" component={UserRiwayatBooking} />
                            
                            {/* file "/user/UserKonfirmasiTransfer" */}
                            <Route exact path="/konfirmasi-transfer/:nomor_booking/:user_id" component={UserKonfirmasiTransfer} />
                            
                            {/* file "/user/UserEditKonfirmasiTransfer" */}
                            <Route exact path="/konfirmasi-transfer-edit/:nomor_booking/:user_id" component={UserEditKonfirmasiTransfer} />
                            
                            {/* file "/user/UserDetailPembayaran" */}
                            <Route exact path="/detail-bayar/:nomor_booking/:user_id" component={UserDetailPembayaran} />
                        </Switch>
                    </div>

                    {/* <footer className='footer'>
                        <div className="text-center py-2 text-light">© 2021 Copyright: <span className='text-warning font-weight-bold'>Abdul Rochmat</span> 
                        </div>

                    </footer> */}
                </div>
            </React.Fragment >
        )
    }
}