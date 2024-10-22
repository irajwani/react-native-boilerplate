import {StyleSheet} from 'react-native';
import shadowStyles from '../../StyleSheets/shadowStyles';
import { Helpers, Fonts, Colors } from '../../Theme';

export default StyleSheet.create({
    gradientBanner: {
        flex: 0.25,
        ...shadowStyles.lowerGreyShadow,
        elevation: 2,
    },

    bodyContainer: {
        flex: 0.55,
        
    },

        profilePictureContainer: {
            width: "100%",
            ...Helpers.center,
            top: -50,
            position: 'absolute',
            alignSelf: 'center',
            zIndex: 1,
            ...shadowStyles.greyShadow,
            elevation: 2,
        },

            profilePicture: {
                
                width: 100,
                height: 100,
                borderRadius: 50,
                
            },

        profileTextContainer: {
            flex: 0.6,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 25,
        },

            profileText: {
                ...Fonts.style.h4,
                fontWeight: "400",
            },
        
        statsContainer: {
            flex: 0.4,
            flexDirection: 'row',
        },

            statContainer: {
                flex: 0.5,
                justifyContent: 'flex-end',
                alignItems: 'center',
            },

                valueContainer: {
                    margin: 5,
                    ...Helpers.center,
                    
                },

                    number: {...Fonts.style.h1, fontWeight: "300"},

                    title: {...Fonts.style.normal, fontWeight: "300", textAlign: 'center'},

    footerContainer: {
        flex: 0.2,
        position: "absolute",zIndex: 1,
        bottom: 0,
        width: "100%",
        
    },

        drawerHeader: {
            flexDirection: 'row', 
            flex: 1,
            ...Helpers.center,
            padding: 15,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            backgroundColor: Colors.secondary,
            ...shadowStyles.greyShadow,
            elevation: 2,  
        },

        drawerBody: {
            width: "100%",
            backgroundColor: '#fff',
        },

    
    
})