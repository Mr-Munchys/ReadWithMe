import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,ToolbarAndroid, Dimensions,Image, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import LibraryItem from './LibraryItem';

const window = Dimensions.get('window');
var bookData = require('../../../books/json/aliceInWonderland.json');

export default class LibraryView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bookTitles: [],
      bookDescriptions: [],
      bookCoverPaths: [],

    };
    this.state.bookTitles.push("Alice In Wonder Land");
    this.state.bookTitles.push("Pride and Predjudice");

    this.state.bookDescriptions.push("Alice's Adventures in Wonderland is an 1865 novel written by English author Charles Lutwidge Dodgson under the pseudonym Lewis Carroll.");
    this.state.bookDescriptions.push("Pride and Prejudice is a romantic novel by Jane Austen, first published in 1813. The story charts the emotional development of the protagonist, Elizabeth Bennet, who learns the error of making hasty judgments and comes to appreciate the difference between the superficial and the essential.");

    this.state.bookCoverPaths.push(require('../../../books/images/aliceInWonderLand.jpg'));
    this.state.bookCoverPaths.push(require('../../../books/images/prideAndPrejudice.jpg'));

    this.state.bookTitles.push("Alice In Wonder Land");
    this.state.bookTitles.push("Pride and Predjudice");

    this.state.bookDescriptions.push("Alice's Adventures in Wonderland is an 1865 novel written by English author Charles Lutwidge Dodgson under the pseudonym Lewis Carroll.");
    this.state.bookDescriptions.push("Pride and Prejudice is a romantic novel by Jane Austen, first published in 1813. The story charts the emotional development of the protagonist, Elizabeth Bennet, who learns the error of making hasty judgments and comes to appreciate the difference between the superficial and the essential.");

    this.state.bookCoverPaths.push(require('../../../books/images/aliceInWonderLand.jpg'));
    this.state.bookCoverPaths.push(require('../../../books/images/prideAndPrejudice.jpg'));


    this.state.bookTitles.push("Alice In Wonder Land");
    this.state.bookTitles.push("Pride and Predjudice");

    this.state.bookDescriptions.push("Alice's Adventures in Wonderland is an 1865 novel written by English author Charles Lutwidge Dodgson under the pseudonym Lewis Carroll.");
    this.state.bookDescriptions.push("Pride and Prejudice is a romantic novel by Jane Austen, first published in 1813. The story charts the emotional development of the protagonist, Elizabeth Bennet, who learns the error of making hasty judgments and comes to appreciate the difference between the superficial and the essential.");

    this.state.bookCoverPaths.push(require('../../../books/images/aliceInWonderLand.jpg'));
    this.state.bookCoverPaths.push(require('../../../books/images/prideAndPrejudice.jpg'));


 }

  static navigationOptions = {
    title: 'Library',
    };


  render() {

    const libraryItems = this.state.bookTitles.map((word,i) => (
        <LibraryItem key={i} title={word} imgPath={this.state.bookCoverPaths[i]} bookDescriptions={this.state.bookDescriptions[i]}/>
      ));

    return (
      <View style={styles.mainContainer}>
        <View style={styles.toolbar}>
          <TouchableOpacity onPress={() => this.props.nav.navigate('Library')}><Image style={styles.iconIm} source={require('../../../icon_library.png')} /></TouchableOpacity>
          <Text style={styles.toolbarTitle}>Your Books</Text>
          <TouchableOpacity onPress={this._onStopListen}><Image style={styles.iconIm} source={require('../../../icon_settings.png')} /></TouchableOpacity>
        </View>

        <ScrollView style={styles.content} scrollEnabled={true}>
            {libraryItems}
        </ScrollView>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  mainContainer:{
    height: window.height,                   //Step 1
  },

  content:{
    backgroundColor:'#fff',
    flex: 1,
      },

  baseText: {
    fontFamily: 'Cochin',
    fontSize: 15
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
  toolbar:{
    backgroundColor:'#2196F3',
    paddingTop:10,
    paddingBottom:10,
    flexDirection:'row'    //Step 1
},
toolbarButton:{
    width: 50,            //Step 2
    color:'#fff',
    textAlign:'center'
},
toolbarTitle:{
    color:'#fff',
    textAlign:'center',
    fontWeight:'bold',
    flex:1,                //Step 3
    fontSize: 15
},
iconIm: {
  width: 28,
  height: 28
}
});