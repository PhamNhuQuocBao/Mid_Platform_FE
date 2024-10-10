import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="(Auth)">
      <Stack.Screen name="(Auth)" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ title: "Product Dashboard" }} />
      <Stack.Screen name="create" options={{ title: "Create Product" }} />
      <Stack.Screen name="update" options={{ title: "Update Product" }} />
      <Stack.Screen name="[id]" options={{ title: "Detail Product" }} />
    </Stack>
  );
}
