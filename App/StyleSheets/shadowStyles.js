import {StyleSheet} from 'react-native';
import { Colors } from '../Theme';

export default StyleSheet.create({
    whiteCard: {
        shadowColor: Colors.black,
        
        shadowOffset: {
        width: -1,
        height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 3,
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
    }
})