import { Button, ButtonToolbar } from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import React, { Component } from 'react';
import Axios from 'axios';

import Loader from '../../loading/LoadingData';
import {AdminUpdatePelanggan} from './AdminUpdatePelanggan';

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading : true,
            pelanggans : [],
            addModalShow: false,
            editModalShow: false
        }
    }

    componentDidMount() {
        this.getPelanggans();
        // this.dataPelanggan();
    }

    componentDidUpdate() {
        this.getPelanggans();
    }

    

    dataPelanggan() {
        this.setState({
            pelanggans:[
                {"nama" : "ujang", "jenis_kelamin" : "laki-laki",  "nomor_telepon" : "0812-6161-781", "alamat" : "kp.rancaekek", "email" : "ujang@yahoo.com"},
                {"nama" : "maman", "jenis_kelamin" : "laki-laki",  "nomor_telepon" : "0838-4479-8871", "alamat" : "kp.bajong soang", "email" : "maman@yahoo.com"}
            ]
        });
    }

    getPelanggans() {
        Axios.get('data-user')
            .then(response => {
                // this.setState({
                //     pelanggans : response.data
                // })

                const pelanggans = response.data;
                this.setState({ pelanggans, loading: false })
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteSupir(id, event) {
        Axios.delete(`admin/supir-delete/${id}`)
            .then(response => console.log('Data supir berhasil di hapus'))
            .catch(error => console.log(error));
    }
    
    render() {
        
        if(!localStorage.getItem('token_admin')) {
            return <Redirect to="/admin/login" />
        }
        
        const {pelanggans, id, email} = this.state;

        let addModalClose = () => this.setState({addModalShow: false});
        let editModalClose = () => this.setState({editModalShow: false});
        
        return(
            <React.Fragment>
                <main className="col">
                    <div id="content">
                        <article>
                            <section >
                                <div className="container-fluid">
                                    <h1>Data Pelanggan/User</h1>

                                    {this.state.loading ? <Loader /> : 
                                        <React.Fragment>
                                            <div className="resonsive-div-table-pelanggan table-web-admin">
                                                <table className="mt-4 table border table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>No</th>
                                                            <th>Nama</th>
                                                            <th>Nomor Telepon</th>
                                                            <th>Alamat</th>
                                                            <th>Email</th>
                                                            <th>Opsi</th>
                                                        </tr>
                                                    </thead>
        
                                                    <tbody>
                                                        {pelanggans.map((pelanggan , i) => 
                                                            <tr key = {pelanggan.id}>
                                                                <td>{i+1}</td>
                                                                <td>{pelanggan.nama.toUpperCase()}</td>
                                                                <td>{pelanggan.nomor_telepon}</td>
                                                                <td>{pelanggan.alamat.toUpperCase()}</td>
                                                                <td>{pelanggan.email}</td>
                                                                <td>
                                                                    <div className="row">
                                                                        <div className="col-sm-3">
                                                                            <Button
                                                                                variant='warning btn-sm'
                                                                                onClick={() => this.setState({
                                                                                    editModalShow:true, 
                                                                                    id:pelanggan.id, 
                                                                                    email:pelanggan.email,
                                                                                })}
                                                                            >Edit</Button>
                                                                        </div>
        
                                                                        {/* <div className="col-sm-3">
                                                                            <button className="btn btn-danger" onClick={(event) => this.deleteSupir(supir.id, event)}>Hapus</button>
                                                                        </div> */}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
        
        
                                            {/* tampilan data pelanggan ketika mode android */}
                                            {pelanggans.map((pelanggan, i) =>
                                                <div key={i} className="card mt-4 table-android-admin">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <center><label className="font-weight-bold">Nama</label></center>
                                                                    <center><p>{pelanggan.nama.toUpperCase()}</p></center>
                                                                </div>
                                                            
                                                                <div className="form-group">
                                                                    <center><label className='font-weight-bold'>Jenis Kelamin</label></center>
                                                                    <center><p>{pelanggan.jenis_kelamin.toUpperCase()}</p></center>
                                                                </div>
        
                                                                <div className="form-group">
                                                                    <center><label className="font-weight-bold">Nomor Telepon</label></center>
                                                                    <center><p>{pelanggan.nomor_telepon}</p></center>
                                                                </div>
                                                            </div>
        
                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <center><label className="font-weight-bold">Alamat</label></center>
                                                                    <center><p>{pelanggan.alamat.toUpperCase()}</p></center>
                                                                </div>
        
                                                                <div className="form-group">
                                                                    <center><label className="font-weight-bold">Email</label></center>
                                                                    <center><p>{pelanggan.email}</p></center>
                                                                </div>
        
                                                                <div className="form-group">
                                                                        <Button
                                                                            variant='warning btn-sm'
                                                                            onClick={() => this.setState({
                                                                                editModalShow:true, 
                                                                                id:pelanggan.id, 
                                                                                email:pelanggan.email,
                                                                            })}
                                                                        ><i className="fa fa-edit">Edit</i></Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </React.Fragment>
                                    }
                                    
                                    <AdminUpdatePelanggan
                                        show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        post_id = {id}
                                        post_email = {email}
                                    />
                                </div>
                            </section>
                        </article>
                    </div>
                </main>
            </React.Fragment>
        )
    }
}