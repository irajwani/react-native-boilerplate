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
    }
})