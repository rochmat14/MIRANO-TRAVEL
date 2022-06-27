import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Axios from 'axios';

// librari moment js
import moment from 'moment';
// agar moment js bahasa indonesia
import 'moment/locale/id';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            // minimumFractionDigits: 2 //menambah 0 dibelakang koma
        }).format(money);
    } 

    render() {

        return (
            <React.Fragment>
                <main className="col">
                    <div id="content">
                        <article>
                            <section >
                                <Modal
                                    {...this.props}
                                    size="lg"
                                    aria-labelledby="contained-modal-title-vcenter"
                                    centered
                                >
                                    <Modal.Header>
                                        <Modal.Title id="contained-modal-title-vcenter">
                                            Detail Jadwal {moment(this.props.post_tanggalberangkat).format('DD MMMM YYYY')}
                                        </Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>
                                        <div className="container">
                                            <div className="row">
                                                {/* <div className="col-sm-12"> */}
                                                    <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="">Tanggal Berangkat</label>
                                                        <input type="text" defaultValue={moment(this.props.post_tanggalberangkat).format('DD MMMM YYYY')} className="form-control" readOnly />
                                                    </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="">Armada</label>
                                                            <input type="text" defaultValue={this.props.post_armadajenis} className="form-control" readOnly />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="">Jumlah Kursi</label>
                                                            <input type="text" defaultValue={this.props.post_jumlahkursi} className="form-control" readOnly />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="">Jurusan</label>
                                                            <input type="text" defaultValue={[this.props.post_keberangkatan]+" ke "+[this.props.post_tujuan]+ " ("+[this.props.post_waktuberangkat]+")"} className="form-control" readOnly />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="">Nama Supir</label>
                                                            <input type="text" defaultValue={this.props.post_namasupir} className="form-control" readOnly />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="">Harga Tiket Per,orang</label>
                                                            <input type="text" defaultValue={this.formatRupiah(this.props.post_hargatiket)} className="form-control" readOnly />
                                                        </div>
                                                    </div>
                                                {/* </div> */}
                                            </div>
                                        </div>
                                    </Modal.Body>

                                    <Modal.Footer>
                                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                                    </Modal.Footer>
                                </Modal>
                            </section>
                        </article>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}