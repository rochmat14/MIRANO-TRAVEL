import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Axios from 'axios';

export class AdminCreateSupir extends Component {
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

        if (!inputs['nama']) {
            formValidation = false;
            errors["nama"] = "Nama tidak boleh kosong";

        }  else {
            errors["nama"] = "";
        }
        
        if(!inputs['nomor_sim']) {
            formValidation = false;
            errors["nomor_sim"] = "Nomor sim tidak boleh kosong";

        } else {
            errors["nomor_sim"] = "";
        }
        
        if(!inputs['nomor_telepon']) {
            formValidation = false;
            errors["nomor_telepon"] = "Nomor telepon tidak boleh kosong";

        } else if(!(inputs['nomor_telepon'].length >= 11 && inputs['nomor_telepon'].length <= 12)) {
            formValidation = false;
            errors["nomor_telepon"] = "Nomor telepon harus 11 atau 12";

        }  else {
            errors["nomor_telepon"] = "";
        }
        
        if(!inputs['alamat']) {
            formValidation = false;
            errors["alamat"] = "Alamat tidak boleh kosong";

        } else {
            errors["alamat"] = "";
            
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

        if(this.handleValidation()){
            const newSupir = {
                nama          : event.target.nama.value,
                nomor_sim     : event.target.nomor_sim.value,
                nomor_telepon : event.target.nomor_telepon.value,
                alamat        : event.target.alamat.value,
            }
    
            Axios.post('admin/supir-create', newSupir)
                .then(response =>{
                    console.log(response.data);

                    alert("Data supir berhasi di tambah");
                })
                .catch(error => console.log(error))

                inputs['nama'] = '';
                inputs['nomor_sim'] = '';
                inputs['nomor_telepon'] = '';
                inputs['alamat'] = '';
        }
    }
    
    render() {
        return (
            <React.Fragment>
                <main className="col">
                    <div id="content">
                        <article>
                            <section >

                                <div className="container-fluid">
                                    <Modal
                                        {...this.props}
                                        size="lg"
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered
                                    >
                                        <Modal.Header>
                                            <Modal.Title id="contained-modal-title-vcenter">
                                                Tambah Supir
                                            </Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body>
                                            <div className="container">
                                                <Row>
                                                    <Col sm={12}>
                                                        <Form onSubmit={this.handleSubmit}>
                                                            <Form.Group controlId="nama">
                                                                <Form.Label>Nama</Form.Label>
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="nama"
                                                                    value={this.state.inputs["nama"]} 
                                                                    onChange={this.handleChange.bind(this, "nama")}
                                                                    placeholder="Nama"
                                                                />
                                                                <span style={{ color: "red" }}>{this.state.errors["nama"]}</span>
                                                            </Form.Group>

                                                            <Form.Group controlId="nomor_sim">
                                                                <Form.Label>Nomor SIM</Form.Label>
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="nomor_sim"
                                                                    value={this.state.inputs["nomor_sim"]} 
                                                                    onChange={this.handleChange.bind(this, "nomor_sim")}
                                                                    placeholder="Nomor SIM"
                                                                />
                                                                <span style={{ color: "red" }}>{this.state.errors["nomor_sim"]}</span>
                                                            </Form.Group>

                                                            <Form.Group controlId="nomor_telepon">
                                                                <Form.Label>Nomor Telepon</Form.Label>
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="nomor_telepon"
                                                                    value={this.state.inputs["nomor_telepon"]} 
                                                                    onChange={this.handleChange.bind(this, "nomor_telepon")}
                                                                    placeholder="Nomor Telepon"
                                                                />
                                                                <span style={{ color: "red" }}>{this.state.errors["nomor_telepon"]}</span>
                                                            </Form.Group>

                                                            <Form.Group controlId="alamat">
                                                                <Form.Label>Alamat</Form.Label>
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="alamat"
                                                                    value={this.state.inputs["alamat"]} 
                                                                    onChange={this.handleChange.bind(this, "alamat")}
                                                                    placeholder="Alamat"
                                                                />
                                                                <span style={{ color: "red" }}>{this.state.errors["alamat"]}</span>
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
                                </div>
                            </section>
                        </article>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}