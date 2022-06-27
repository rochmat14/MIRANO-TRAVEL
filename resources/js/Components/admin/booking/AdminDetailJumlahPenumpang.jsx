import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Axios from 'axios';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const arrayBookings = (() => {
            if (this.props.post_bookingdetail == undefined) {
                return [];
            } else {
                return this.props.post_bookingdetail;
            }
        })();

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
                                            Detail Penumpang
                                        </Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>
                                        <div className="container">
                                            <Row>
                                                <Col sm={12}>
                                                    {arrayBookings.map((data, i) => 
                                                        <div key={i} className="card mb-3">
                                                            <div className="card-body">
                                                                <div className='row'>
                                                                    <div className="col-sm-6">
                                                                        <div className="form-group">
                                                                            <label>Nama Penumpang</label>
                                                                            <input type="text" className="form-control" defaultValue={data.nama.toUpperCase()} readOnly />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-sm-6">
                                                                        <div className="form-group">
                                                                            <label>Id Penumpang</label>
                                                                            <input type="text" className="form-control" defaultValue={data.nomor_id} readOnly />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-sm-6">
                                                                        <div className="form-group">
                                                                            <label>Tempat Jemput</label>
                                                                            <input type="text" className="form-control" defaultValue={data.tempat_jemput.toUpperCase()} readOnly />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-sm-6">
                                                                        <div className="form-group">
                                                                            <label>Nomor Kursi</label>
                                                                            <input type="text" className="form-control" defaultValue={data.nomor_kursi} readOnly />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
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