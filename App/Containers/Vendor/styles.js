import {StyleSheet} from 'react-native';
import { Colors, Metrics, Helpers } from '../../Theme';
import shadowStyles from '../../StyleSheets/shadowStyles';
import borderStyles from '../../StyleSheets/borderStyles';
import viewStyles from '../../StyleSheets/viewStyles';

// let cardWidth = Metrics.screenWidth - 40;

export default StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: Colors.background.primary,

        padding: 10
    },

    loyaltyCard: {
        flex: 0.6,
        borderRadius: 20,
        // ...borderStyles.thinBorder,
        ...shadowStyles.whiteCard,
        // backgroundColor: 'red',
        // width: cardWidth,
        // height: 0.6*Metrics.screenHeight,
    },

    vendorNameContainer: {
        flex: 0.3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        ...borderStyles.standardBottomBorder,
    },

    stampsContainer: {
        flex: 0.7,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'red',
        
        // justifyContent: 'center',
        // alignItems: 'center',
    },

        stampContainer: {
            // width: cardWidth/3,
            padding: 15,
            ...Helpers.center,
            backgroundColor: 'yellow'
            
        },

        stamp: {
            
            ...viewStyles.standardCircle,
            ...Helpers.center,
            backgroundColor: '#fff',
        }


})