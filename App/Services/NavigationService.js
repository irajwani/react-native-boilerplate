import { NavigationActions, StackActions } from 'react-navigation'

let navigator


function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef
}

function navigate(routeName, params) {
  console.tron.log(routeName)
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  )
}

function goBack() {
  navigator.dispatch(
    NavigationActions.back()
  )
}

function navigateAndReset(routeName, params) {
  navigator.dispatch(
    StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({
          routeName,
          params,
        }),
      ],
    })
  )
}

export default {
  navigate,
  goBack,
  navigateAndReset,
  setTopLevelNavigator,
}