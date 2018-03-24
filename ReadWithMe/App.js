import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

var  colors = ['#ddd', '#efefef', 'red', '#666', 'rgba(0,0,0,.1)', '#ededed'];

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {color: '#ddd'};

    this.color = '#ddd';
    this.textObjColor = [];
    this.textObjWord = [];
    this.textObj = [];
    this.initWords();

  }

  initWords(){
    for (let i = 0; i < 10; i++) { 
      var word = "Word" + String(i) + " ";
        this.textObjWord.push(word);

        this.textObjColor.push('rgb(0,0,0)');
      }
  }

  _onPressButton(idVal) {
    console.log('You tapped the button '+this.textObjWord[idVal]+' !');
    this.textObjColor[idVal] = colors[2];
    this.color = colors[2];
    this.setState({color: 'rgb(1,0,0)'});
  }

  render() {

    this.textObj = [];

      for (let i = 0; i < this.textObjWord.length; i++) {
        var word = this.textObjWord[i];
        this.textObj.push(  
                <Text key={i} style={{color: this.textObjColor[i] }} onPress={ () => this._onPressButton(i) } >{word}</Text>    
          )
      }

    return (


      <View style={styles.container}>
        <Text>{this.textObj}</Text>
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
