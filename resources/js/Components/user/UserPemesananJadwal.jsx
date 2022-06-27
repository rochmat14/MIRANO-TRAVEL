import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';

// librari moment js
import moment from 'moment';
// agar moment js bahasa indonesia
import 'moment/locale/id';

const Loader = () => (
    <div className="divLoader">
        <svg className="svgLoader position-fixed" style={{ zIndex: 8, marginTop: "220px" }} viewBox="0 0 100 100" width="10em" height="10em">
            <path stroke="none" d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="red" transform="rotate(179.719 50 51)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 51;360 50 51" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></path>
        </svg>
    </div>
);

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            penumpang: [
                { 
                    nama_penumpang: "", 
                    nomor_id: "",
                    tempat_jemput: "",
                    nomor_kursi: ""
                }
            ],
            error : {},

            tanggal_berangkat : '',
            JumlahKursi : [],
            // jumlah_Penumpang: this.props.location.post_jumlahPenumpang,
            jumlah_Penumpang: this.props.match.params.jumlahPenumpang,
            // jadwal_Id: this.props.location.post_id,
            jadwal_Id: this.props.match.params.id,
            
            selectedGrades: [],
            disable: true
        };
    }

// menjalankan fungsi saat pertama kali halaman di buka
    componentDidMount() { 

        const config = {
            headers: {

            // mendapatkan token login yang tersimpan di local storage browser
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        };

        // url api untuk mendapatkan informasi identitas user
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

        // validasi inputan
        let formValidation = true;
        for (let i=0; i < this.state.penumpang.length; i++) {
            if(this.state.penumpang[i].nama_penumpang) {
                const error = [...this.state.penumpang]
                error[i].errorNamaPenumpang = ''
                this.setState({error})
            } else {
                const error = [...this.state.penumpang]
                error[i].errorNamaPenumpang = 'Nama penumpang belum di isi'
                this.setState({error})
                formValidation = false;
            }

            if(this.state.penumpang[i].nomor_id) {
                const error = [...this.state.penumpang]
                error[i].errorNomorId = ''
                this.setState({error})
            } else {
                const error = [...this.state.penumpang]
                error[i].errorNomorId = 'Nomor id belum di isi'
                this.setState({error})
                formValidation = false;
            }

            if (this.state.penumpang[i].tempat_jemput) {

                const error = [...this.state.penumpang]
                error[i].errorTempatJemput = ''
                this.setState({error})
            }  else {
                const error = [...this.state.penumpang]
                error[i].errorTempatJemput = 'Tempat jemput belum di isi'
                this.setState({error})
                formValidation = false;
            }


            if (this.state.penumpang[i].nomor_kursi) {

                const error = [...this.state.penumpang]
                error[i].errorNomorKursi = ''
                this.setState({error})
            }  else {
                const error = [...this.state.penumpang]
                error[i].errorNomorKursi = 'Nomor kursi nelum di pilih'
                this.setState({error})
                formValidation = false;
            }
        }
            
        // konsodi jika validasi benar maka menyimpan data
        if(formValidation == true) {
            // coding api for insert to database bookings
            this.setState({ loading: false })

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
                .then(response => {
                    // console.log(response)
    
                    this.setState({
                        success : true
                    })
                })
                .catch(error => console.log(error))
            
        }else{
            // alert("Data penumpang ada yang kosong");
        }
    }

    selectNomorKursi = (e) => {
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

    tanggalBerangkat = (e) => {
        this.setState({ tanggal_berangkat: e.target.value });
    };

    formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(money);
    }
    

    render() {     
        if(!localStorage.getItem('token')) {
            return <Redirect to={`/login`} />
        }
        
        if(this.state.success) {
            if(this.state.user){
                return <Redirect to={`/riwayat-booking/${this.state.user.id}`} />
            }
        }

        let idUser, namaUser, jenisKelaminUser, alamatUser, teleponUser, emailUser;

        if(this.state.user){
            idUser = (
                <React.Fragment>
                    <input type="text" name="user_id" defaultValue={this.state.user.id} hidden  />
                </React.Fragment>
            )

            namaUser = (
                <React.Fragment>
                    <input type="text" defaultValue={this.state.user.nama.toUpperCase()} readOnly className='form-control' />
                </React.Fragment>
            )

            jenisKelaminUser = (
                <React.Fragment>
                    <input type="text" defaultValue={this.state.user.jenis_kelamin.toUpperCase()} readOnly className='form-control' />
                </React.Fragment>
            )

            alamatUser = (
                <React.Fragment>
                    <input type="text" defaultValue={this.state.user.alamat.toUpperCase()} readOnly className='form-control' />
                </React.Fragment>
            )

            teleponUser = (
                <React.Fragment>
                    <input type="text" defaultValue={this.state.user.nomor_telepon} readOnly className='form-control' />
                </React.Fragment>
            )

            emailUser = (
                <React.Fragment>
                    <input type="text" defaultValue={this.state.user.email} readOnly className='form-control' />
                </React.Fragment>
            )
        }

        let tableData = [];
        let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];    
        let tahun = (new Date().getFullYear());
        let bulan = months[(new Date().getMonth())];
        let tanggal = (new Date().getDate());
        
        let i = '' ;
        let opsiJumlahKursi = [];

        let { penumpang, JumlahKursi } = this.state;

        penumpang.map((val, i) => {
            let namaPenumpangId = `nama_penumpang-${i}`, nomorIdId = `nomor_id-${i}`, tempatJemputId = `tempat-jemput-${i}`, nomorKursiId = `nomor_kursi-${i}`
            tableData.push(
                <React.Fragment key={i}>
                        <div className="card border-primary mb-4">
                            <div className="card-header bg-info border-primary">
                                <h4>Data Penumpang {i+1}</h4>
                            </div>

                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label htmlFor="">Nama</label>
                                            <input 
                                            type="text" 
                                            name="nama_penumpang" 
                                            data-id={i}
                                            id={namaPenumpangId}
                                            className="form-control" />
                                            {
                                                val.errorNamaPenumpang && (
                                                    <p className='text-danger'>{val.errorNamaPenumpang}</p>
                                                )
                                            }
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="">{">= 17 th nomor ID (KTP/SIM)"} <br /> {"< 17 tgl lahir"}</label>
                                            <input 
                                            type="number" 
                                            name="nomor_id"
                                            data-id={i} 
                                            id={nomorIdId}
                                            className="form-control" />
                                            {
                                                val.errorNomorId && (
                                                    <p className='text-danger'>{val.errorNomorId}</p>
                                                )
                                            }                                            
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label htmlFor="">Tempat Jemput</label>
                                            <input 
                                            type="text" 
                                            name="tempat_jemput"
                                            data-id={i}
                                            id={tempatJemputId} 
                                            className="form-control" />
                                            {
                                                val.errorTempatJemput && (
                                                    <p className='text-danger'>{val.errorTempatJemput}</p>
                                                )
                                            }   
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="">No.Kursi</label>
                                            <select defaultValue="default" id={i} onChange={this.selectNomorKursi} name="nomor_kursi" data-id={i} id={nomorKursiId} required className="form-control" >
                                                <option value="default">Pilih Kursi</option>
                                                {opsiJumlahKursi}
                                            </select>
                                            {
                                                val.errorNomorKursi && (
                                                    <p className='text-danger'>{val.errorNomorKursi}</p>
                                                )
                                            }   
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/* </div> */}
                </React.Fragment>
            );
        })  

        for( i=1; i <= parseInt(this.props.match.params.jumlahKursi) + Object.keys(JumlahKursi).length; i++ ) {
            opsiJumlahKursi.push(
                <option value={i} key={i} hidden={ this.getOuput().some(el => el.cid === `${i}`) || JumlahKursi.some(el => el.nomor_kursi === parseInt(`${i}`)) }>{i}</option>
            );
        }

        const hargaTotal = this.props.match.params.hargaTiket * this.props.match.params.jumlahPenumpang;

        const fontSizeKetentuan = {
            fontSize: '11px'
        };

        
        return (
            <React.Fragment>
                <main className="col">
                    <div id="content">
                        <article>
                            <section >
                                {this.state.loading == false ? <Loader /> : null}
                                
                                <div className="container-fluid">
                                    <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                                        <div className="row">
                                                <div className="col-sm-8 container-none-margin">
                                                    <div className="card border-primary mt-3 mb-4">
                                                        <div className="card-header border-primary">
                                                            <span className="h3">Data Pemesan</span>
                                                        </div>

                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="">Nama</label>
                                                                        {namaUser}
                                                                    </div>
                                                                </div>

                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="">Jenis Kelamin</label>
                                                                        {jenisKelaminUser}
                                                                    </div>
                                                                </div>

                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="">Alamat</label>
                                                                        {alamatUser}
                                                                    </div>
                                                                </div>

                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="">Nomor Telepon</label>
                                                                        {teleponUser}
                                                                    </div>
                                                                </div>

                                                                <div className="col-sm-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="">Email</label>
                                                                        {emailUser}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <input type="text" name="jadwal_id" hidden defaultValue={this.state.jadwal_Id} />
                                                            {idUser}
                                                            <input type="text" name="jumlah_penumpang" hidden defaultValue={this.state.jumlah_Penumpang} />
                                                            <input type="text" name="harga_total" hidden defaultValue={this.props.match.params.hargaTiket * this.props.match.params.jumlahPenumpang} />
                                                            <input type="text" name="tanggal_booking" hidden defaultValue={tahun+"-"+bulan+"-"+tanggal} />
                                                        </div>
                                                    </div>
                                                    
                                                    {tableData}
                                                </div>

                                                <div className="col-sm-4 mb-3 container-none-margin">
                                                    <div className="card border-warning mt-3">
                                                        <div className="card-header text-center bg-warning">
                                                            <h3>
                                                                Total {this.formatRupiah(this.props.match.params.hargaTiket * this.props.match.params.jumlahPenumpang)} 
                                                            </h3>
                                                        </div>

                                                        <div className="card-body">
                                                            <h5>{moment(this.props.match.params.tanggalBerangkat).format('dddd, DD MMMM YYYY')}</h5>

                                                            <h2 className="font-weight-bold">{this.props.match.params.jenis.toUpperCase()}</h2>

                                                            <span className="font-weight-bold">Jumlah Kursi : {this.props.match.params.jumlahKursi}</span>
                                                            <br />

                                                            <span className="font-weight-bold">Tiket Per Orang : {this.formatRupiah(this.props.match.params.hargaTiket)}</span>
                                                            <br />
                                                            <br />
                                                            
                                                            <span>Jumlan Penumpang : {this.props.match.params.jumlahPenumpang} Orang</span>
                                                            
                                                            <br />
                                                            
                                                            <center><h5>Jurusan</h5></center>

                                                            <div className="row">
                                                                <div className="col-md-5">{this.props.match.params.keberangkatan.toUpperCase()}</div>
                                                                <div className="col-md-2"><center><i className="fa fa-arrow-right floa"></i></center></div>
                                                                <div className="col-md-5 floa"><span className="float-right">{this.props.match.params.tujuan.toUpperCase()}</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-8 container-none-margin">
                                                    {/* <Link to={{ 
                                                        pathname : '/pemesanan-jadwal',
                                                        post_id : "l",
                                                        post_jenisArmada : "l",
                                                        post_jumlahKursi : "l",
                                                        post_kotaAsal : "l",
                                                        post_kotaTujuan : "l",
                                                        post_tanggalBerangkat : "l",
                                                        post_hargaTiket : "l",
                                                        post_jumlahPenumpang : this.props.location.post_jumlahPenumpang,
                                                    }} 
                                                    className="btn btn-info float-right">Pesan</Link> */}

                                                    <button className="btn btn-info float-right mb-3" type="submit" >SIMPAN</button>

                                                    <Link to={`/daftar-jadwal/${this.props.match.params.tanggalBerangkat}/${this.props.match.params.keberangkatan}/${this.props.match.params.tujuan}/${this.props.match.params.jumlahPenumpang}`} 
                                                        className="btn btn-warning float-sm-left">
                                                        Cari Jadwal
                                                    </Link>
                                                </div>

                                                <div className="col-md-4"></div>
                                        </div>
                                    </form>
                                </div>
                            </section>
                        </article>
                    </div>
                </main>
            </React.Fragment>
        )
    }
}