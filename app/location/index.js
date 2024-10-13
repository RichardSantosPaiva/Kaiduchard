
// Importando hooks e componentes necessários
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

// Componente principal da página de localização

export default function LocationPage() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

    // Hook useEffect para solicitar permissão e obter a localização

  useEffect(() => {
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync(); // Armazena a localização no estado
      if (status !== 'granted') { 
        setErrorMsg('Permissão para acessar a localização foi negada');
        setLoading(false);
        return;
      }

      try {
                // Obtém a posição atual do dispositivo

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      } catch (error) {
        setErrorMsg('Erro ao obter a localização: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        </MapView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#08082e',
  },
  map: {
    borderRadius: 10,
    flex: 1,
    width: '100%',
  },
  error: {
    color: 'red',
  },
});
