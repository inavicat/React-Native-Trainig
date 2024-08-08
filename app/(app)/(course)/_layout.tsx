import { Stack } from "expo-router";

export default function CourseLayout() {
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

      <Stack.Screen name="course" options={{ title: "Course" }} />
    </Stack>
  );
}
