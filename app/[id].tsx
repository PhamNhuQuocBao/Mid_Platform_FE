import { View, Text, Image, Alert, ActivityIndicator } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getProductById } from "@/services/product";
import { ProductResponse } from "@/types";

const DetailProduct = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<ProductResponse>();

  useLayoutEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getProductById(id as string);

        if (res && res.status === 200) {
          setProduct(res.data);
        }
      } catch {
        Alert.alert("Error", "Something went wrong");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View>
      <Image
        source={{
          uri:
            product?.image ||
            "https://media.istockphoto.com/id/1197832105/vector/male-hand-holding-megaphone-with-new-product-speech-bubble-loudspeaker-banner-for-business.jpg?s=612x612&w=0&k=20&c=INIM5M-N2DZh6pS6DUBSGh7x9ItOBSC3atZOVJtQf7M=",
        }}
        style={{ width: "100%", height: 300 }}
      />

      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          {product?.name}
        </Text>
        <Text>{`Type: ${product?.category}`}</Text>
        <Text>{`Price: ${product?.price}$`}</Text>
      </View>
    </View>
  );
};

export default DetailProduct;
