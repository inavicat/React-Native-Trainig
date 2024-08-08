import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack
    screenOptions={{
        headerStyle:{
            backgroundColor :'green'
        },
        headerTintColor : 'white',
        headerTitleStyle:{
            fontWeight:'bold'
        }
    }}
    >
      {/* <Stack.Screen name="index" 
      options={{
        title : 'หน้าหลัก'
      }} /> */}
      
      <Stack.Screen name="contact"
      options={{
        title:'ติดต่อ'
      }}
      />
      
    </Stack>
  );
}
