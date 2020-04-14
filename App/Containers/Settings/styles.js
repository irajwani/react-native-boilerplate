import { StyleSheet } from "react-native";
import { Fonts, Colors, Metrics, Helpers } from "../../Theme";

let settingCardWidth = (Metrics.screenWidth - 20)/2
export default StyleSheet.create({
    headerText: {
        ...Fonts.style.h3,
        color: Colors.white,
        marginLeft: 10,

    },

    bodyContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 0.9,
        marginTop: 30,
    },

        settingCard: {
            backgroundColor: Colors.tertiary,
            width: settingCardWidth,
            padding: 10,
            margin: 5,
            height: 150,
            ...Helpers.mainStart,
            ...Helpers.crossStart,
        },

            setting: {
                ...Fonts.style.normal,
                color: Colors.white,
                fontWeight: "bold",
                marginTop: 10
            },

            documentScroll: {
                backgroundColor: '#fff',
                padding: Metrics.baseMargin/2
            }

})