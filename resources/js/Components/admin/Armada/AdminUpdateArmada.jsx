import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Axios from 'axios';

export class AdminUpdateArmada extends Component {
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

        // validasi jenis
        if (!event.target.nomor_polisi.value) {
            formValidation = false;
            errors["nomor_polisi"] = "Nomor polisi tidak boleh kosong";

        }  else {
            errors["nomor_polisi"] = "";
        }
        
        if(!event.target.jenis.value) {
            formValidation = false;
            errors["jenis"] = "Jenis tidak boleh kosong";

        } else {
            errors["jenis"] = "";
        }
        
        if(!event.target.jumlah_kursi.value) {
            formValidation = false;
            errors["jumlah_kursi"] = "Jumlah kursi tidak boleh kosong";

        } else {
            errors["jumlah_kursi"] = "";
            
        }
        
        if(formValidation == true) {
            const updateArmada = {
                id           : event.target.id.value,
                nomor_polisi : event.target.nomor_polisi.value,
                jenis        : event.target.jenis.value,
                jumlah_kursi : event.target.jumlah_kursi.value,
            }

            Axios.put('admin/armada-update', updateArmada)
                .then(response => {
                    console.log(response.data)

                    alert("Data armada berhasil di update");
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
                                            Ubah Armada
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
                                                        
                                                        <Form.Group controlId="nomor_polisi">
                                                            <Form.Label>Nomor Polisi</Form.Label>
                                                            <Form.Control 
                                                                type="text"
                                                                name="nomor_polisi"
                                                                defaultValue={this.props.post_nomorpolisi}
                                                                placeholder="Nomor Polisi"
                                                            />
                                                            <span style={{ color: "red" }}>{this.state.errors["nomor_polisi"]}</span>
                                                        </Form.Group>

                                                        <Form.Group controlId="jenis">
                                                            <Form.Label>Jenis</Form.Label>
                                                            <Form.Control 
                                                                type="text"
                                                                name="jenis"
                                                                defaultValue={this.props.post_jenis}
                                                                placeholder="Jenis"
                                                            />
                                                            <span style={{ color: "red" }}>{this.state.errors["jenis"]}</span>
                                                        </Form.Group>

                                                        <Form.Group controlId="jumlah_kursi">
                                                            <Form.Label>Jumlah Kursi</Form.Label>
                                                            <Form.Control 
                                                                type="number"
                                                                name="jumlah_kursi"
                                                                defaultValue={this.props.post_jumlahkursi}
                                                                placeholder="Jumlah Kursi"
                                                            />
                                                            <span style={{ color: "red" }}>{this.state.errors["jumlah_kursi"]}</span>
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