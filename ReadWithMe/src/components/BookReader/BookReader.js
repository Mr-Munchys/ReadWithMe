import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,ToolbarAndroid, Dimensions,Image } from 'react-native';
import WordItem from '../WordItem/WordItem';

var bookData = require('../../../books/json/aliceInWonderland.json');
var  colors = ['#ddd', '#efefef', 'red', '#666', 'rgba(0,0,0,.1)', '#ededed'];
const window = Dimensions.get('window');
import { StackNavigator } from 'react-navigation';

export default class BookReader extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bookTitle: 'Book Title1',
      chapters: "",
      chapterIds: "",
      textObjColor: [],
      textObjWord: [],
      curChapter: 0,
      curParagraph: 0,
      curWord: 0,
      processedChapters: [], //processedChapters[chap][paragraph][word]
      speechRecogText: "",
      speechRecogErr: "",
    };

    this.textObj = [];
    this.loadBook();
    this.initWords();
           
  }

  static navigationOptions = {
    title: 'BookReader',
    };

  initWords = ()=>{
    var curChapter = this.state.curChapter;
    var curParagraph = this.state.curParagraph;
    var curWord = this.state.curWord;

    this.state.textObjWord=this.state.processedChapters[curChapter][curParagraph];
    
    for(let i = 0; i < this.state.textObjWord.length; i++){
      this.state.textObjColor.push('rgba(0,0,0,1)');
    }
  }

  updateWords = ()=>{
    var curChapter = this.state.curChapter;
    var curParagraph = this.state.curParagraph;
  
    var textObjWord=this.state.processedChapters[curChapter][curParagraph];
    var textObjColor = []
    for(let i = 0; i < this.state.textObjWord.length; i++){
     textObjColor.push('rgba(0,0,0,1)');
    }
    this.setState({textObjWord: textObjWord, textObjColor: textObjColor});
  }

   loadBook = ()=>{
    this.state.bookTitle = bookData["title"];
    this.state.chapters = bookData["chapters"];
    this.state.chapterIds = bookData["chapterIds"];

    var section = []
    var chapterAndHeadings = []

    /*TODO: some how read in the whole book not just one section*/
    sectionChapters = this.state.chapters["item4"].split("<h2>"); //Divide the section into chapters
    
   // for(let k of bookData["chapters"].keys()){
      
     // sectionChapters.concat(bookData["chapters"][k].split("<h2>"));
    //}

    var theBook = {};
    var chapHeader = [], chapBlock = [], chapParagraphs = [],chapParagraphsWords = [];;
    for (let i = 0; i < sectionChapters.length; i++) {

      var chap = sectionChapters[i].split("</h2>"); //for each chapter divide it into header/chapter

      
      for (let j = 0; j < chap.length; j++) {
        if(chap[j].length > 200){
          chapBlock.push(chap[j]);//Save the blocks
          var chapPars = chap[j].split("<p>");
          for (let par = 0; par < chapPars.length; par++) {
            chapPars[par] = chapPars[par].replace("</p>","").trim();

            if(chapPars[par].length < 3){
              chapPars.splice(par, 1);
              par--;
            }
          }
          chapParagraphs.push(chapPars);//save the chapter split by paragraph
        }else if(chap[j].length > 10){
          chapHeader.push(chap[j].trim()); //save the headers
        }
      }
    } 

    var chapters = [];
    for (let chap = 0; chap< chapParagraphs.length; chap++) {
      var chapter = chapParagraphs[chap];
      var paragraphs = [];
      for (let parag = 0; parag< chapParagraphs.length; parag++) {
        var paragraph = chapter[parag];
        var words = paragraph.split(" ");  //array of words
        paragraphs.push(words);//push onto the array of words into the paragraph
      }
      chapters.push(paragraphs);//push the array of chapter paragraphs ontho the chapters array
    }

    this.state.processedChapters = chapters; //processedChapters[chap][paragraph][word]
  }

  _onPressButton = (idVal) => {
    console.log('You tapped the button '+this.state.textObjWord[idVal]+' !');
    var textObjColor = this.state.textObjColor;
    textObjColor[idVal] = colors[2];

    //Increment the word index
    var curWord = this.state.curWord;
    curWord += 1;
    var curParagraph = this.state.curParagraph;
    var curChapter = this.state.curChapter;

    var paragraph = this.state.processedChapters[curChapter][curParagraph];
    var chapter = this.state.processedChapters[curChapter];
    var endOfBook = false;
    var updateWordNeeded = false;

    if(curWord >= paragraph.length){
      updateWordNeeded = true;
      curWord = 0;
      curParagraph+=1;
      if(curParagraph >= chapter.length){
        curParagraph = 0;
        curChapter+=1;
        if(curChapter >= this.state.processedChapters.length){
          //End of Book
          curChapter = 0;
          endOfBook = true;
        }
      }
    }

    if(endOfBook){
      //Do something for when the book finishes
    }else{
      //Update the indexes
      if(updateWordNeeded){
        this.state.curWord = curWord;
        this.state.curParagraph = curParagraph;
        this.state.curChapter = curChapter;
        this.updateWords(); //update the pages words if needed ... It will call set state.
      }else{
        this.setState({curWord: curWord, curParagraph: curParagraph, curChapter: curChapter, textObjColor: textObjColor});
      }
    }
  }

  _onActionSelected= (pos) => {
    if (pos === 0) { // index of 'Settings'
      showSettings();
    }
  }

  _onStartListen = () =>{
    
  }

  _onStopListen = () =>{
  }

  render() {

   // this.textObj = [];

     // for (let i = 0; i < this.state.textObjWord.length; i++) {
     //   this.textObj.push(  
       //         <Text key={i} style={{color: this.state.textObjColor[i] }} onPress={ () => this._onPressButton(i) } >{this.state.textObjWord[i]}</Text>    
         // )
     // }

      const words = this.state.textObjWord.map((word,i) => (
        <WordItem key={i} borderBottomWidth={i==this.state.curWord ? 1 : 0}  color={this.state.textObjColor[i]} wordText={this.state.textObjWord[i] } postSymbol=" " preSymbol="" onPress={ () => this._onPressButton(i) } />
      ));

    return (
      <View style={styles.mainContainer}>
        <View style={styles.toolbar}>
          <TouchableOpacity onPress={() => this.props.nav.navigate('Library')}><Image style={styles.iconIm} source={require('../../../icon_library.png')} /></TouchableOpacity>
          <Text style={styles.toolbarTitle}>{this.state.bookTitle}</Text>
          <TouchableOpacity onPress={this._onStopListen}><Image style={styles.iconIm} source={require('../../../icon_settings.png')} /></TouchableOpacity>
        </View>

        <View style={styles.content}>
          {words}
          <Text>{"Current Word: " + String(this.state.curWord)+"/"+String(this.state.processedChapters[this.state.curChapter][this.state.curParagraph].length)}</Text>
          <Text>{"Current Paragraph: " + String(this.state.curParagraph)}</Text>
          <Text>{"Current Chapter: " + String(this.state.curChapter)}</Text>
          <Text>{"Watson Text: " + this.state.watsonText}</Text>
          <Text>{"Watson Error: " + this.state.watsonTextErr}</Text>

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