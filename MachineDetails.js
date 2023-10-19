import * as React from 'react';
import { View, Text, Platform, FlatList, StyleSheet, Button, Alert } from 'react-native';
//import firebase from 'firebase/compat';
import {useEffect, useState} from "react";
import { getDatabase, ref, remove } from "firebase/database";

function MachineDetails ({route,navigation}){
    const [machine,setMachine] = useState({});

    useEffect(() => {
        /*Henter machine values og sætter dem*/
        setMachine(route.params.machine[1]);

        /*Når vi forlader screen, tøm object*/
        return () => {
            setMachine({})
        }
    });

    const handleEdit = () => {
        // Vi navigerer videre til EditMachine skærmen og sender maskinen videre med
        const machine = route.params.machine
        navigation.navigate('Edit Machine', { machine });
    };

    // Vi spørger brugeren om han er sikker
    const confirmDelete = () => {
        /*Er det mobile?*/
        if(Platform.OS ==='ios' || Platform.OS ==='android'){
            Alert.alert('Are you sure?', 'Do you want to delete the machine?', [
                { text: 'Cancel', style: 'cancel' },
                // Vi bruger this.handleDelete som eventHandler til onPress
                { text: 'Delete', style: 'destructive', onPress: () => handleDelete() },
            ]);
        }
    };

    const handleDelete = async () => {
        const id = route.params.machine[0];
        const db = getDatabase();
        // Define the path to the specific machine node you want to remove
        const machineRef = ref(db, `Machines/${id}`);
        
        // Use the 'remove' function to delete the machine node
       await remove(machineRef)
            .then(() => {
                navigation.goBack();
            })
            .catch((error) => {
                Alert.alert(error.message);
            });
    };

    if (!machine) {
        return <Text>No data</Text>;
    }

    //all content
    return (
        <View style={styles.container}>
            <Button title="Edit" onPress={ () => handleEdit()} />
            <Button title="Delete" onPress={() => confirmDelete()} />
            {
                Object.entries(machine).map((item,index)=>{
                    return(
                        <View style={styles.row} key={index}>
                            {/*Vores machine keys navn*/}
                            <Text style={styles.label}>{item[0]} </Text>
                            {/*Vores machine values navne */}
                            <Text style={styles.value}>{item[1]}</Text>
                        </View>
                    )
                })
            }
        </View>
    );
}

export default MachineDetails;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1 },
});