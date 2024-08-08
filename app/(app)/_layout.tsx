import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import MainMenu from "@/components/MainMenu";
import { ActivityIndicator, PaperProvider } from "react-native-paper";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthStoreContext } from "@/contexts/AuthContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

// const isLogin = true;

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const { isLogin, isLoading } = useContext(AuthStoreContext);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  if (isLoading) {
    
    SplashScreen.hideAsync();

    return (
      <ActivityIndicator
        size="large"
        color="red"
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      ></ActivityIndicator>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          {isLogin ? (
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Drawer
                drawerContent={(props) => <MainMenu {...props} />}
                initialRouteName="(tabs)"
                screenOptions={{ headerShown: false }}
              />
            </GestureHandlerRootView>
          ) : (
            <Redirect href={"/login"}></Redirect>
          )}

          {/* <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack> */}
        </ThemeProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}
