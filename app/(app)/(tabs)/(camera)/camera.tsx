import React, { useState } from 'react';
import { Button, Image, View, StyleSheet, Text, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import axios from 'axios';

export default function CameraScreen() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async (sourceType: 'camera' | 'library') => {
    let result;
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    };

    try {
      if (sourceType === 'camera') {
        if (Platform.OS === 'ios' && Platform.constants.interfaceIdiom !== 'phone') {
          Alert.alert('Not Available', 'Camera is not available on this device. Please choose from library.');
          return;
        }
        result = await ImagePicker.launchCameraAsync(options);
      } else {
        result = await ImagePicker.launchImageLibraryAsync(options);
      }

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        // Resize image
        const manipResult = await manipulateAsync(
          selectedAsset.uri,
          [{ resize: { height: 400 } }],
          { compress: 0.5, format: SaveFormat.JPEG, base64: true }
        );

        setImage(manipResult.uri);

        // Upload to server
        await uploadImage(manipResult.base64);
      }
    } catch (error) {
      console.error('Error picking or manipulating image:', error);
      Alert.alert('Error', 'An error occurred while processing the image.');
    }
  };

  const uploadImage = async (base64Image: string | undefined) => {
    if (!base64Image) {
      Alert.alert('Error', 'No image data to upload');
      return;
    }

    try {
      const url = "https://api.codingthailand.com/api/upload";
      const response = await axios.post(url, {
        picture: "data:image/jpeg;base64," + base64Image,
      });
      console.log('Upload response:', response.data);
      Alert.alert('Success', 'Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Upload Failed', 'Failed to upload the image to the server.');
    }
  };

  return (
    <View style={styles.container}>
      {(Platform.OS !== 'ios' || Platform.constants.interfaceIdiom === 'phone') && (
        <Button title="Take Photo" onPress={() => pickImage('camera')} />
      )}
      <Button title="Choose from Library" onPress={() => pickImage('library')} />
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});