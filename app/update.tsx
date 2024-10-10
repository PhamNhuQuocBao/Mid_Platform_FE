import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
  Button,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { CreateStyle } from "@/stylesheets/create";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Product, ProductResponse } from "@/types";
import {
  createProduct,
  getProductById,
  updateProduct,
} from "@/services/product";
import * as ImagePicker from "expo-image-picker";
import { cloudinaryConfig } from "@/services";
import axios from "axios";

const CreateTodo = () => {
  const router = useRouter();
  const [dataForm, setDataForm] = useState<ProductResponse>({
    name: "",
    category: "",
    price: 0,
    image: "",
    _id: "",
    __v: 0,
  });
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const { id } = useLocalSearchParams();

  const handleChange = (key: keyof Product, value: string | number) => {
    setDataForm({
      ...dataForm,
      [key]: value,
    });
  };

  const pickImage = async () => {
    // Yêu cầu quyền truy cập
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access camera roll is required!");
        return;
      }
    }

    // Chọn ảnh từ thư viện
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const uploadImageToCloudinary = async (imageUri: string) => {
    const formData = new FormData();

    if (Platform.OS === "web") {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      formData.append("file", blob, new Date().getTime().toString());
      formData.append("upload_preset", cloudinaryConfig.uploadPreset);
    } else {
      formData.append("file", {
        uri: imageUri,
        type: "image/jpeg",
        name: new Date().getTime().toString(),
      });
      formData.append("upload_preset", cloudinaryConfig.uploadPreset);
    }

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.secure_url; // Đây là URL của ảnh đã được tải lên
    } catch (error) {
      console.log("Upload failed: ", error);
    }
  };

  const handleSubmit = useCallback(async () => {
    try {
      if (!dataForm.name || !dataForm.category) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }

      setLoading(true);
      let url = selectedImage;
      if (selectedImage) {
        url = await uploadImageToCloudinary(selectedImage);
      }

      const res = await updateProduct(id as string, {
        ...dataForm,
        price: Number(dataForm.price),
        image: url,
      });

      if (res && res.status === 200) {
        Alert.alert("Success", "Product created successfully");
        router.navigate("/home");
      }
    } catch {
      Alert.alert("Failed", "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [dataForm, selectedImage]);

  useLayoutEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getProductById(id as string);

        if (res && res.status === 200) {
          setDataForm(res.data);
        }
      } catch {
        Alert.alert("Error", "Something went wrong");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {loading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
      <View style={CreateStyle.container}>
        <TextInput
          placeholder="Name"
          style={CreateStyle.input}
          value={dataForm.name}
          onChange={(e) => handleChange("name", e.nativeEvent.text)}
        />
        <TextInput
          placeholder="Category"
          style={CreateStyle.input}
          value={dataForm.category}
          onChange={(e) => handleChange("category", e.nativeEvent.text)}
        />
        <TextInput
          keyboardType="numeric"
          placeholder="Price"
          style={CreateStyle.input}
          value={dataForm.price.toString()}
          onChange={(e) => handleChange("price", e.nativeEvent.text)}
        />
        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            style={{ width: 100, height: 100, marginTop: 10 }}
          />
        )}
        <Button title="Upload image" onPress={pickImage} />
        <TouchableOpacity style={CreateStyle.button} onPress={handleSubmit}>
          <Text style={CreateStyle.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CreateTodo;
