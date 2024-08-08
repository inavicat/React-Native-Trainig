import { Link, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function ContactScreen() {
  const param = useLocalSearchParams();
  return (
    // <Text style={{backgroundColor:'yellow',marginTop:100}}>ContactScreen</Text>
    <>
      <Text>Contact</Text>
      <Text>
        {param.phone} {'\n'} {param.address}
      </Text>

      <Link
        style={{ color: "red" }}
        href={{
          pathname: "..",
        }}
      >
        กลับหน้าหลัก
      </Link>
    </>
  );
}
