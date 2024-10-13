// Importando bibliotecas e componentes necessários

import * as React from 'react';
import { View, Text , StyleSheet,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Camera from './camera/'
import Location from './location/'

// Criando o stack navigator

const Stack = createNativeStackNavigator();

// Função que define a tela inicial (HomeScreen)

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{color:'white', fontSize:50}}>Home </Text>
      <Text style={{color:'#a7b8c2', fontSize:18,marginTop:10}}>Bem-vindo ao Kaiduchard</Text>

      <TouchableOpacity
        style={styles.button}
        title="Camera"
        onPress={() => navigation.navigate('Camera')}
      >
          <Text style={styles.buttonText}>Camera</Text>
      </TouchableOpacity>
       
       <TouchableOpacity
        style={styles.button}
        title="Location"
        onPress={() => navigation.navigate('Location')}
      >
        <Text style={styles.buttonText}>Location</Text>
      </TouchableOpacity>
    </View>
  );
}

// Função principal do aplicativo


function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Location" component={Location} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:80, 
    alignItems: 'center',
     backgroundColor:'#08082e',
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
  button:{
    width:200,
    alignItems:'center',
    borderColor:'#fcbf05',
    borderWidth: 3,
    borderRadius: 8, // Add rounded corners to the button
    padding:10,
    margin: 30, // Add margin for spacing between buttons
    backgroundColor:'#08082e',
  },
  buttonText: {
    color: '#fcbf05', // Text color for the button
    fontSize: 20, // Font size for the button text
  },
  map: {
    flex: 1,
    width: '100%',
  },
});