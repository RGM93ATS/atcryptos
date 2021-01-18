import React, { Component } from 'react'
import './App.css'
import Today from './components/Today/Today.js'
import History from './components/History/History.js'

class App extends Component {
    render() {
        return (
            <div className="">
                <div className="topheader">
                    <header className="container">
                        <nav className="navbar">
                            <div className="navbar-brand">
                                <span className="navbar-item">ATCryptos</span>
                            </div>
                            <div className="navbar-end">
                                <a
                                    className="navbar-item"
                                    href="https://www.atsistemas.com/es"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    atSistemas
                                </a>
                            </div>
                        </nav>
                    </header>
                </div>
                <section className="results--section">
                    <div className="container">
                        <h1>
                            ATCryptos is a realtime price information about
                            <br></br> BTC and ETH.
                        </h1>
                    </div>
                    <div className="results--section__inner">
                        <Today />
                        <History />
                    </div>
                </section>
            </div>
        )
    }
}

export default App
