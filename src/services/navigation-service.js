import {CommonActions, StackActions} from '@react-navigation/native';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  navigator.dispatch(
    CommonActions.navigate({
      routeName,
      params,
    }),
  );
}

function goBack(routeName, params) {
  navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [
        CommonActions.navigate({
          routeName,
          params,
        }),
      ],
    }),
  );
}

function replace(routeName, params) {
  navigator.dispatch(
    StackActions.replace({
      index: 0,
      actions: [
        CommonActions.navigate({
          routeName,
          params,
        }),
      ],
    }),
  );
}

function pop() {
  navigator.dispatch(StackActions.pop());
}

function popToTop() {
  navigator.dispatch(StackActions.popToTop());
}

// add other navigation functions that you need and export them

export default {
  navigate,
  goBack,
  replace,
  pop,
  popToTop,
  setTopLevelNavigator,
};
