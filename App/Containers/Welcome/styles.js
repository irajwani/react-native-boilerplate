import {StyleSheet} from 'react-native';
import { Fonts, Helpers, Colors, Metrics } from '../../Theme';
import shadowStyles from '../../StyleSheets/shadowStyles';

export default StyleSheet.create({
    container: {
        flex: 1,
    },

    headerContainer: {
      flex: 0.2,
      ...Helpers.center,
      
    },

        
        headerText: {
            ...Fonts.style.h0,
            color: Colors.primary,
            letterSpacing: 1.7,
            fontWeight: "700",
            // bottom: 13,
        },

    bodyContainer: {
        flex: 0.7,
        // alignSelf: 'center',
        marginHorizontal: Metrics.baseMargin,
        padding: 10,
        backgroundColor: Colors.white,
        borderRadius: 10,
        ...shadowStyles.lowerBlackShadow,
    },

        logoContainer: {
            ...Helpers.center,
            marginBottom: 10
        },
            logo: {
                width: 40,
                height: 40
            },

        authActionsContainer: { 
            
            flexDirection: 'row',
            marginBottom: 15,
            justifyContent: 'space-between'
            
        },

            rememberMeContainer: { 
                // flex: 0.4, 
                flexDirection: 'row', 
                justifyContent: 'space-evenly', alignItems: 'center',
                
            },
        
            forgotPasswordContainer: {
                // flex: 0.6,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                
                
            },

                forgotPassword: {
                    ...Fonts.style.normal,
                    marginVertical: 10,
                },

        buttonContainer: {
            // marginTop: 15,
            ...Helpers.center,
        },



    footerContainer: {
        flexDirection: 'row',
        flex: 0.1,
        ...Helpers.center
    },

        footer: {
            ...Fonts.style.big,
            fontWeight: "bold",
            
        },

    //Alert
    modalTitle: {
        ...Fonts.style.big,
        color: Colors.primary,
        marginBottom: 8,

    },

    modalText: {
        ...Fonts.style.normal,
    },
        


    

})