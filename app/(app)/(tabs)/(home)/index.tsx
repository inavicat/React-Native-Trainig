import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AppLogo from '@/components/AppLogo';
import { Link, useNavigation } from 'expo-router';
import { useContext, useEffect } from 'react';
import HomeLogo from '@/components/HomeLogo';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { AuthStoreContext } from '@/contexts/AuthContext';
import { Text } from 'react-native-paper';
import { useNetInfo } from '@react-native-community/netinfo';

export default function HomeScreen() {
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  const {profile} = useContext(AuthStoreContext);

  useEffect(() => {
     navigation.setOptions({
      //  title: 'หน้าหลัก',
      //  headerShown: false,
       headerTitle: () => <HomeLogo />,
       headerTitleAlign: 'center',
       headerLeft: () => (
         <Ionicons.Button 
            name='menu'
            size={30}
            color='white'
            backgroundColor='green'
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer());
            }}
         />
       ), 
       headerRight: () => (
         netInfo.isInternetReachable ? 
          <Ionicons name="wifi" size={30} /> : 
          <Ionicons name="cloud-offline" size={30} color="red" />
      ),
     });
  }, [navigation, netInfo]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>

        {
          <Text>{netInfo.type}</Text>
        }

        <Link href='/contact'>เปิดหน้าติดต่อเรา</Link>

        <Link href={{
          pathname: "/contact",
          params: {
            phone: '9888888888',
            address: 'Bangkok'
          }
        }}>เปิดหน้าติดต่อเราและส่งข้อมูล</Link>
        
        <AppLogo />
          {
            profile && (
              <>
                <Text>ยินดีต้อนรับคุณ {profile.name}</Text>
                <Text>User ID: {profile.id}</Text>
                <Text>Email: {profile.email}</Text>
              </>
            )
          }
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: 'red',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: 10,
    height: '40%'
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
    position: 'absolute',
  },
});
