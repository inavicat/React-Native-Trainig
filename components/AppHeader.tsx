import { useFocusEffect } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, Button, Text } from "react-native";

type AppHeaderProp = {
  title: string;
  isShow?: boolean;
};

export default function AppHeader({ title, isShow }: AppHeaderProp) {
  //   let myText = "Hello My Text";

  const [myText, setMyText] = useState("Hello My Text"); //Update Text on Click

  const HandleClickme = () => {
    setMyText("New My Text");//Update Text on Click

    // myText = "New My Text"
    // Alert.alert("สวัสดี");
  };

  useEffect(() => {
    console.log("ทำครั้งแรก และทุกครั้งที่ Rerender page");
  });

  useEffect(() => {
    console.log("ทำครั้งแรกครั้งเดียว");
  },[]);

  useEffect(() => {
    console.log("ทำครั้งแรกครั้งเดียว ตอนMyTextgเปลี่ยน");
  },[myText]);

  return (
    <>
      <Text>{myText}</Text>
      {isShow && <Text>{title}</Text>}
      <Button title="Click Me" onPress={HandleClickme} />
    </>
  );
}
