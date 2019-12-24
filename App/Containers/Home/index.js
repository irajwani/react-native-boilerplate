import React, { Component } from 'react'
import { Text, View } from 'react-native'
import LoyaltyCard from '../../Components/LoyaltyCard'
import Container from '../../Components/Container'

export default class Home extends Component {
    render() {
        return (
            <Container>
                <LoyaltyCard/>
            </Container>
        )
    }
}
