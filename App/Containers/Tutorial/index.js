import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Container from '../../Components/Container'
import { Colors } from '../../Theme'
import styles from './styles'

export default class Tutorial extends Component {
    render() {
        return (
            <Container style={{backgroundColor: Colors.primary}}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Tutorial</Text>
                </View>

                <View style={styles.carouselContainer}>

                </View>

                <TouchableOpacity style={styles.skipButton} onPress>

                </TouchableOpacity>
            </Container>
        )
    }
}
