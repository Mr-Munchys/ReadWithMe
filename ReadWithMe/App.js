import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,ToolbarAndroid, Dimensions,Image } from 'react-native';
import WordItem from './src/components/WordItem/WordItem';
var bookData = require('./books/json/aliceInWonderland.json');

var  colors = ['#ddd', '#efefef', 'red', '#666', 'rgba(0,0,0,.1)', '#ededed'];
const window = Dimensions.get('window');


export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bookTitle: 'Book Title1',
      chapters: "",
      chapterIds: "",
      textObjColor: [],
      textObjWord: []
    };

    this.textObj = [];
    this.loadBook();
  }

  initWords = ()=>{
    var textObjWord = [];
    var textObjColor = [];
    for (let i = 0; i < 100; i++) { 
        var word = "Word" + String(i);
        textObjWord.push(word);
        textObjColor.push('rgb(0,0,0)');
      }
    this.state.textObjColor=textObjColor;
    this.state.textObjWord=textObjWord;
  }

   loadBook = ()=>{
    this.state.bookTitle = bookData["title"];
    this.state.chapters = bookData["chapters"];
    this.state.chapterIds = bookData["chapterIds"];

    var section = []
    var chapterAndHeadings = []
    chapters = this.state.chapters["item4"].split("<h2>"); //Divide the section into chapters

    var theBook = {};
    var chapHeader = [], chapBlock = [], chapParagraphs = [];
    for (let i = 0; i < chapters.length; i++) {

      var chap = chapters[i].split("</h2>"); //for each chapter divide it into header/chapter

      
      for (let j = 0; j < chap.length; j++) {
        if(chap[j].length > 200){
          chapBlock.push(chap[j]);//Save the blocks
          chapParagraphs.push(chap[j].split("<p>"));//save the chapter split by paragraph
        }else if(chap[j].length > 10){
          chapHeader.push(chap[j]); //save the headers
        }
      }
    } 

    this.state.textObjWord = chapParagraphs[0];
  }

  _onPressButton = (idVal) => {
    console.log('You tapped the button '+this.state.textObjWord[idVal]+' !');
    var textObjColor = this.state.textObjColor;
    textObjColor[idVal] = colors[2];
    this.setState({textObjColor: textObjColor});
  }

  _onActionSelected= (pos) => {
    if (pos === 0) { // index of 'Settings'
      showSettings();
    }
  }

  render() {
    

    this.textObj = [];

      for (let i = 0; i < this.state.textObjWord.length; i++) {
        this.textObj.push(  
                <Text key={i} style={{color: this.state.textObjColor[i] }} onPress={ () => this._onPressButton(i) } >{this.state.textObjWord[i]}</Text>    
          )
      }

      const words = this.state.textObjWord.map((word,i) => (
        <WordItem key={i} color={this.state.textObjColor[i]} wordText={this.state.textObjWord[i] } postSymbol=" " preSymbol="" />
      ));

    return (
      <View style={styles.mainContainer}>
        <View style={styles.toolbar}>
          <TouchableOpacity onPress={this.loadBook}><Image style={styles.iconIm} source={require('./icon_library.png')} /></TouchableOpacity>
          <Text style={styles.toolbarTitle}>{this.state.bookTitle}</Text>
          <TouchableOpacity onPress={this._onPressSettings}><Image style={styles.iconIm} source={require('./icon_settings.png')} /></TouchableOpacity>
        </View>

        <View style={styles.content}>
          {words}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer:{
    flex:1                  //Step 1
  },

  content:{
    backgroundColor:'#fff',
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 0,
    margin: 0,
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
    backgroundColor:'#1abc9c',
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
