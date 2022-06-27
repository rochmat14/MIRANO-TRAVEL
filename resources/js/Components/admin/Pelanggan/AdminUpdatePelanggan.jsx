import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Axios from 'axios';

export class AdminUpdatePelanggan extends Component {
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
        if (!event.target.email.value) {

            formValidation = false;
            errors["email"] = "Email tidak boleh kosong";

        }   else if (!event.target.email.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                
            formValidation = false;
            errors["email"] = "Bukan jenis email";

        }   else {

            errors["email"] = "";

            const updateSupir = {
                id       : event.target.id.value,
                email    : event.target.email.value,
                password : event.target.password.value,
            }
    
            Axios.post('user/update', updateSupir)
                .then(response => {
                    console.log(response.data)

                    alert("Data pelanggan berhasil di ubah");
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
                                <div className="container-fluid">
                                    <Modal
                                        {...this.props}
                                        size="lg"
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered
                                    >
                                        <Modal.Header>
                                            <Modal.Title id="contained-modal-title-vcenter">
                                                Update Email/Password Pelanggan
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
                                                                    required
                                                                    placeholder="Id"
                                                                />
                                                            </Form.Group>

                                                            <Form.Group controlId="email">
                                                                <Form.Label>Email</Form.Label>
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="email"
                                                                    defaultValue={this.props.post_email}
                                                                    placeholder="Email Baru"
                                                                />
                                                                <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                                                            </Form.Group>

                                                            <Form.Group controlId="password">
                                                                <Form.Label>Password</Form.Label>
                                                                <br />
                                                                <Form.Label className="text-primary">Jika Tidak Diganti Kosongkan</Form.Label>
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="password"
                                                                    defaultValue={this.props.post_password}
                                                                    placeholder="Password Baru"
                                                                />
                                                            </Form.Group>

                                                            <Form.Group>
                                                                <Button variant="warning  mt-3" type="submit" >SIMPAN</Button>
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