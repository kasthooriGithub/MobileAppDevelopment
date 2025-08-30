import React from "react";
import { View, Text, Button } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Welcome to Student App</Text>
      <Button title="Go to Registration" onPress={() => navigation.navigate("Registration")} />
      <Button title="View Users" onPress={() => navigation.navigate("UserList")} />
      <Button title="About" onPress={() => navigation.navigate("About")} />
    </View>
  );
}
