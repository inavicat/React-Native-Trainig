import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useContext, useEffect } from "react";
import { Link, useNavigation } from "expo-router";
import HomeLogo from "@/components/HomeLogo";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { AuthStoreContext } from "@/contexts/AuthContext";
import { Text } from "react-native-paper";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { profile } = useContext(AuthStoreContext);

  const colorScheme = useColorScheme();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HomeLogo />,
      headerTitleAlign: "center",
      headerLeft: () => (
        <Ionicons.Button
          name="menu-outline"
          size={25}
          backgroundColor="transparent"
          color={colorScheme === "dark" ? "white" : "black"}
          // onPress={() => navigation.toggleDrawer()}
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer);
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <Link href="/contact">ติดต่อเรา</Link>
        <Link
          href={{
            pathname: "/contact",
            params: {
              phone: "1234566778",
              address: "thai",
            },
          }}
        >
          ติดต่อเราและส่งข้อมูล
        </Link>

          {
            profile && (
              <>
              <Text>Welcome : {profile.name}</Text>
              <Text>Your ID : {profile.id}</Text>
              <Text>Email : {profile.email}</Text>
              </>
            )
          }
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{" "}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: "coral",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    height: "40%",
    justifyContent: "center",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
