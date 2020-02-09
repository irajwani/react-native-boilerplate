import {StyleSheet} from 'react-native';
import shadowStyles from '../../StyleSheets/shadowStyles';
import { Helpers, Fonts, Colors } from '../../Theme';

export default StyleSheet.create({
    gradientBanner: {
        flex: 0.25,
        backgroundColor: 'powderblue',
        ...shadowStyles.lowerBlackShadow,
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
            ...shadowStyles.blackShadow
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
                flex: 0.33333,
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical: 20,
            },

                valueContainer: {
                    margin: 5,
                    ...Helpers.center,
                },

                    number: {...Fonts.style.h1, fontWeight: "800"},

                    title: {...Fonts.style.normal, fontWeight: "800", textAlign: 'center'},

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
            backgroundColor: Colors.primary,
            ...shadowStyles.blackShadow,
            
        },

        drawerBody: {
            width: "100%",
            backgroundColor: '#fff',
        },

    
    
})