import React, { Component } from 'react';
import { Modal, Button, Row } from 'react-bootstrap';
import Axios from 'axios';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pelanggans : [],
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log(this.props.post_nomorbooking);
        // this.props.post_nomorbooking == undefined
        this.getDataPelanggans();
    }

    getDataPelanggans() {
        const data = {
            nomor_booking : this.props.post_nomorbooking
        }
        
            Axios.post('detail-pelanggan', data)
            .then((response) => {
                this.setState({
                    pelanggans : response.data
                })
            })
            .catch((error) => {
                console.log(error)
            })
        
    }

    render() {
        const {pelanggans} = this.state;

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
                                            Detail pelanggan
                                        </Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>
                                        <div className="container">
                                            <Row>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="">Nama User</label>
                                                        <input type="text" defaultValue={this.props.post_nama} className="form-control" readOnly />
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="">Jenis Kelamin</label>
                                                        <input type="text" defaultValue={this.props.post_jeniskelamin} className="form-control" readOnly />
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="">Nomor Telepon</label>
                                                        <input type="text" defaultValue={this.props.post_nomortelepon} className="form-control" readOnly />
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="">Alamat</label>
                                                        <input type="text" defaultValue={this.props.post_alamat} className="form-control" readOnly />
                                                    </div>
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="">Email</label>
                                                        <input type="text" defaultValue={this.props.post_email} className="form-control" readOnly />
                                                    </div>
                                                </div>
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