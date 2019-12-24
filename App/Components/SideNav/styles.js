import { StyleSheet } from 'react-native'
import Helpers from '../../Theme/Helpers'
import { Colors, Metrics, Fonts, ApplicationStyles } from '../../Theme'
// import ApplicationStyles from '../../Theme/ApplicationStyles'

export default StyleSheet.create({
  ...ApplicationStyles,
  ratingContainer: {
    width: (64 * 0.65) * 5,
    marginLeft: (Metrics.screenWidth - ((64 * 0.65) * 5)) / 2,
    display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'center',
    position: 'relative',
    height: (54 * 0.65),
  },
  ratingImages: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: (54 * 0.65),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ratingFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: (54 * 0.65),
    width: 0,
    backgroundColor: Colors.gold
  },
  rating: {
    width: (64 * 0.65),
    height: (54 * 0.65),
    marginLeft: -1,
  },

  drawerItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.background.drawerNavigator,
    marginVertical: 2,
    height: 40,
  },

  drawerItem: {
    color: Colors.white,
    ...Fonts.style.normal,
  }
})
