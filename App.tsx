import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';
import Navigator from './src/navigation/index';
import { AuthProvider, useAuth } from './src/contexts/AuthContext'; // if you're using context

const App = () => {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
};

// const Root = () => {
//   const { loading } = useAuth();

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         {/* <ActivityIndicator size="large" color="#0000ff" style={styles.load} />
//         <Text>Authenticating...</Text> */}
//       </View>
//     );
//   }

//   return <Navigator />;
// };

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  load: {
    width: 100,
    height: 100,
    borderRadius: 50,
  }
});



// import React from "react";
// import {StatusBar, StyleSheet, Text,View} from "react-native";
// import Navigator from "./src/navigation";


// const App = () => {
//     return(
//         <View style={styles.container}>
//             <Navigator />

//             {/* <StatusBar style="auto" /> */}
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     justifyContent: 'center',
    
//   }
// })


// export default App;
