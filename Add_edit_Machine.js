import * as React from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, ScrollView, SafeAreaView, Switch } from 'react-native';
import { useEffect, useState } from "react";
import { getDatabase, ref, push, update } from "firebase/database";

function Add_edit_Machine({ navigation, route }) {
    const db = getDatabase();

    const initialState = {
        name: '',
        brand: '',
        description: '',
        price: '',
        available: true, // Initially set as available
    }

    const [newMachine, setNewMachine] = useState(initialState);

    /*Return true if we are on the edit machine*/
    const isEditMachine = route.name === "Edit Machine";

    useEffect(() => {
        if (isEditMachine) {
            const machine = route.params.machine[1];
            setNewMachine(machine);
        }
        return () => {
            setNewMachine(initialState);
        };
    }, []);

    const changeTextInput = (name, event) => {
        setNewMachine({ ...newMachine, [name]: event });
    }

    const handleSave = async () => {
        const { name, brand, description, price, available } = newMachine;

        if (name.length === 0 || brand.length === 0 || description.length === 0 || price.length === 0) {
            return Alert.alert('One or more fields are empty!');
        }

        if (isEditMachine) {
            const id = route.params.machine[0];
            const machineRef = ref(db, `Machines/${id}`);
            const updatedFields = {
                name,
                brand,
                description,
                price,
                available,
            };

            await update(machineRef, updatedFields)
                .then(() => {
                    Alert.alert("Your information is updated");
                    const machine = newMachine;
                    navigation.navigate("Machine Details", { machine });
                })
                .catch((error) => {
                    console.error(`Error: ${error.message}`);
                });

        } else {
            const machineRef = ref(db, "/Machines/");
            const newMachineData = {
                name,
                brand,
                description,
                price,
                available, 
            };

            await push(machineRef, newMachineData)
                .then(() => {
                    Alert.alert("Saved");
                    setNewMachine(initialState);
                })
                .catch((error) => {
                    console.error(`Error: ${error.message}`);
                });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.row}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        value={newMachine.name}
                        onChangeText={(event) => changeTextInput('name', event)}
                        style={styles.input}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Brand</Text>
                    <TextInput
                        value={newMachine.brand}
                        onChangeText={(event) => changeTextInput('brand', event)}
                        style={styles.input}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        value={newMachine.description}
                        onChangeText={(event) => changeTextInput('description', event)}
                        style={styles.input}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput
                        value={newMachine.price}
                        onChangeText={(event) => changeTextInput('price', event)}
                        style={styles.input}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Available</Text>
                    <Switch
                        value={newMachine.available}
                        onValueChange={(value) => setNewMachine({ ...newMachine, available: value })}
                    />
                </View>
                <Button title={isEditMachine ? "Save changes" : "Add machine"} onPress={() => handleSave()} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default Add_edit_Machine;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    label: {
        fontWeight: 'bold',
        width: 100
    },
    input: {
        borderWidth: 1,
        padding: 5,
        flex: 1
    },
});
