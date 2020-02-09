import {StyleSheet} from 'react-native';
import { Colors, Metrics, Helpers, Fonts } from '../../Theme';
import shadowStyles from '../../StyleSheets/shadowStyles';
import borderStyles from '../../StyleSheets/borderStyles';
import viewStyles from '../../StyleSheets/viewStyles';

let cardWidth = Metrics.screenWidth - 10, cardHeight = 150;


export default StyleSheet.create({
    
    bannerContainer: {
        flex: 0.2,

    },

        banner: {
            width: "100%",
            height: 90,
        },

    bodyContainer: {
        flex: 0.8,
        marginHorizontal: 5,
    },

        logoContainer: {
            width: "100%",
            ...Helpers.center,
            top: -50,
            position: 'absolute',
            alignSelf: 'center',
            zIndex: 1,
        },

            logo: {
                width: 100,
                height: 100,
                borderRadius: 50,
            },


        visitRewards: {
            marginTop: 60,
        },

            loyaltyCard: {
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: cardWidth,
                height: cardHeight,
                // flex: 0.6,
                borderRadius: 20,
                // ...borderStyles.thinBorder,
                paddingVertical: 10,
                ...shadowStyles.whiteCard,
                backgroundColor: Colors.primary,
                // width: cardWidth,
                // height: 0.6*Metrics.screenHeight,
            },

                stampContainer: {
                    ...Helpers.center,
                    height: cardHeight/2 - 10,
                    width: cardWidth/5,
                    
                },

                    stamp: {
                        ...viewStyles.standardCircle,
                        ...Helpers.center,
                        backgroundColor: '#fff',
                        ...borderStyles.thinRidgeBorder
                    },

                        visitNumber: {
                            ...Fonts.style.normal,
                            color: Colors.number,
                        },
        
        staticRewards: {
            marginTop: 20,
            marginBottom: 20
        },

            dealContainer: {
                width: cardWidth,
                height: 40,
                borderRadius: 20, 
                backgroundColor: Colors.secondary,
                ...shadowStyles.whiteCard,
                ...Helpers.center,

                marginVertical: 5,
            },

                deal: {
                    ...Fonts.style.h4,
                    color: '#fff',
                },
                
        addressContainer: {
            paddingVertical: 10,
            // ...Helpers.center,
        },          

            address: {
                ...Fonts.style.medium,
                textAlign: 'center',
                color: Colors.number
            }


})