import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Axios from 'axios';

export class AdminCreateArmada extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputs : {},
            errors : {}
        }
    }

    handleValidation = () => {
        let inputs = this.state.inputs;
        let errors = this.state.errors;
        let formValidation = true;

        // validasi nomor polisi
        if (!inputs['nomor_polisi']) {
            formValidation = false;
            errors["nomor_polisi"] = "Nomor polisi tidak boleh kosong";

        }  else {
            errors["nomor_polisi"] = "";
        }
        
        // validasi jenis
        if(!inputs['jenis']) {
            formValidation = false;
            errors["jenis"] = "Jenis tidak boleh kosong";

        } else {
            errors["jenis"] = "";
        }
                
        // validasi jumla kursi
        if(!inputs['jumlah_kursi']) {
            formValidation = false;
            errors["jumlah_kursi"] = "Jumlah kursi tidak boleh kosong";

        } else {
            errors["jumlah_kursi"] = "";
            
        }

        this.setState({ errors: errors });
        return formValidation;
    }

    handleChange(input, e) {
        let inputs = this.state.inputs;
        inputs[input] = e.target.value;
        this.setState({ inputs });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let inputs = this.state.inputs;

        if(this.handleValidation()) {
            const newArmada = {
                nomor_polisi : event.target.nomor_polisi.value,
                jenis        : event.target.jenis.value,
                jumlah_kursi : event.target.jumlah_kursi.value,
            }
    
            Axios.post('admin/armada-create', newArmada)
                .then(response => {
                    console.log(response.data);

                    alert("Data armada berhasil di tambah")
                })
                .catch(error => console.log(error))
    
            inputs['nomor_polisi'] = ''
            inputs['jenis'] = ''
            inputs['jumlah_kursi'] = ''
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
                                            Tambah Armada
                                        </Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>
                                        <div className="container">
                                            <Row>
                                                <Col sm={12}>
                                                    <Form onSubmit={this.handleSubmit}>
                                                        <Form.Group controlId="nomor_polisi">
                                                            <Form.Label>Nomor Polisi</Form.Label>
                                                            <Form.Control 
                                                                type="text"
                                                                name="nomor_polisi"
                                                                value={this.state.inputs["nomor_polisi"]} 
                                                                onChange={this.handleChange.bind(this, "nomor_polisi")}
                                                                placeholder="Nomor Polisi"
                                                            />
                                                            <span style={{ color: "red" }}>{this.state.errors["nomor_polisi"]}</span>
                                                        </Form.Group>

                                                        <Form.Group controlId="jenis">
                                                            <Form.Label>Jenis</Form.Label>
                                                            <Form.Control 
                                                                type="text"
                                                                name="jenis"
                                                                value={this.state.inputs["jenis"]} 
                                                                onChange={this.handleChange.bind(this, "jenis")}
                                                                placeholder="Jenis"
                                                            />
                                                            <span style={{ color: "red" }}>{this.state.errors["jenis"]}</span>
                                                        </Form.Group>

                                                        <Form.Group controlId="jumlah_kursi">
                                                            <Form.Label>Jumlah Kursi</Form.Label>
                                                            <Form.Control 
                                                                type="number"
                                                                name="jumlah_kursi"
                                                                value={this.state.inputs["jumlah_kursi"]} 
                                                                onChange={this.handleChange.bind(this, "jumlah_kursi")}
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