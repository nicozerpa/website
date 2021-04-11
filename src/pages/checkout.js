import React, { useState } from "react"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { PAYPAL_API } from "gatsby-env-variables"

import "../styles/checkout.scss"


export default class Checkout extends React.Component {
    // const productID = props.params["*"]
    constructor(props) {
        super(props)
        this.state = {
            productName: "Test Product",
            description: "Lorem Ipsum",
            originalPrice: 0,
            finalPrice: 120799999,
            coupon: null
        }
    }

    formattedNumber(number) {
        let [ integer, decimal ] = String(Math.round(number * 100) / 100).split(".")
        
        if (decimal) {
            decimal = decimal.padEnd(2, "0")
        } else {
            decimal = "00"
        }

        integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

        return `${integer}.${decimal}`
    }

    initPayPal({ actions }) {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: this.state.price,
                    },
                },
            ],
        })
    }

    render() {
        return <PayPalScriptProvider options={{ "client-id": PAYPAL_API }}>
            <img alt="Nico Zerpa" src="/images/nicozerpa.svg" className="logo"/>
            <div className="container">
                <div className="product-metadata">
                    <h1>{ this.state.productName }</h1>
                    <p>{ this.state.description }</p>
                </div>
                
                <div className="amounts-and-coupon">
                    <p className="amount">Amount: <strong>{ this.formattedNumber(this.state.finalPrice) }</strong></p>
                    <form>
                        <p className="coupon">
                            <label>Coupon code:</label>
                            <input type="text" name="coupon_code"/>
                            <button type="button">Apply</button>
                        </p>
                    </form>
                </div>
                <p>Select Payment Methods and Pay:</p>
                <PayPalButtons
                    createOrder={ this.initPayPal.bind(this) }/>
            </div>
            <div className="secure">🔏 This page is securely encrypted.</div>
        </PayPalScriptProvider>
    }
}