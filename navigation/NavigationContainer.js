import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ShopNavigator from "./ShopNavigator";
import { navigationRef } from "../RootNavigation";
import * as RootNavigation from "../RootNavigation";

const NavigationContainer = props => {
  const isAuth = useSelector(state => !!state.auth.token);
  useEffect(() => {
    if (!isAuth) {
      RootNavigation.navigate("auth");
    }
  }, [isAuth]);
  return <ShopNavigator ref={navigationRef} />;
};

export default NavigationContainer;
