import React, { Component } from 'react';
import Axios from 'axios';

export default class BookingJadwal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            penumpang: [
                { 
                    nama_penumpang: "", 
                    nomor_id: "",
                    tempat_jemput: "",
                    nomor_kursi: ""
                }
            ],
            JumlahKursi : [],
            // jumlah_Penumpang: this.props.location.post_jumlahPenumpang,
            jumlah_Penumpang: this.props.match.params.jumlahPenumpang,
            // jadwal_Id: this.props.location.post_id,
            jadwal_Id: this.props.match.params.id,
            
            selectedGrades: []
        };
        this.selectNomorKursi = this.selectNomorKursi.bind(this);
    }

    componentDidMount() {  
        const config = {
            headers: {
                
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        };

        Axios.get('user', config).then(
            res => {
                this.setState({
                    user: res.data
                });
            },
            err => {
                console.log("anda belum login")
            }
        )

        this.addFormPenumpang();
        this.getJumlahKursi();
    }

    getJumlahKursi = () => {
        const data = {
            jadwal_id : this.props.match.params.jadwalId
        }
        
        Axios.post('jumlah-kursi', data)
            .then(response => this.setState({JumlahKursi : response.data}))
            .catch(error => console.log(error))
    }

    handleChange = (e) => {
        if (["nama_penumpang", "nomor_id", "tempat_jemput", "nomor_kursi"].includes(e.target.name)) {
            let penumpang = [...this.state.penumpang]
            penumpang[e.target.dataset.id][e.target.name] = e.target.value;
            this.setState({ penumpang })
        } else {
            this.setState({ [e.target.name]: e.target.value.toUpperCase() })
        }
    }

    addFormPenumpang = (e) => {
        for(let i = 1; i < this.state.jumlah_Penumpang; i++) {
            this.setState((prevState) => ({
                penumpang: [...prevState.penumpang, { nama_penumpang: "", nomor_id: "" }],
            }));
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

    // coding api for insert to database bookings
        const data = {
            jadwal_id        : e.target.jadwal_id.value,
            user_id          : e.target.user_id.value,
            jumlah_penumpang : e.target.jumlah_penumpang.value,
            harga_total      : e.target.harga_total.value,
            tanggal_booking  : e.target.tanggal_booking.value,
        }
    
        console.log(data);

        Axios.post('user/booking-create', data)
            .then(response => console.log(response.data))
            .catch(error => console.log(error))

    // coding api for insert data to database booking_details
        let bookingRincian = [];
        
        for (let i=0; i < this.state.penumpang.length; i++) {
            bookingRincian.push({
                nama_penumpang : this.state.penumpang[i].nama_penumpang,
                nomor_id       : this.state.penumpang[i].nomor_id,
                tempat_jemput  : this.state.penumpang[i].tempat_jemput,
                nomor_kursi    : this.state.penumpang[i].nomor_kursi,
                jadwal_id      : this.state.jadwal_Id,
            })
        }

        console.log(bookingRincian);

        Axios.post('user/booking-detail-create',{bookingRincian})
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }

    selectNomorKursi(e) {
        this.setState(
            {
                selectedGrades: {
                    ...this.state.selectedGrades,
                    [e.target.id]: e.target.value
                }
            },
            () => {
            }
        );
    }

    getOuput = () => {
        return Object.keys(this.state.selectedGrades).map(key => {
            // console.log(key);
            return { id: key, cid: this.state.selectedGrades[key] };
        });
    };
    
    render() {    
        // let  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];    
        let tahun = (new Date().getFullYear());
        let bulan = months[(new Date().getMonth())];
        let tanggal = (new Date().getDate());
        
        let i = '' ;
        let tableData = [];
        let opsiJumlahKursi = [];
        let dataUserNama;
        let dataUserGender;
        let dataUserAlamat;
        let dataUserTelepon;
        let dataUserEmail;

        let { penumpang, JumlahKursi } = this.state;

        // menguji jika array JumlahKursi kosong atau berisi
        // if(JumlahKursi.length) {
        //     console.log(JumlahKursi);
        // } else {
        //     console.log('array is empty');
        // }

        penumpang.map((val, i) => {
            let namaPenumpangId = `nama_penumpang-${i}`, nomorIdId = `nomor_id-${i}`, tempatJemputId = `tempat-jemput-${i}`, nomorKursiId = `nomor_kursi-${i}`
            tableData.push(
                <tr key={i}>
                    <td>{i+1}</td>
                    <td>
                        <input 
                            type="text" 
                            name="nama_penumpang" 
                            data-id={i}
                            id={namaPenumpangId}
                            // value={penumpang[i].nama_penumpang}
                            className="form-control" />
                    </td>
                    <td>
                        <input 
                            type="text" 
                            name="nomor_id"
                            data-id={i} 
                            id={nomorIdId}
                            // value={penumpang[i].nomor_id}
                            className="form-control" />
                    </td>
                    <td>
                        <input 
                            type="text" 
                            name="tempat_jemput"
                            data-id={i}
                            id={tempatJemputId} 
                            className="form-control" />
                    </td>
                    <td>
                        <select defaultValue="default" id={i} onChange={this.selectNomorKursi} name="nomor_kursi" data-id={i} id={nomorKursiId} className="form-control" >
                            <option value="default">Pilih Kursi</option>
                            {opsiJumlahKursi}
                        </select>
                    </td>
                </tr>
            );
        })   


        // for( i=1; i <= this.props.location.post_jumlahKursi; i++ ) {
        for( i=1; i <= parseInt(this.props.match.params.jumlahKursi) + Object.keys(JumlahKursi).length; i++ ) {
            opsiJumlahKursi.push(
                <option value={i} key={i} hidden={ this.getOuput().some(el => el.cid === `${i}`) || JumlahKursi.some(el => el.nomor_kursi === parseInt(`${i}`)) }>{i}</option>
            );
        }
        
        if(this.state.user){
            dataUserNama = (
                <React.Fragment>
                    <span> {this.state.user.nama}</span>
                    <span> <input type="text" name="nama_pemesan" defaultValue={this.state.user.nama} hidden /></span>
                    <span hidden> <input type="text" name="user_id" defaultValue={this.state.user.id}  /></span>
                </React.Fragment>
            )

            dataUserGender = (
                <React.Fragment>
                    <span> {this.state.user.jenis_kelamin}</span>
                    <span> <input type="text" name="jenis_kelamin" defaultValue={this.state.user.jenis_kelamin} hidden /></span>
                </React.Fragment>
            )

            dataUserAlamat = (
                <React.Fragment>
                    <span> {this.state.user.alamat}</span>
                    <span> <input type="text" name="alamat" defaultValue={this.state.user.alamat} hidden /></span>
                </React.Fragment>
            )

            dataUserTelepon = (
                <React.Fragment>
                    <span> {this.state.user.nomor_telepon}</span>
                    <span> <input type="text" name="nomor_telepon" defaultValue={this.state.user.nomor_telepon} hidden /></span>
                </React.Fragment>
            )

            dataUserEmail = (
                <React.Fragment>
                    <span> {this.state.user.email}</span>
                    <span> <input type="text" name="email" defaultValue={this.state.user.email} hidden /></span>
                </React.Fragment>
            )
        } else {
            dataUserNama = (
                <span>Anonym</span>
            )

            dataUserGender = (
                <span>Anonym</span>
            )

            dataUserAlamat = (
                <span>Anonym</span>
            )

            dataUserTelepon = (
                <span>Anonym</span>
            )

            dataUserEmail = (
                <span>Anonym</span>
            )
        }

        return(
            <React.Fragment>
                <div className="container-fluid">
                    <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                        <div className="card">
                            <div className="card-header">
                                Info Perjalanan
                            </div>
                            
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <span className="sub-list">Jenis Armada</span>
                                    <span style={{ marginLeft : '52px' }}>:</span>
                                    {/* <span>{this.props.location.post_jenisArmada}</span> */}
                                    <span>{this.props.match.params.jenis}</span>
                                </li>
                                <li className="list-group-item">
                                    <span className="sub-list">Jumlah Kursi</span>
                                    <span style={{ marginLeft : '58px' }}>:</span>
                                    {/* <span>{this.props.location.post_jumlahKursi}</span> */}
                                    <span>{parseInt(this.props.match.params.jumlahKursi) /*+ Object.keys(JumlahKursi).length*/}</span>
                                </li>
                                <li className="list-group-item">
                                    <span className="sub-list">Kota Asal</span>
                                    <span style={{ marginLeft : '82px' }}>:</span>
                                    {/* <span>{this.props.location.post_kotaAsal}</span> */}
                                    <span>{this.props.match.params.keberangkatan}</span>
                                </li>
                                <li className="list-group-item">
                                    <span className="sub-list">Kota Tujuan</span>
                                    <span style={{ marginLeft : '65px' }}>:</span>
                                    {/* <span>{this.props.location.post_kotaTujuan}</span> */}
                                    <span>{this.props.match.params.tujuan}</span>
                                </li>
                                <li className="list-group-item">
                                    <span className="sub-list">Berangkat</span>
                                    <span style={{ marginLeft : '78px' }}>:</span>
                                    {/* <span>{this.props.location.post_tanggalBerangkat}</span>
                                    <span><input type="text" name="jadwal_id" defaultValue={this.props.location.post_id} hidden /></span> */}
                                    <span>{this.props.match.params.tanggalBerangkat}</span>
                                    <span><input type="text" name="jadwal_id" defaultValue={this.props.match.params.id} hidden /></span>

                                </li>
                                <li className="list-group-item">
                                    <span className="sub-list">Jumlah Penumpang</span>
                                    <span style={{ marginLeft : '8px' }}>:</span>
                                    {/* <span>{this.state.jumlah_Penumpang}</span>
                                    <span><input type="text" name="jumlah_penumpang" defaultValue={this.state.jumlah_Penumpang} hidden /></span> */}
                                    <span>{this.state.jumlah_Penumpang}</span>
                                    <span><input type="text" name="jumlah_penumpang" defaultValue={this.state.jumlah_Penumpang} hidden /></span>

                                </li>
                                <li className="list-group-item" hidden>
                                    <span className="sub-list">Harga Total</span>
                                    <span style={{ marginLeft : '8px' }}>:</span>
                                    <span><input type="text" name="harga_total" defaultValue={this.props.location.post_harga_total} hidden /></span>
                                </li>
                            </ul>

                            <div className="card-header">Penumpang</div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th rowSpan="2">No</th>
                                                <th rowSpan="2">Nama</th>
                                                <th>{">= 17 th nomor ID (KTP/SIM)"}</th>
                                                <th rowSpan="2">Tempat Jemput</th>
                                                <th rowSpan="2">No. Kursi</th>
                                            </tr>
                                            <tr>
                                                <th>{"< 17 tgl lahir"}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tableData}
                                        </tbody>
                                    </table>
                                </li>
                            </ul>

                            <div className="card-header">Data Pemesan</div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <span>Nama </span>
                                    <span style={{ marginLeft : '66px' }}>:</span>
                                    {dataUserNama}
                                </li>
                                <li className="list-group-item">
                                    <span>Jenis Kelamin </span>
                                    <span style={{ marginLeft : '9px' }}>:</span>
                                    {dataUserGender}
                                </li>
                                <li className="list-group-item">
                                    <span>Alamat </span>
                                    <span style={{ marginLeft : '59px' }}>:</span>
                                    {dataUserAlamat}
                                </li>
                                <li className="list-group-item">
                                    <span>Nomor Telepon </span>
                                    <span>:</span>
                                    {dataUserTelepon}
                                </li>
                                <li className="list-group-item">
                                    <span>Email </span>
                                    <span style={{ marginLeft : '69px' }}>:</span>
                                    {dataUserEmail}
                                </li>
                                <li className="list-group-item" hidden>
                                    <span>Tanggal Booking</span>
                                    <span>:</span>
                                    <input type="text" name="tanggal_booking" defaultValue={tahun+"-"+bulan+"-"+tanggal} />
                                </li>
                            </ul>
                        </div>

                        <button className="btn btn-success btn-sm" type="submit" >SIMPAN</button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}