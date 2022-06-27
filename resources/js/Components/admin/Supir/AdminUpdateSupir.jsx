import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Axios from 'axios';

export class AdminUpdateSupir extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors : {}
        }

        this.handleSubmit = this.handleSubmit.bind(this) ;
    }

    handleSubmit(event) {
        event.preventDefault();

        let errors = this.state.errors;
        let formValidation = true;

        // validasi email
        if (!event.target.nama.value) {
            formValidation = false;
            errors["nama"] = "Nama tidak boleh kosong";

        }  else {
            errors["nama"] = "";
        }
        
        if(!event.target.nomor_sim.value) {
            formValidation = false;
            errors["nomor_sim"] = "Nomor sim tidak boleh kosong";

        } else {
            errors["nomor_sim"] = "";
        }
        
        if(!event.target.nomor_telepon.value) {
            formValidation = false;
            errors["nomor_telepon"] = "Nomor telepon tidak boleh kosong";

        } else if(!(event.target.nomor_telepon.value.length >= 11 && event.target.nomor_telepon.value.length <= 12)) {
            formValidation = false;
            errors["nomor_telepon"] = "Nomor telepon harus 11 atau 12";

        }  else {
            errors["nomor_telepon"] = "";
        }
        
        if(!event.target.alamat.value) {
            formValidation = false;
            errors["alamat"] = "Alamat tidak boleh kosong";

        } else {
            errors["alamat"] = "";
            
        }

        
        if(formValidation == true) {
            const updateSupir = {
                id            : event.target.id.value,
                nama          : event.target.nama.value,
                nomor_sim     : event.target.nomor_sim.value,
                nomor_telepon : event.target.nomor_telepon.value,
                alamat        : event.target.alamat.value,
            }
    
            Axios.put('admin/supir-update', updateSupir)
                .then(response => {
                    console.log(response.data)

                    alert("Data supir berhasil di update")
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
                                            Tambah Supir
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
                                                                placeholder="Id"
                                                            />
                                                        </Form.Group>

                                                        <Form.Group controlId="nama">
                                                            <Form.Label>Nama</Form.Label>
                                                            <Form.Control 
                                                                type="text"
                                                                name="nama"
                                                                defaultValue={this.props.post_nama}
                                                                placeholder="Nama"
                                                            />
                                                            <span style={{ color: "red" }}>{this.state.errors["nama"]}</span>
                                                        </Form.Group>

                                                        <Form.Group controlId="nomor_sim">
                                                            <Form.Label>Nomor SIM</Form.Label>
                                                            <Form.Control 
                                                                type="number"
                                                                name="nomor_sim"
                                                                defaultValue={this.props.post_nomorsim}
                                                                placeholder="Nomor SIM"
                                                            />
                                                            <span style={{ color: "red" }}>{this.state.errors["nomor_sim"]}</span>
                                                        </Form.Group>

                                                        <Form.Group controlId="nomor_telepon">
                                                            <Form.Label>Nomor Telepon</Form.Label>
                                                            <Form.Control 
                                                                type="number"
                                                                name="nomor_telepon"
                                                                defaultValue={this.props.post_nomortelepon}
                                                                placeholder="Nomor Telepon"
                                                            />
                                                            <span style={{ color: "red" }}>{this.state.errors["nomor_telepon"]}</span>
                                                        </Form.Group>

                                                        <Form.Group controlId="alamat">
                                                            <Form.Label>Alamat</Form.Label>
                                                            <Form.Control 
                                                                type="text"
                                                                name="alamat"
                                                                defaultValue={this.props.post_alamat}
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
                            </section>
                        </article>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}