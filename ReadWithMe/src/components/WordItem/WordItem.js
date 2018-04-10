import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const wordItem = (props) => (
    <View style={{
        backgroundColor: "white",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        borderColor: "black",
        borderBottomWidth: props.borderBottomWidth,
        borderRadius: 3
    }}>
        <Text style={{color: props.color, fontSize: 20}} onPress={props.onPress}>{props.preSymbol}{props.wordText}{props.postSymbol}</Text>
    </View>
);

const styles = StyleSheet.create({
    wordItemContainer: {
        backgroundColor: "white",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        borderColor: "black",
        borderBottomWidth: 0,
        borderRadius: 3

    }
});

export default wordItem;