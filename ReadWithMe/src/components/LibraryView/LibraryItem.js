import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';
const window = Dimensions.get('window');

//props = title, imgPath, bookDescriptions
const LibraryItem = (props) => (
    <View style={styles.libraryItemContainer}>

    

        <View style={{width: window.width*0.25, height: window.height*0.25, backgroundColor: 'powderblue'}}>
        <TouchableOpacity style={{justifyContent: "center",width: window.width/4, height: window.height/4,}}>

        <Image style={styles.bookCoverImage} source={(props.imgPath)} />
        </TouchableOpacity>

        </View>
        
        <View style={{flex: 1, flexDirection: 'column',width: window.width*0.75 - 15, height: window.height*0.25, }}>
            
            <View style={styles.titleContainer}>
                <Text style={{color: "black", fontSize: 15}}>{props.title}</Text>
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={{color: "black", fontSize: 9}}>{props.bookDescriptions}</Text>
            </View>

            <View style={{ flex: 0.15, flexDirection: 'row', height: 25, alignItems: 'flex-start'}}>
                <View style={styles.completionContainer}>
                    <Text style={{color: "black", fontSize: 9}}>Completion: 25%</Text>
                </View>
                <View style={styles.AccuracyContainer}>
                    <Text style={{color: "black", fontSize: 9}}>Reading Accuracy: 88%</Text>
                </View>
            </View>

        </View>
    </View>
);

/*

        <TouchableOpacity style={{justifyContent: "center",width: window.width/4, height: window.height/4,}}>
            <Image style={styles.bookCoverImage} source={(props.imgPath)} />
        </TouchableOpacity>

        <View style={{width:'50%', height: window.height/3}}>
            <Text style={{color: "black", fontSize: 15}}>{props.title}</Text>
        </View>
*/


const styles = StyleSheet.create({
    libraryItemContainer: {
        flex: 1,
        flexDirection: 'row',

        backgroundColor: "#E3F2FD", //50
        alignItems: "center",
        justifyContent: "flex-start",
        borderColor: "black",
        borderWidth: 0,
        borderRadius: 3,
        padding: 5,
        margin: 5

    },

    bookCoverImage: {
        flex:1,
        width: undefined, 
        height: undefined
      },

    titleContainer: {
        flex: 0.15, 
        height: 25, 
        alignItems: 'center'
    },

    descriptionContainer: {
        flex: 0.70, 
        height: 25, 
        alignItems: 'center',  
        padding: 2
    },

    completionContainer: {
        flex: 0.5,
        height: 25, 
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 2
    },

    AccuracyContainer: {
        flex: 0.5, 
        height: 25,
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 2
    },

    bookCoverImage: {
        flex:1,
        width: undefined, 
        height: undefined
      }
});

export default LibraryItem;