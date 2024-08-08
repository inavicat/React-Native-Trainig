import { Image } from "react-native";

export default function HomeLogo() {
  return (
    <Image
      source={{
        uri: "https://plus.unsplash.com/premium_photo-1670282393309-70fd7f8eb1ef?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
      style={{
        width: 40,
        height: 40, // เพิ่ม height เพื่อให้รูปภาพแสดงผลได้อย่างถูกต้อง
      }}
    />
  );
}