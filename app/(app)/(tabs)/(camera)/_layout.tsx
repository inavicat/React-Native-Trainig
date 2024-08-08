import { Stack } from "expo-router";

export default function CameraLayout() {
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

      <Stack.Screen name="camera" options={{ title: "กล้องถ่ายภาพ" }} />
    </Stack>
  );
}
