import React, { Component } from 'react'
import { Text, View, SafeAreaView } from 'react-native'
import Container from '../../Components/Container'
import LoyaltyCard from '../../Components/LoyaltyCard'


export class Welcome extends Component {

    render() {
        return (
            <Container>
                <LoyaltyCard/>
            </Container>
        )
    }
}

export default Welcome
