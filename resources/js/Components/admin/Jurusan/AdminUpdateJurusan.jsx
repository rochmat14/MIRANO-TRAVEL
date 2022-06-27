import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Axios from 'axios';

export class AdminUpdateJurusan extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors : {}
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let errors = this.state.errors;
        let formValidation = true;

        // validasi keberangkatan
        if (!event.target.keberangkatan.value) {
            formValidation = false;
            errors["keberangkatan"] = "Keberangkatan tidak boleh kosong";

        }  else {
            errors["keberangkatan"] = "";
        }
        
        // validasi tujuan
        if(!event.target.tujuan.value) {
            formValidation = false;
            errors["tujuan"] = "Tujuan tidak boleh kosong";

        } else {
            errors["tujuan"] = "";
        }
        
        // validasi waktu
        if(!event.target.waktu.value) {
            formValidation = false;
            errors["waktu"] = "Waktu tidak boleh kosong";

        } else {
            errors["waktu"] = "";
            
        }

        if(formValidation == true) {
            const updateJurusan = {
                id            : event.target.id.value,
                keberangkatan : event.target.keberangkatan.value,
                tujuan        : event.target.tujuan.value,
                waktu         : event.target.waktu.value,
            }
    
            Axios.put('admin/jurusan-update', updateJurusan)
                .then(response => {
                    console.log(response.data);

                    alert("Data jurusan berhasil di update");
                })
                .catch(error => console.log(error))
        }

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
                                            Ubah Jurusan
                                        </Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>
                                        <div className="container">
                                            <Row>
                                                <Col sm={12}>
                                                    <Form onSubmit={this.handleSubmit}>
                                                        <Form.Group controlId="id">
                                                            <Form.Label>Id</Form.Label>
                                                            <Form.Control 
                                                                type="text"
                                                                name="id"
                                                                defaultValue={this.props.post_id}
                                                                disabled
                                                            />
                                                        </Form.Group>

                                                        <Form.Group controlId="keberangkatan">
                                                            <Form.Label>Keberangkatan</Form.Label>
                                                            <Form.Control 
                                                                type="text"
                                                                name="keberangkatan"
                                                                defaultValue={this.props.post_keberangkatan}
                                                                placeholder="Keberangkatan"
                                                            />
                                                            <span style={{ color: "red" }}>{this.state.errors["keberangkatan"]}</span>
                                                        </Form.Group>

                                                        <Form.Group controlId="tujuan">
                                                            <Form.Label>Tujuan</Form.Label>
                                                            <Form.Control 
                                                                type="text"
                                                                name="tujuan"
                                                                defaultValue={this.props.post_tujuan}
                                                                placeholder="Tujuan"
                                                            />
                                                            <span style={{ color: "red" }}>{this.state.errors["tujuan"]}</span>
                                                        </Form.Group>

                                                        <Form.Group controlId="waktu">
                                                            <Form.Label>Waktu</Form.Label>
                                                            <Form.Control 
                                                                type="time"
                                                                name="waktu"
                                                                defaultValue={this.props.post_waktu}
                                                                placeholder="Waktu"
                                                            />
                                                            <span style={{ color: "red" }}>{this.state.errors["waktu"]}</span>
                                                        </Form.Group>

                                                        <Form.Group>
                                                            <Button variant="warning mt-3" type="submit" >SIMPAN</Button>
                                                        </Form.Group>
                                                    </Form>
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