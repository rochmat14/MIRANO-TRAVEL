import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';

export default class CariJadwal extends Component{

    constructor() {
        super();
        this.state = { 
          jadwals:[],
          tanggal_berangkat: '',
          kota_asal: '',
          kota_tujuan: '',
          jumlah_penumpang: '' 
        };
      }

      componentDidMount() {
        this.getTglKeberangkatan();
        
        this.getJadwal();

        console.log("hallo");
      }

      getTglKeberangkatan() {
        Axios.get('admin/jadwal')
          .then(response => {
            this.setState({
              tanggal_keberangkatan : response.data
            })
          })
          .catch(error => console.log(error))
      }

      getJadwal() {
        Axios.get('admin/jadwal')
          .then(response => {
            this.setState({
              jadwals : response.data
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

      getOuput = () => {
          // return {  kota_asal: this.state.kota_asal };
          return this.state.kota_asal;
      };

      render() {
        const {jadwals} = this.state;

        let nilaiKotaAsal;

        const tanggal_keberangkatan = Object.values(jadwals.reduce((r,c) => { 
          r[c.tanggal_berangkat] = c 
          return r
        }, {}));

        const kotas_asal = Object.values(jadwals.reduce((r,c) => { 
          r[c.keberangkatan] = c 
          return r
        }, {}));

        const kotas_tujuan = Object.values(jadwals.reduce((r,c) => { 
          r[c.tujuan] = c 
          return r
        }, {}));

    

        if(Object.keys(this.getOuput()).length == 0) {
          nilaiKotaAsal = (
            "-"
          )
        } else {
          nilaiKotaAsal = (
            this.getOuput()
          )
        }

        console.log("hallo");
        
        return (
          <React.Fragment>  
            <div className="form-group">    
              <label>Tanggal Berangkat</label>  
              <select onChange={this.tanggalBerangkat} className="form-control">
                <option value="">Pilih Tanggal Berangkat</option>  
                {tanggal_keberangkatan.map((tgl_berangkat) => (
                  <option key={tgl_berangkat.id} value={tgl_berangkat.tanggal_berangkat}>{tgl_berangkat.tanggal_berangkat}</option>
                ))}
              </select>    
            </div>

            <div className="form-group">
              <label>Kota Asal</label>
              <select onChange={this.kotaAsal} className="form-control">
                <option value="">Pilih Kota Asal</option>  
                {kotas_asal.map((jadwal) => (
                  <option key={jadwal.id} value={jadwal.keberangkatan}>{jadwal.keberangkatan}</option>
                ))}
              </select>   
            </div>

            <div className="form-group">
              <label>Kota Tujuan</label>
              <select onChange={this.kotaTujuan} className="form-control">
                <option value="">Pilih Kota Asal</option>  
                {kotas_tujuan.map((jadwal) => 
                  <option key={jadwal.id} value={jadwal.tujuan}>{jadwal.tujuan}</option>  
                )}
              </select>   
            </div>

            <div className="form-group">
              <label>Jumlah Penumpang</label>
              <input type="number" min="1" onChange={this.JumlahPenumpang} className="form-control" />  
            </div>

            <ul>
                <li>{this.state.tanggal_berangkat}</li>
                <li>{nilaiKotaAsal}</li>
                <li>{this.state.kota_tujuan}</li>
                <li>{this.state.jumlah_penumpang}</li>
            </ul>

            {/* <Link to={{ 
                pathname: '/daftar-jadwal',
                post_tanggalBerangkat : this.state.tanggal_berangkat,
                post_kotaAsal         : this.state.kota_asal,
                post_kotaTujuan       : this.state.kota_tujuan,
                post_jumlahPenumpang  : this.state.jumlah_penumpang
            }} 
            className="btn btn-warning btn-sm mb-5">
                Cari Jadwal
            </Link> */}
            <Link to={`/daftar-jadwal/${this.state.tanggal_berangkat}/${nilaiKotaAsal}/${this.state.kota_tujuan}/${this.state.jumlah_penumpang}`}
            className="btn btn-warning btn-sm mb-5">
              Cari Jadwal
            </Link>
          </React.Fragment>
        );
    }
}