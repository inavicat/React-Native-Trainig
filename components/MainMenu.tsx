import { logoutService } from "@/services/auth-service";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { Drawer } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthStoreContext } from "@/contexts/AuthContext";
import { useContext } from "react";
export default function MainMenu(props: any) {

  const { profile } = useContext(AuthStoreContext);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ImageBackground
          source={{
            uri: "https://plus.unsplash.com/premium_photo-1668447592220-9845a3c0e768?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          style={styles.image}
          transition={1000}
        >
          <View style={styles.overlay}>
            <View style={styles.content}>
              <Text style={styles.text}>Welcome</Text>
              {
                profile && <Text style={{color:"white",fontSize:20}}> {profile.name}</Text>
              }
            </View>
          </View>
        </ImageBackground>

        <View>
          <Drawer.Section title="MENU">
            <Drawer.Item
              icon="home"
              label="หน้าหลัก"
              // active={active === 'first'}
              onPress={() => {
                props.navigation.navigate('(tabs)')
              }}
            />
          
            {/* <Drawer.Item
              icon="star"
              label="แนะนำ"
              // active={active === 'second'}
              // onPress={() => setActive('second')}
            />
            
            <Drawer.Item
              icon="star"
              label="ตั้งค่า"
              // active={active === 'second'}
              // onPress={() => setActive('second')}
            /> */}
            <Drawer.Item
              icon="book"
              label="Course"

              // active={active === 'second'}
              onPress={() => {
                props.navigation.navigate('(course)')
              }}
            />

            <Drawer.Item 
            icon="virus"
            label="COVID19 Report"
            onPress={() => {
              props.navigation.navigate('(covid)')
            }}

            />
          
            <Drawer.Item
              icon="logout"
              label="Logout"

              // active={active === 'second'}
              onPress={async() => {
                await logoutService();
                router.replace('/login')
                
              }}
            />
          </Drawer.Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  image: {
    flex: 0,
    width: "100%",
  },
  overlay: {
    // flex: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // สีพื้นหลังโปร่งใส (ดำ 50%)
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
