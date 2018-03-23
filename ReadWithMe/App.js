import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default class App extends React.Component {

  _onPressButton() {
    console.log('You tapped the button!')
  }

  render() {

      var page = [];
      for (let i = 0; i < 10; i++) { 
        var word = "Word" + String(i) + " ";
        page.push(  

                <Text key={i}  onPress={ () => this._onPressButton(i) } >{word}</Text>  

              

          )
      }

    return (


      <View style={styles.container}>
        <Text>{page}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  correctText: {
    fontFamily: 'Cochin',
    color: 'green',
  },
  warningText: {
    fontFamily: 'Cochin',
    color: 'yellow',
  },
  wrontText: {
    fontFamily: 'Cochin',
    color: 'blue',
  },
});
