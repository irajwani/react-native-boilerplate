import {StyleSheet} from 'react-native';
import { Colors } from '../Theme';

export default StyleSheet.create({
    whiteCard: {
        shadowColor: Colors.black,
        
        shadowOffset: {
        width: 0,
        height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },

    whiteShadow: {
        shadowColor: Colors.white,
        
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
    },

    greyShadow: {
        shadowColor: Colors.grey,
        
        shadowOffset: {
            width: -1,
            height: 1,
        },
        shadowOpacity: 0.7,
        shadowRadius: 7,
    },

    lowerGreyShadow: {
        shadowColor: Colors.grey,
        
        shadowOffset: {
            width: -1,
            height: 5,
        },
        shadowOpacity: 0.7,
        shadowRadius: 5,
    },

    blackShadow: {
        shadowColor: Colors.black,
        
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
    },

    lowerBlackShadow: {
        shadowColor: Colors.black,
        
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1,
    },

    lowerThemeShadow: {
        shadowColor: Colors.primary,
        
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.7,
        shadowRadius: 1,
    },


})