import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Axios from 'axios';

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            armadas  : [],
            jurusans : [],
            supirs   : [],
            inputs   : {},
            errors   : {}
        }
    }

    componentDidMount() {
        this.getArmada();
        this.getJurusan();
        this.getSupir();
    }

    getArmada() {
        Axios.get('admin/armada')
            .then(response => {
                this.setState({
                    armadas : response.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }


    getJurusan() {
        Axios.get('admin/jurusan')
            .then(response => {
                this.setState({
                    jurusans : response.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    getSupir() {
        Axios.get('admin/supir')
            .then(response => {
                this.setState({
                    supirs : response.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleValidation = () => {
        let inputs = this.state.inputs;
        let errors = this.state.errors;
        let formValidation = true;

        // validasi tanggal keberangkatan
        if (!inputs['tanggal_keberangkatan']) {
            formValidation = false;
            errors["tanggal_keberangkatan"] = "Tanggal keberangkat tidak boleh kosong";

        }  else {
            errors["tanggal_keberangkatan"] = "";
        }
        
        // validasi armada
        if(!inputs['harga_tiket']) {
            formValidation = false;
            errors["harga_tiket"] = "Harga tiket tidak boleh kosong";

        } else {
            errors["harga_tiket"] = "";
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
            const newJadwal = {
                tanggal_berangkat : event.target.tanggal_berangkat.value,
                armada_id         : event.target.armada_id.value,
                jurusan_id        : event.target.jurusan_id.value,
                supir_id          : event.target.supir_id.value,
                harga_tiket       : event.target.harga_tiket.value,
            }
    
            Axios.post('admin/jadwal-create', newJadwal)
                .then(response => {
                    console.log(response.data);

                    alert("Data jadwal berhasil di tambah");
                })
                .catch(error => console.log(error))
    
            inputs['tanggal_keberangkat'] = ''
            inputs['harga_tiket'] = ''
        }
    }
    
    render() {
        const { armadas, jurusans, supirs } = this.state;
        
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
                                            Tambah Jadwal
                                        </Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>
                                        <div className="container">
                                            <Row>
                                                <Col sm={12}>
                                                    <Form onSubmit={this.handleSubmit}>
                                                        <Form.Group controlId="tanggal_berangkat">
                                                            <Form.Label>Tanggal Keberangkatan</Form.Label>
                                                            <Form.Control 
                                                                type="date"
                                                                name="tanggal_berangkat"
                                                                value={this.state.inputs["tanggal_keberangkatan"]} 
                                                                onChange={this.handleChange.bind(this, "tanggal_keberangkatan")}
                                                                placeholder="Tanggal Berangkat"
                                                            />
                                                            <span style={{ color: "red" }}>{this.state.errors["tanggal_keberangkatan"]}</span>
                                                        </Form.Group>

                                                        <Form.Group controlId="armada_id">
                                                            <Form.Label>Armada</Form.Label>
                                                            <Form.Control as="select" name="armada_id">
                                                                {armadas.map((armada) => (
                                                                    <option key={armada.id} value={armada.id}>{armada.jenis}</option>
                                                                ))}
                                                            </Form.Control>
                                                        </Form.Group>

                                                        <Form.Group controlId="jurusan_id">
                                                            <Form.Label>Jurusan</Form.Label>
                                                            <Form.Control as="select" name="jurusan_id">
                                                                {jurusans.map((jurusan) => (
                                                                    <option key={jurusan.id} value={jurusan.id}>{jurusan.keberangkatan}&nbsp;ke&nbsp;{jurusan.tujuan}&nbsp;({jurusan.waktu})</option>
                                                                ))}
                                                            </Form.Control>
                                                        </Form.Group>

                                                        <Form.Group controlId="supir_id">
                                                            <Form.Label>Supir</Form.Label>
                                                            <Form.Control as="select" name="supir_id">
                                                                {supirs.map((supir) => (
                                                                    <option key={supir.id} value={supir.id}>{supir.nama}</option>
                                                                ))}
                                                            </Form.Control>
                                                        </Form.Group>

                                                        <Form.Group controlId="harga_tiket">
                                                            <Form.Label>Harga Tiket</Form.Label>
                                                            <Form.Control 
                                                                type="number"
                                                                name="harga_tiket"
                                                                value={this.state.inputs["harga_tiket"]} 
                                                                onChange={this.handleChange.bind(this, "harga_tiket")}
                                                                placeholder="Harga Tiket"
                                                            />
                                                            <span style={{ color: "red" }}>{this.state.errors["harga_tiket"]}</span>
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