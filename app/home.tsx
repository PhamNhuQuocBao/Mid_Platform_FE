import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { HomeStyle } from "@/stylesheets/home";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductResponse } from "@/types";
import { deleteProduct, getAllProduct } from "@/services/product";
import ProductItem from "@/components/ProductItem";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";

export default function Index() {
  const router = useRouter();
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");

  const fetchProducts = useCallback(async () => {
    const res = await getAllProduct();
    setProducts(res);
  }, []);

  const handleLongPress = useCallback(
    (id: string) => {
      setModalVisible(true);
      setSelectedId(id);
    },
    [selectedId, modalVisible]
  );

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
  }, [modalVisible]);

  const handleDeleteProduct = useCallback(async (id: string) => {
    Alert.alert(
      "Confirm", // Tiêu đề của Alert
      "Are you sure you want to delete?", // Nội dung của Alert
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel", // Định dạng cho nút Cancel (được hiển thị đậm hơn)
        },
        {
          text: "OK",
          onPress: async () => {
            const res = await deleteProduct(id);
            if (res && res.status === 200) {
              Alert.alert("Success", "Product deleted successfully");
              handleCloseModal();
              fetchProducts();
            } else {
              Alert.alert("Error", "Something went wrong");
            }
          },
        },
      ]
    );
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View style={HomeStyle.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "gray" }}>status:</Text>
          <View
            style={{ width: 10, height: 10, backgroundColor: "gray" }}
          ></View>
          <Text>done</Text>
          <View
            style={{ width: 10, height: 10, backgroundColor: "white" }}
          ></View>
          <Text>undone</Text>
        </View>
        <Pressable style={HomeStyle.addButton} onPress={fetchProducts}>
          <Ionicons name="reload" size={16} color="black" />
        </Pressable>

        <Pressable
          style={HomeStyle.addButton}
          onPress={() => router.push("/create")}
        >
          <Text>New</Text>
          <FontAwesome name="plus" size={16} color="black" />
        </Pressable>
      </View>
      <ScrollView>
        <View style={{ display: "flex", gap: 10 }}>
          {products.map((product) => (
            <ProductItem
              key={product._id}
              data={product}
              onLongPress={() => handleLongPress(product._id)}
              onPress={() => {
                router.push({
                  pathname: "/[id]",
                  params: { id: product._id },
                });
              }}
            />
          ))}
        </View>
      </ScrollView>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={HomeStyle.modalContainer}>
          <View style={HomeStyle.modalContent}>
            <Text style={HomeStyle.modalText}>Action!</Text>
            <Pressable
              style={{ flexDirection: "row", gap: 8 }}
              onPress={() =>
                router.push({ pathname: "/update", params: { id: selectedId } })
              }
            >
              <Text>Edit</Text>
              <Feather name="edit-3" size={20} color="black" />
            </Pressable>
            <Pressable
              style={{ flexDirection: "row", gap: 8, marginVertical: 16 }}
              onPress={handleDeleteProduct.bind(null, selectedId)}
            >
              <Text>Delete</Text>
              <Feather name="trash" size={18} color="black" />
            </Pressable>
            <Button title="Đóng" onPress={handleCloseModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
