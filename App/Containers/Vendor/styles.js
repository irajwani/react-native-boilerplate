import {StyleSheet} from 'react-native';
import { Colors, Metrics, Helpers, Fonts } from '../../Theme';
import shadowStyles from '../../StyleSheets/shadowStyles';
import borderStyles from '../../StyleSheets/borderStyles';
import viewStyles from '../../StyleSheets/viewStyles';

let cardWidth = Metrics.screenWidth - 20, cardHeight = 150;
const triangleSize = 8, circleSize = 30;

// let numTriangles = ;


export default StyleSheet.create({

    
    headerContainer: {
        flex: 0.1,
        // backgroundColor: "transparent",
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: Metrics.baseMargin,
        paddingVertical: 6,
        position: "absolute",zIndex: 1,
        width: Metrics.screenWidth,
        //   marginTop: Platform.OS == 'ios' ? ifIphoneX(44, 0) : 0
    },

        header: {
            ...Fonts.style.h3,
            color: Colors.white,
        },
    

    scrollContainer: {
        flex: 0.9,
        
        },
    contentContainer: {
        flexGrow: 1, 
    },
    bannerContainer: {
        // flex: 0.2,

    },

        banner: {
            width: "100%",
            height: Metrics.screenHeight/3,
        },

        logoContainer: {
            
            
            bottom: 20,
            left: 20,
            position: 'absolute',
            zIndex: 1,
            backgroundColor: 'transparent',
            ...shadowStyles.blackShadow
        },

            logo: {
                width: 72,
                height: 72,
                borderRadius: 36.5,
            },

    bodyContainer: {
        // flex: 0.8,
        // marginHorizontal: Metrics.baseMargin,
        backgroundColor: Colors.lightgrey
    },

        


        visitRewards: {
            // marginTop: 60,
        },

            loyaltyCard: {
                flexDirection: 'row',
                flexWrap: 'wrap',
                paddingVertical: 10,
                ...shadowStyles.lowerGreyShadow,
                alignItems: 'center'
                // ...Helpers.center,
                // width: cardWidth,
                // height: 0.6*Metrics.screenHeight,
            },

                stampContainer: {
                    ...Helpers.center,
                    marginVertical: 5,
                    height: 50,
                    width: Metrics.screenWidth/5,
                    
                    
                },

                    stamp: {
                        ...viewStyles.standardCircle,
                        ...Helpers.center,
                        backgroundColor: '#fff',
                        borderColor: Colors.primary,
                        borderWidth: 1,
                    },

                        visitNumber: {
                            ...Fonts.style.big,
                            fontWeight: "bold"
                        },
        
            visitRewardContainer: {
                marginTop: 5,
                flexDirection: 'row',
                backgroundColor: Colors.white,
            },

                visitContainer: {
                    flex: 0.2,
                    backgroundColor: Colors.primary,
                    borderRightWidth: 2,
                    borderRightColor: Colors.primary,
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                    ...Helpers.center,
                    padding: 10
                },

                rewardContainer: {
                    flex: 0.8,
                    justifyContent: 'center',
                    paddingHorizontal: 10
                },

        staticRewards: {
            marginTop: 5,
            
        },

            dealContainer: {
                width: Metrics.screenWidth,
                height: 50,
                borderTopLeftRadius: 25, 
                borderBottomLeftRadius: 25, 
                backgroundColor: Colors.white,
                // marginLeft: Metrics.doubleBaseMargin,
                flexDirection: 'row',
                marginVertical: 5,
            },

            dealIconContainer: {
                flex: 0.2,
            },

            dealTextContainer: {
                flex: 0.5,
                ...Helpers.center
            },

                deal: {
                    ...Fonts.style.normal,
                    color: Colors.primary,
                },

            dealButtonContainer: {
                flex: 0.3,
                ...Helpers.center
            },

                dealButton: {
                    borderWidth: 1,
                    borderColor: Colors.primary,
                    borderRadius: 10,
                    margin: 5,
                    padding: 5,
                },

                    dealButtonText: {
                        ...Fonts.style.normal,
                        fontWeight: "500",
                        color: Colors.primary
                    },
                
        addressContainer: {
            marginHorizontal: Metrics.doubleBaseMargin,
            paddingVertical: 20,
            alignItems: 'flex-start',
            // backgroundColor: Colors.white,
            // ...Helpers.center,
        },          

            address: {
                ...Fonts.style.medium,
                textAlign: 'center',
                color: Colors.text,
                fontWeight: "300",
                marginLeft: 5,
            },






    // SHAPES

    purpleCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.primary,
        ...Helpers.center,
    },

    circle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.secondary,
        ...Helpers.center,
    },
    

    semiCircle: {
        width: circleSize/2,
        height: circleSize,
        borderTopLeftRadius: circleSize/4,
        borderTopRightRadius: circleSize/4,
        transform: [
            {rotate: '180deg'},
            {scaleX: 1.3}
        ],
        backgroundColor: Colors.secondary,
    },
    
    triangle: {
        width: 5,
        height: 5,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: triangleSize,
        borderRightWidth: triangleSize,
        borderBottomWidth: 2*triangleSize,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: Colors.secondary,
        transform: [
            {rotate: '180deg'}
        ]
    },


})