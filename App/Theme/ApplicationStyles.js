import Colors from './Colors'
import Metrics from './Metrics'

export default {
  mainContainer: {
    flex: 1,
  },
  linearGradient: { flex: 1, paddingLeft: 15, paddingRight: 15, borderRadius: 5 },
  container: {
    display: 'flex',
    height: Metrics.screenHeight,
    // justifyContent: 'space-between',
    paddingTop: Metrics.screenHeight * 0.05,
    width: '100%',
  },
  inlineFlex: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  whiteHeader: {
    color: Colors.white,
    fontSize: 26,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  greenArrow: {
    width: (60 / 3),
    height: (54 /3)
  },
  smallCC: {
    width: (135 / 4),
    height: (99 /4),
    marginRight: 20
  },
  actionItem: {
    width: '100%',
    backgroundColor: Colors.white,
    padding: 15,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.10,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  actionItemText: {
    fontSize: 16,
    marginTop: 4,
  },
  actionItemLeft: {
    display: 'flex',
    flexDirection: 'row'
  }
}

