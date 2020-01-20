import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { Helpers, Fonts } from '../../Theme';

export default class VendorList extends Component {
    constructor(props) {
        super(props);
        
    }

    renderVendor = (vendor, index) => (
        <TouchableOpacity
        style={styles.vendorContainer}
        underlayColor={'transparent'}
        onPress={() => this.props.onPress(vendor)}
        >
            <Text style={styles.vendorName}>{vendor.name}</Text>
        </TouchableOpacity>
    )

    render() {
        return (
            <FlatList 
                style={styles.vendorsContainer}
                data={this.props.vendors}
                showsVerticalScrollIndicator={true}
                renderItem={(item, index) => this.renderVendor(item.item, index)}
                keyExtractor={item => item.name}
                numColumns={1}
            />
        )
    }
}


const styles = StyleSheet.create({
    vendorsContainer: {
        // flex: 1,
        padding: 10
    },

    vendorContainer: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        ...Helpers.center,
        margin: 10,
    },

    vendorName: {
        ...Fonts.style.h2,
        
    }
})
