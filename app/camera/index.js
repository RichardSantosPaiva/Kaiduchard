import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, Modal, Image } from 'react-native';
import { Camera } from 'expo-camera/legacy'; // Importação correta
import { FontAwesome } from '@expo/vector-icons';

export default function App() {
  const camRef = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Solicitando permissão para a câmera</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>Acesso Negado</Text>
      </View>
    );
  }

  async function takePicture() {
    if (camRef.current) {
      const data = await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri);
      setOpen(true);
      console.log("VOCÊ TIROU UMA FOTO ->"+data.uri); // Verificar a URI capturada
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={camRef}
      >
        <View style={styles.contentButtons}>
          <TouchableOpacity
            style={styles.buttonFlip}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          > 
            <FontAwesome name="exchange" size={23} color="red" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCamera}
            onPress={takePicture}
          >
            <FontAwesome name="camera" size={23} color="#000" />
          </TouchableOpacity>
        </View>
      </Camera>
      {capturedPhoto && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={open}
        >
          <View style={styles.contentModal}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setOpen(false)}
            >
              <FontAwesome name="close" size={50} color="#FFF" />
            </TouchableOpacity>
            <Image style={styles.imgPhoto} source={{ uri: capturedPhoto }} />
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  contentButtons: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  buttonFlip: {
    position: "absolute",
    bottom: 30,
    left: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    margin: 20,
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  buttonCamera: {
    position: "absolute",
    bottom: 30,
    right: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    margin: 20,
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  contentModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  imgPhoto: {
    width: '90%',
    height: 400,
    borderRadius: 20,
  },
});
