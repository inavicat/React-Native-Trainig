import { AuthStoreContext } from "@/contexts/AuthContext";
import { loginService } from "@/services/auth-service";
import { router } from "expo-router";
import { useContext } from "react";
import { Alert, View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const schema = yup.object().shape({
  email: yup
    .string()
    .required("อีเมล์ห้ามว่าง")
    .email("รูปแบบอีเมล์ไม่ถูกต้อง"),
  password: yup
    .string()
    .required("รหัสผ่านห้ามว่าง")
    .min(3, "รหัสผ่านต้อง 3 ตัวอักษรขึ้นไป"),
});

export default function LoginScreen() {
  const { updateProfile } = useContext(AuthStoreContext);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
    mode: 'all'
  });
  const onSubmit = async (data: any) => {
    //   console.log(data);
    try {
        await loginService(data.email, data.password);
        // get latest profile from server
        await updateProfile(); // update global profile
        // go to tabs
        router.replace('/(tabs)');

    } catch (error: any) {
        if (error.response.data.message) {
            Alert.alert('ผลการทำงาน', error.response.data.message); // 401
        } else {
            Alert.alert('ผลการทำงาน', JSON.stringify(error)); // other
        }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Controller
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              keyboardType="email-address"
              mode="outlined"
              label="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={error ? true : false}
            />
            {error && (
              <HelperText type="error" visible={error ? true : false}>
                {error?.message}
              </HelperText>
            )}
          </>
        )}
        name="email"
      />

      <Controller
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              keyboardType="number-pad"
              secureTextEntry={true}
              mode="outlined"
              label="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={error ? true : false}
            />
            {error && (
              <HelperText type="error" visible={error ? true : false}>
                {error?.message}
              </HelperText>
            )}
          </>
        )}
        name="password"
      />

      <Button
        icon="login"
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={{ marginTop: 20, backgroundColor: "green" }}
        disabled={isSubmitting}
      >
        Log In
      </Button>
    </View>
  );
}