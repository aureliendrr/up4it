import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import GroupsScreen from "../screens/GroupsScreen";
import FriendsScreen from "../screens/FriendsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import NotifyScreen from "../screens/NotifyScreen";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <Tab.Navigator
      initialRouteName="Groups"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = "";

          switch (route.name) {
            case "Groups":
              iconName = "people";
              break;
            case "Friends":
              iconName = "person-add";
              break;
            case "Notify":
              iconName = "notifications";
              break;
            case "Profile":
              iconName = "person-circle";
              break;
            case "Settings":
              iconName = "settings";
              break;
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Groups" component={GroupsScreen} />
      <Tab.Screen name="Friends" component={FriendsScreen} />
      <Tab.Screen
        name="Notify"
        component={NotifyScreen}
        options={{
          tabBarLabel: "",
          tabBarButton: (props) => {
            // Filter out any props with null values (especially delayLongPress)
            const filteredProps = Object.fromEntries(
              Object.entries(props).filter(([key, value]) => value !== null)
            );
            return (
              <TouchableOpacity
                {...filteredProps}
                style={{
                  top: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="add-circle" size={64} color="#007AFF" />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
