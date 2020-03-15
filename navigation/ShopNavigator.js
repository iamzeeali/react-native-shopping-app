import * as React from "react";
import { Button, View, Text, StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { navigationRef } from "../RootNavigation";
import * as RootNavigation from "../RootNavigation";
import { Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

//Screens
import ProductsOverviewScreen from "../screens/shops/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shops/ProductDetailScreen";
import CartScreen from "../screens/shops/CartScreen";
import OrdersScreen from "../screens/shops/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";

const HomeStack = createStackNavigator();
const ProductDetailStack = createStackNavigator();
const CartStack = createStackNavigator();
const OrderStack = createStackNavigator();
const AuthStack = createStackNavigator();

const authStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="auth"
      component={AuthScreen}
      options={{
        title: "Authenticate",
        headerTitleStyle: { fontFamily: "open-sans-bold" },
        headerBackTitle: "open-sans",
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : ""
        },
        headerTintColor: Platform.OS === "android" ? "#ffffff" : Colors.primary
      }}
    />
  </AuthStack.Navigator>
);

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={ProductsOverviewScreen}
      options={{
        title: "All Products",
        headerTitleStyle: { fontFamily: "open-sans-bold" },
        headerBackTitle: "open-sans",
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : ""
        },
        headerTintColor: Platform.OS === "android" ? "#ffffff" : Colors.primary,
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="cart"
              iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              onPress={() => RootNavigation.navigate("Cart")}
            />
          </HeaderButtons>
        ),
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
              onPress={() =>
                RootNavigation.navigationRef.current.dispatch(
                  DrawerActions.toggleDrawer()
                )
              }
            />
          </HeaderButtons>
        )
      }}
    />
  </HomeStack.Navigator>
);

const CartStackScreen = () => (
  <CartStack.Navigator>
    <CartStack.Screen
      name="Cart"
      component={CartScreen}
      options={{
        headerShown: false
      }}
    />
  </CartStack.Navigator>
);

const OrderStackScreen = () => (
  <OrderStack.Navigator>
    <OrderStack.Screen
      name="Order"
      component={OrdersScreen}
      options={{
        title: "Your Orders",
        headerTitleStyle: { fontFamily: "open-sans-bold" },
        headerBackTitle: "open-sans",
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : ""
        },
        headerTintColor: Platform.OS === "android" ? "#ffffff" : Colors.primary,
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="cart"
              iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
              onPress={() =>
                RootNavigation.navigationRef.current.dispatch(
                  DrawerActions.toggleDrawer()
                )
              }
            />
          </HeaderButtons>
        )
      }}
    />
  </OrderStack.Navigator>
);

const UserProductStack = createStackNavigator();
const UserProductStackScreen = () => (
  <UserProductStack.Navigator>
    <UserProductStack.Screen
      name="Your Orders"
      component={UserProductsScreen}
      options={({ route }) => ({
        title: "Your Products",
        headerTitleStyle: { fontFamily: "open-sans-bold" },
        headerBackTitle: "open-sans",
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : ""
        },
        headerTintColor: Platform.OS === "android" ? "#ffffff" : Colors.primary,
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Add"
              iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
              onPress={() => RootNavigation.navigate("EditProduct")}
            />
          </HeaderButtons>
        ),
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="cart"
              iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
              onPress={() =>
                RootNavigation.navigationRef.current.dispatch(
                  DrawerActions.toggleDrawer()
                )
              }
            />
          </HeaderButtons>
        )
      })}
    />
  </UserProductStack.Navigator>
);

const logout = () => {
  const dispatch = useDispatch();
  dispatch(authActions.logout());
  // RootNavigation.navigate("auth");
  return null;
};

const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator>
    <Drawer.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        title: "Products",
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      }}
    />
    <Drawer.Screen
      name="Order"
      component={OrderStackScreen}
      options={{
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === "android" ? "md-list" : "ios-list"}
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      }}
    />
    <Drawer.Screen
      name="Admin"
      component={UserProductStackScreen}
      options={{
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === "android" ? "md-create" : "ios-create"}
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      }}
    />
    <Drawer.Screen
      name="Logout"
      component={logout}
      options={{
        drawerLabel: "Logout",
        drawerIcon: drawerConfig => (
          <AntDesign
            name={Platform.OS === "android" ? "logout" : "logout"}
            size={21}
            color={drawerConfig.tintColor}
          />
        )
      }}
    />
  </Drawer.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = () => (
  <RootStack.Navigator>
    <RootStack.Screen
      name="auth"
      component={authStackScreen}
      options={{
        animationEnabled: false,
        headerShown: false
      }}
    />
    <RootStack.Screen
      name="App"
      component={DrawerScreen}
      options={{
        animationEnabled: false,
        headerShown: false
      }}
    />
    <RootStack.Screen
      name="Cart"
      component={CartStackScreen}
      options={{
        animationEnabled: false,
        headerTitleStyle: { fontFamily: "open-sans-bold" },
        headerBackTitle: "open-sans",
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : ""
        },
        headerTintColor: Platform.OS === "android" ? "#ffffff" : Colors.primary
      }}
    />
    <RootStack.Screen
      name="ProductDetail"
      component={ProductDetailScreen}
      options={({ route }) => ({
        animationEnabled: false,
        title: route.params.productTitle,
        headerTitleStyle: { fontFamily: "open-sans-bold" },
        headerBackTitle: "open-sans",
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : ""
        },
        headerTintColor: Platform.OS === "android" ? "#ffffff" : Colors.primary
      })}
    />

    <RootStack.Screen
      name="EditProduct"
      component={EditProductScreen}
      options={({ route }) => ({
        title:
          route.params && route.params.productId
            ? "Edit Product"
            : "Add Product",
        headerTitleStyle: { fontFamily: "open-sans-bold" },
        headerBackTitle: "open-sans",
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : ""
        },
        headerTintColor: Platform.OS === "android" ? "#ffffff" : Colors.primary,
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Save"
              iconName={
                Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
              }
              onPress={() => {
                route.params.submit();
              }}
            />
          </HeaderButtons>
        )
      })}
    />
  </RootStack.Navigator>
);

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%"
  }
});

export default () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStackScreen />
    </NavigationContainer>
  );
};
