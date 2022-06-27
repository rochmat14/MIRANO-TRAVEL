import React, {Component} from 'react';
import { Redirect } from 'react-router';

export default class Dashboard extends Component {
    render () {
        if(!localStorage.getItem('token_admin')) {
            return <Redirect to={'/admin/login'} />
        }
        
        return (
            <React.Fragment>
                <main className="col">
                    <div id="content">
                        <article>
                            <section >
                                <div className="container-fluid">
                                    <h1 className="mt-3">Dashboard</h1>
                                    <hr />

                                    <div className="card responsive-card">
                                        <div className="card-header">
                                            <i className="fas fa-tachometer-alt"></i>
                                        </div>

                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">
                                                <p>Selamat datang di halaman admin MIRANO TRAVEL</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>
                        </article>
                    </div>
                </main>
            </React.Fragment>
        )
    }
}