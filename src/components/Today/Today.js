import React, { Component } from 'react'
import './Today.css'
import axios from 'axios'
import Pusher from 'pusher-js'
import { CryptoPrice } from './CryptoPrice'

class Today extends Component {
    state = {
        btcprice: 0,
        ltcprice: 0,
    }

    sendPricePusher(data) {
        axios
            .post('/prices/new', {
                prices: data,
            })
            .then(console.log)
            .catch(console.error)
    }

    saveStateToLocalStorage = () => {
        localStorage.setItem('today-state', JSON.stringify(this.state))
    }

    restoreStateFromLocalStorage = () => {
        const state = JSON.parse(localStorage.getItem('today-state'))
        this.setState(state)
    }

    componentDidMount() {
        if (!navigator.onLine) {
            return this.restoreStateFromLocalStorage()
        }
        this.pusher = new Pusher('6cdfa6cd8445fd6f5236', {
            cluster: 'eu',
            encrypted: true,
        })
        this.prices = this.pusher.subscribe('coin-prices')
        axios
            .get(
                'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD'
            )
            .then(({ data: { BTC, ETH } }) => {
                this.setState(
                    {
                        btcprice: BTC.USD,
                        ethprice: ETH.USD,
                    },
                    this.saveStateToLocalStorage
                )
                console.log('BTC', BTC)
                console.log('ETH', ETH)
            })
            .catch(console.error)
        this.cryptoSubscription = setInterval(() => {
            axios
                .get(
                    'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD'
                )
                .then(({ data }) => {
                    console.log('dadadadad', data)
                    this.setState(
                        {
                            btcprice: data.BTC.USD,
                            ethprice: data.ETH.USD,
                        },
                        this.saveStateToLocalStorage
                    )
                    this.sendPricePusher(data)
                })
                .catch(console.error)
        }, 10000)
        this.prices.bind(
            'prices',
            ({ prices: { BTC, ETH } }) => {
                console.log('dodododod', BTC + ' - ' + ETH)
                this.setState(
                    {
                        btcprice: BTC.USD,
                        ethprice: ETH.USD,
                    },
                    this.saveStateToLocalStorage
                )
                console.log('BTC2', BTC)
                console.log('ETH2', ETH)
            },
            this
        )
    }

    componentWillMount() {
        this.pusher = new Pusher('6cdfa6cd8445fd6f5236', {
            cluster: 'eu',
            encrypted: true,
        })
        this.prices = this.pusher.subscribe('coin-prices')
    }

    componentWillUnmount() {
        clearInterval(this.cryptoSubscription)
    }

    render() {
        const { ethprice, btcprice } = this.state
        return (
            <div className="today--section container">
                <h2>Current Price</h2>
                <div className="columns today--section__box">
                    <CryptoPrice currency="btc" price={btcprice} />
                    <CryptoPrice currency="eth" price={ethprice} />
                </div>
            </div>
        )
    }
}

export default Today
