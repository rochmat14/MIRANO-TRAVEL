import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Axios from 'axios';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pembayarans : [],
        }
    }

    componentDidMount() {
        this.getDataPembayarans();
    }
    
    componentDidUpdate() {
        this.getDataPembayarans();
        // console.log(this.props.post_nomorbooking);
    }

    getDataPembayarans() {
        const data = {
            nomor_booking : this.props.post_nomorbooking
        }
        
        Axios.post('detail-pembayaran', data)
        .then((response) => {
            this.setState({
                pembayarans : response.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            // minimumFractionDigits: 2 //menambah 0 dibelakang koma
        }).format(money);
    }

    render() {
        const {pembayarans} = this.state;

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
                                            Detail Pembayaran
                                        </Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>
                                        <div className="container">
                                            <Row>
                                                <Col sm={12}>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <label>Nomor Booking</label>
                                                                <input className="form-control" defaultValue={this.props.post_nomorbooking} readOnly />
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Dari Bank</label>
                                                                <input className="form-control" defaultValue={this.props.post_daribank} readOnly />
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Ke Bank</label>
                                                                <input className="form-control" defaultValue={this.props.post_kebank} readOnly />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <label>Nomor Rekening</label>
                                                                <input className="form-control" defaultValue={this.props.post_nomorrekening} readOnly />
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Atas Nama</label>
                                                                <input className="form-control" defaultValue={this.props.post_atasnama} readOnly />
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Nominal Trasfer</label>
                                                                <input className="form-control" defaultValue={this.formatRupiah(this.props.post_nominaltransfer)} readOnly />
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Bukti Transfer</label><br/>
                                                                <div className='resonsive-div-pelanggan'>
                                                                    <img src={`http://localhost:8000/${this.props.post_buktitransfer}`} height="154px" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
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