import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function AuthGuard() {
  const { isSignedIn } = { isSignedIn: false };

  if (!isSignedIn) {
    return <Redirect href="/pages/(auth)" />;
  } else if (isSignedIn) {
    return <Redirect href="/pages/(tabs)" />;
  }
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthGuard />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="pages/(auth)" />
        <Stack.Screen name="pages/(otp)" />
        <Stack.Screen name="pages/(tabs)" />
      </Stack>
      <StatusBar style="dark" />
    </GestureHandlerRootView>
  );
}
