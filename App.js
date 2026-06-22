/**
 * App.js — GSE Terminal
 * Root navigator: bottom tabs + stack for ticker profile
 */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";

import MarketBoardScreen   from "./src/screens/MarketBoardScreen";
import TickerProfileScreen from "./src/screens/TickerProfileScreen";
import IPOTrackerScreen    from "./src/screens/IPOTrackerScreen";
import DividendsScreen     from "./src/screens/DividendsScreen";
import ShareholdersScreen  from "./src/screens/ShareholdersScreen";
import NewsScreen          from "./src/screens/NewsScreen";
import { AppProvider }     from "./src/context/AppContext";

const Tab   = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AMBER  = "#d97706";
const MUTED  = "#92400e";
const BG     = "#ffffff";
const BORDER = "#e2e8f0";

function icon(name, focused) {
  const icons = {
    Market: focused ? "📊" : "📉",
    IPO:    focused ? "⚡" : "💡",
    Divs:   focused ? "💰" : "💵",
    Hold:   focused ? "🏛" : "🏢",
    News:   focused ? "📰" : "🗞",
  };
  return <Text style={{ fontSize: 18 }}>{icons[name]}</Text>;
}

function MarketStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: BG },
        headerTintColor: AMBER,
        headerTitleStyle: { fontFamily: "monospace", fontWeight: "700", color: "#0f172a" },
        headerBackTitle: "Market",
      }}
    >
      <Stack.Screen name="MarketBoard" component={MarketBoardScreen} options={{ title: "GSE Market Board" }} />
      <Stack.Screen name="TickerProfile" component={TickerProfileScreen} options={({ route }) => ({ title: route.params?.ticker || "Profile" })} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: AMBER,
            tabBarInactiveTintColor: MUTED,
            tabBarStyle: {
              backgroundColor: BG,
              borderTopColor: BORDER,
              borderTopWidth: 1.5,
              height: 60,
              paddingBottom: 8,
            },
            tabBarLabelStyle: { fontFamily: "monospace", fontSize: 10, fontWeight: "700" },
            tabBarIcon: ({ focused }) => icon(
              { MarketStack: "Market", IPO: "IPO", Dividends: "Divs", Shareholders: "Hold", News: "News" }[route.name],
              focused
            ),
          })}
        >
          <Tab.Screen name="MarketStack" component={MarketStack} options={{ title: "Market" }} />
          <Tab.Screen name="IPO"          component={IPOTrackerScreen}   options={{ title: "IPO", headerShown: true, headerStyle: { backgroundColor: BG }, headerTitleStyle: { fontFamily: "monospace", fontWeight: "700" } }} />
          <Tab.Screen name="Dividends"    component={DividendsScreen}    options={{ title: "Dividends", headerShown: true, headerStyle: { backgroundColor: BG }, headerTitleStyle: { fontFamily: "monospace", fontWeight: "700" } }} />
          <Tab.Screen name="Shareholders" component={ShareholdersScreen} options={{ title: "Holders", headerShown: true, headerStyle: { backgroundColor: BG }, headerTitleStyle: { fontFamily: "monospace", fontWeight: "700" } }} />
          <Tab.Screen name="News"         component={NewsScreen}         options={{ title: "News", headerShown: true, headerStyle: { backgroundColor: BG }, headerTitleStyle: { fontFamily: "monospace", fontWeight: "700" } }} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
