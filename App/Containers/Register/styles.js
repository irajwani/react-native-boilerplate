import {StyleSheet} from 'react-native';
import { Helpers, Colors, Fonts, Metrics } from '../../Theme';
import shadowStyles from '../../StyleSheets/shadowStyles';

export default StyleSheet.create({
    headerContainer: {
        flex: 0.1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    pictureContainer: {
        flex: 0.375,
        alignItems: 'center',
        margin: 5,
        marginBottom: 10,
    },

    fieldsContainer: {
        flex: 0.35,
        // backgroundColor: 'green'
    },

    fieldsContentContainer: {
        flexGrow: 1,
        justifyContent: 'center'
    },

    buttonContainer: {
        flex: 0.175,
        ...Helpers.center,
        
    },


    //Modal
    modal: {
        justifyContent: 'space-evenly', alignItems: 'center',
        paddingTop: Metrics.baseMargin,
        paddingHorizontal: Metrics.baseMargin,
    },
    modalHeader: {
        textAlign: 'center',
        ...Fonts.style.normal,
        fontWeight: "bold",
        paddingVertical: Metrics.baseMargin/2
    },
    acceptText: {
        ...Fonts.style.normal,
        color: Colors.success
    },
    rejectText: {
        ...Fonts.style.normal,
        color: Colors.error
    },
    hideModal: {
      ...Fonts.style.normal,
      fontWeight:'bold'
    },
    licenseContainer: {
        flexGrow: 0.6, 
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        padding: Metrics.baseMargin/2
    },
    documentOpenerContainer: {
        ...Helpers.center,
        padding: 10,
       
    },
    documentOpener: {
        ...Fonts.style.normal,
        color: Colors.primary,
        marginVertical: Metrics.baseMargin/2,
    },

        document: {
            ...Fonts.style.small
        },

    decisionButtons: {
        flexDirection: 'row',
        
    },

        decisionButton: {
            flex: 0.5,
            paddingVertical: 10,
            ...Helpers.center,
            borderWidth: 1,
            borderColor: Colors.secondary
        },
})