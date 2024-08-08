import AppHeader from "@/components/AppHeader";
import AppLogo from "@/components/AppLogo";
import { HelloWave } from "@/components/HelloWave";
import { StyleSheet, Text, View } from "react-native";

type User = {
  id: number;
  name?: string;
};

export default function TabTwoScreen() {
  let fullname: string;
  fullname = "Mary Doe";
  const age = 20;
  const users: Array<User> = [];
  users.push({ id: 1, name: "Joe" });
  users.push({ id: 2, name: "Mary" });
  const isShow = true;

  return (
    <View style={styles.container}>
      {isShow && <AppLogo />}
      {isShow && (
        <View style={{
          flexDirection:'row',
          // margin:30,
          backgroundColor:'red',
          justifyContent:'center',
          alignItems:'center',
          height:"20%",
          width:'100%'
          }}>
          <HelloWave />
          <HelloWave />
          <HelloWave />
        </View>
      )}
      {isShow ? <Text>True</Text> : <Text>False</Text>}
      <Text style={styles.bigText}>Hello {fullname}</Text>
      <Text>
        {age} {users.length}
      </Text>
      <AppHeader title="test A" isShow />
      <AppHeader title="test B" isShow={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    backgroundColor: "yellow",
  },
  bigText: {
    color: "blue",
    fontSize: 30,
  },
});
