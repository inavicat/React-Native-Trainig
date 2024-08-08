import { getCourseService } from "@/services/course-service";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useEffect } from "react";
import { View } from "react-native";
import {
  ActivityIndicator,
  Card,
  Chip,
  Text,
  useTheme,
} from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import CardActions from "react-native-paper/lib/typescript/components/Card/CardActions";

export default function Course() {
  const navigation = useNavigation();
  const theme = useTheme();
  const { data, isPending, error, refetch, isRefetching } = useQuery<
    any,
    AxiosError<any, any>
  >({
    queryKey: ["courseData"],
    queryFn: async () => {
      const res = await getCourseService();
      return res.data.data;
    },
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );


  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Ionicons.Button
          name="menu"
          size={30}
          color={theme.colors.onSurface}
          backgroundColor="transparent"
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
        />
      ),
    });
  }, [navigation, theme]);

  if (isRefetching) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }


  if (isPending) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
      >
        <Card>
          <Card.Content>
            <Text variant="bodyLarge" style={{ color: theme.colors.error }}>
              {error.message}
            </Text>
            {error && <Text variant="bodyMedium">ไม่สามารถดึงข้อมูลได้</Text>}
            <Text variant="bodySmall">
              Error จาก Server: {JSON.stringify(error.response?.data)}
            </Text>
            <Text variant="bodySmall">
              Error จาก Server: {error.response?.data?.message}
            </Text>
          </Card.Content>
        </Card>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 8 }}>
      <FlashList
        // horizontal
        data={data}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 8 }}>
            <Card.Cover source={{ uri: item.picture }} />
            <Card.Content>
              <Text variant="titleLarge">{item.title}</Text>
              <Text variant="bodyMedium">{item.detail}</Text>
              <Text variant="bodySmall">วันที่: {item.date}</Text>
              <Text variant="bodySmall">ยอดวิว: {item.view}</Text>
            </Card.Content>
            <Card.Actions>
              <Chip icon="eye">{item.view}</Chip>
              <Chip icon="calendar">{item.date}</Chip>
            </Card.Actions>
          </Card>
        )}
        estimatedItemSize={300}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
