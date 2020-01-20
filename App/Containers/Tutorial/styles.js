import {StyleSheet} from 'react-native';
import { Fonts, Colors, Helpers } from '../../Theme';

export default StyleSheet.create({
    headerContainer: {
        flex: 0.15,
        ...Helpers.center
    },
        headerText: {
            ...Fonts.style.h1,
            color: Colors.secondary,
        },

    carouselContainer: {
        flex: 0.6
    },

    skipButton: {
        flex: 0.25,
        ...Helpers.center,
        ...Helpers.thinBorder,

    },
})