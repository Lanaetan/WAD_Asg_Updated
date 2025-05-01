import React from "react";
import {StatusBar, StyleSheet, Text,View} from "react-native";
import Navigator from "./src/navigation";


const App = () => {
    return(
        <View style={styles.container}>
            <Navigator />

            {/* <StatusBar style="auto" /> */}
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    
  }
})


export default App;
