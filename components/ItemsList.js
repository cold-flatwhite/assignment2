import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

const ItemsList = ({data, renderItem}) => {
    return (
        <FlatList data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        />  
    );
}

export default ItemsList;
