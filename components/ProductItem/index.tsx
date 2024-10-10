import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { ProductResponse } from "@/types";
import { ProductItemStyle } from "@/stylesheets/productItem";

interface Props extends React.ComponentProps<typeof Pressable> {
  data: ProductResponse;
}

const ProductItem: React.FC<Props> = ({ data, ...rest }) => {
  return (
    <Pressable {...rest} style={{ ...ProductItemStyle.container }}>
      <Image
        source={{
          uri:
            data.image ||
            "https://media.istockphoto.com/id/1197832105/vector/male-hand-holding-megaphone-with-new-product-speech-bubble-loudspeaker-banner-for-business.jpg?s=612x612&w=0&k=20&c=INIM5M-N2DZh6pS6DUBSGh7x9ItOBSC3atZOVJtQf7M=",
        }}
        style={{ width: 50, height: 50 }}
      />
      <View style={{ flex: 1, gap: 4 }}>
        <Text>{data.name}</Text>
        <Text>{`Type: ${data.category}`}</Text>
      </View>
      <Text>{`${data.price}$`}</Text>
    </Pressable>
  );
};

export default React.memo(ProductItem);
