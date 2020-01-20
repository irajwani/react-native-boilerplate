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

  companyName: {
    ...Fonts.style.h1,
    color: Colors.secondary,
    letterSpacing: 2,
  }
  
})
