import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Theme';
import ApplicationStyles from '../../Theme/ApplicationStyles'


export default StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Metrics.screenHeight,
    backgroundColor: Colors.primary,

  },

  textContainer: {
    justifyContent: 'center'
  },

    companyName: {
      ...Fonts.style.h0,
      color: Colors.white,
      fontWeight: "bold"
    },

    companyInfo: {
      ...Fonts.style.big,
      color: Colors.secondary,
      textAlign: 'right',
      fontWeight: "bold",
      marginLeft: 20,
    },
    
  
})
