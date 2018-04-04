import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const wordItem = (props) => (
    <View style={styles.wordItemContainer}>
        <Text style={{color: props.color}}>{props.preSymbol}{props.wordText}{props.postSymbol}</Text>
    </View>
);

const styles = StyleSheet.create({
    wordItemContainer: {
        backgroundColor: "white",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        borderColor: "black",
        borderWidth: 1

    }
});

export default wordItem;