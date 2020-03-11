import { StyleSheet } from "react-native";
import { Fonts, Helpers, Colors } from "../../Theme";

export default StyleSheet.create({
    headerText: {
        ...Fonts.style.h3,
        color: Colors.white
    },

    cardsContainer: {
        flex: 0.9,
        backgroundColor: '#fff',
        ...Helpers.center
    }
})