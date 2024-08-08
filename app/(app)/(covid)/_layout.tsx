import { Stack } from "expo-router";

export default function CovidLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "darkgreen",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {/* <Stack.Screen name="index" 
      options={{
        title : 'หน้าหลัก'
      }} /> */}

      <Stack.Screen name="covid" options={{ title: "COVID" }} />
    </Stack>
  );
}
