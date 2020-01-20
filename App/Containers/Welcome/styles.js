import {StyleSheet} from 'react-native';
import { Fonts, Helpers, Colors, Metrics } from '../../Theme';

export default StyleSheet.create({
    container: {
        flex: 1,
    },

    headerContainer: {
      flex: 0.4,
      ...Helpers.center,  
    },

        
        headerText: {
            ...Fonts.style.h1,
            color: Colors.secondary,
            letterSpacing: 1.7,
            fontWeight: "700",
            bottom: 13,
        },

    bodyContainer: {
        flex: 0.45,
        marginHorizontal: 10,
        
    },

        forgotPassContainer: {
            alignItems: 'flex-end'
        },

            forgotPass: {
                ...Fonts.style.normal,
                fontWeight: "600"
            },

        buttonContainer: {
            marginTop: 15,
            ...Helpers.center,
        },



    footerContainer: {
        flex: 0.15,
        ...Helpers.center
    },

        footer: {
            ...Fonts.style.normal,
            fontWeight: "500"
        },
        


    

})