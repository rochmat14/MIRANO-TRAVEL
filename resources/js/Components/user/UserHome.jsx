import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';

import UserSidebar from '../../Common/User/UserSidebar';

import gambarErtiga from '../../images/ertiga.jpg';
import gambarGrandMax from '../../images/grand_max.jpg';
import gambarMobilio from '../../images/mobilio.jpg';
import gambarXenia from '../../images/xenia.jpg';
import logoMiranoTravel from '../../images/mirano-travel.png';

export default class extends Component {
    render() {
        return (
            <React.Fragment>
                <main className="col" style={{marginBottom: "4%"}}>
                    <div id="content">
                        <article>
                            <section >
                                <div className="row row-home">
                                    <UserSidebar />

                                    <div className="col col-home-user">
                                        <img src={logoMiranoTravel} className="d-block w-100" />

                                        {/* <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
                                            <ol className="carousel-indicators">
                                                <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                                                <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                                                <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                                            </ol>

                                            <div className="carousel-inner">
                                                <div className="carousel-item active">
                                                    <center>
                                                        <img src={gambarErtiga} className="d-block w-75" alt="..." />
                                                    </center>
                                                    <div className="carousel-caption d-none d-md-block">
                                                        <h2 className="header-carousel">Menjelajah Kota Bersama Kami</h2>
                                                        <p>Melayani dengan sepenuh hati.</p>
                                                    </div>
                                                </div>

                                                <div className="carousel-item">
                                                    <center>
                                                        <img src={gambarGrandMax} className="d-block w-75" alt="..." />
                                                    </center>
                                                    <div className="carousel-caption d-none d-md-block">
                                                        <h2 className="header-carousel">Kemana Saja Bersama Mirano Travel</h2>
                                                        <p>Tersedia disetiap kota tempat kamu berada. mudah diakses kapan saja.</p>
                                                    </div>
                                                </div>

                                                <div className="carousel-item">
                                                    <center>
                                                        <img src={gambarMobilio} className="d-block w-75" alt="..." />
                                                    </center>
                                                    <div className="carousel-caption d-none d-md-block">
                                                        <h2 className="header-carousel">Tampilan yang Responsive Bagi Perangkat Mobile</h2>
                                                        <p>Memudahkan pemesanann melalui perangkat Mobile, cepat dan nyaman</p>
                                                    </div>
                                                </div>

                                                <div className="carousel-item">
                                                    <center>
                                                        <img src={gambarXenia} className="d-block w-75" alt="..." />
                                                    </center>
                                                    <div className="carousel-caption d-none d-md-block">
                                                        <h2 className="header-carousel">Mudah Dimana Saja</h2>
                                                        <p>Tidak perlu sulit dalam perjalanan yang kamu lalui, gunakan jasa kami yang cepat.</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="sr-only">Previous</span>
                                            </a>

                                            <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="sr-only">Next</span>
                                            </a>
                                        </div> */}

                                        {/* <h4>{dataUser}</h4> */}

                                        {/* <ul>
                                            <li>{this.state.tanggal_berangkat}</li>
                                            <li>{this.state.kota_asal}</li>
                                            <li>{this.state.kota_tujuan}</li>
                                            <li>{this.state.jumlah_penumpang}</li>
                                        </ul> */}

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
                                    </div>

                                </div>
                            </section>
                        </article>
                    </div>
                </main>
            </React.Fragment >
        )
    }
}