import { StyleSheet } from "react-native";
import { Fonts, Colors } from "../../Theme";

export default StyleSheet.create({
    headerText: {
        ...Fonts.style.h3,
        color: Colors.white
    },

    cardsContainer: {
        flex: 0.9,
        backgroundColor: '#fff'
    },

        modalTitle: {
            ...Fonts.style.big,
            color: Colors.primary,
            marginBottom: 8,

        },

        modalText: {
            ...Fonts.style.normal,
        },
})