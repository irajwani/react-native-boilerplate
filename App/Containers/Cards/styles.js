import { StyleSheet } from "react-native";
import { Fonts, Helpers } from "../../Theme";

export default StyleSheet.create({
    headerText: {
        ...Fonts.style.h4,
        color: 'white'
    },

    cardsContainer: {
        flex: 0.9,
        backgroundColor: '#fff',
        ...Helpers.center
    }
})