import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Axios from 'axios';

const Loader = () => (
    <div className="divLoader">
        <svg className="svgLoader position-fixed" style={{ zIndex: 8, marginTop: "220px" }} viewBox="0 0 100 100" width="10em" height="10em">
            <path stroke="none" d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="red" transform="rotate(179.719 50 51)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 51;360 50 51" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></path>
        </svg>
    </div>
);

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }

        this.handleSubmit = this.handleSubmit.bind(this) ;
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ loading: false })

        const updateStatusBooking = {
            nomor_booking  : event.target.nomor_booking.value,
            status_booking : event.target.status_booking.value,
            jumlah_penumpang : this.props.post_jumlahpenumpang,
            penumpang_pasti : this.props.post_penumpangpasti
        }

        Axios.post('admin/update-status-booking', updateStatusBooking)
            .then(response => {
                console.log(response.data)

                window.location.href = `/admin/data-booking`;
            })
            .catch(error => console.log(error))

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
                                size="md"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                            >
                                {this.state.loading == false ? <Loader /> : null}
                                
                                <Modal.Header>
                                    {/* <Modal.Title id="contained-modal-title-vcenter"> */}
                                    <Modal.Title>
                                        Status Booking
                                    </Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <div className="container">
                                        <Row>
                                            <Col sm={12}>
                                                <Form onSubmit={this.handleSubmit}>
                                                    <Form.Group controlId="nomor_booking">
                                                        <Form.Label>Nomor Booking</Form.Label>
                                                        <Form.Control 
                                                            type="text"
                                                            name="nomor_booking"
                                                            defaultValue={this.props.post_nomorbooking}
                                                            disabled
                                                        />
                                                    </Form.Group>

                                                    <Form.Group controlId="status_booking">
                                                        <Form.Label>Status Booking</Form.Label>
                                                        <Form.Control as="select" name="status_booking">
                                                            <option value="aktif" hidden={this.props.post_statusbooking === "aktif"}>aktif</option>
                                                            <option value="selesai" hidden={this.props.post_statusbooking === "selesai"}>selesai</option>
                                                            <option value="cancel" hidden={this.props.post_statusbooking === "cancel"}>cancel</option>
                                                        </Form.Control>
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