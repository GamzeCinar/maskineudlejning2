import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, off } from "firebase/database";

function MachineList({ navigation }) {
    const [machines, setMachines] = useState();

    useEffect(() => {
        const db = getDatabase();
        const machinesRef = ref(db, "Machines");

        onValue(machinesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setMachines(data);
            }
        });

        return () => {
            off(machinesRef);
        };
    }, []);

    if (!machines) {
        return <Text>Be the first to add a machine!...</Text>;
    }

    const handleSelectMachine = id => {
        const machine = Object.entries(machines).find(machine => machine[0] === id);
        navigation.navigate('Machine Details', { machine });
    };

    const getMachineColor = (available) => {
        return available ? 'green' : 'red';
    };

    const machineArray = Object.values(machines);
    const machineKeys = Object.keys(machines);

    return (
        <View>
            <FlatList
                data={machineArray}
                keyExtractor={(item, index) => machineKeys[index]}
                renderItem={({ item, index }) => {
                    const machineColor = getMachineColor(item.available);
                    return (
                        <TouchableOpacity style={[styles.container, { backgroundColor: machineColor }]} onPress={() => handleSelectMachine(machineKeys[index])}>
                            <Text style={styles.machineText}>
                                {item.name} {item.brand}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Rental History')}>
                <Text style={styles.buttonText}>View Your Rental History</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 10,
        margin: 5,
        padding: 5,
        height: 50,
        justifyContent: 'center'
    },
    machineText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    button: {
        borderWidth: 1,
        borderRadius: 10,
        margin: 5,
        padding: 5,
        height: 50,
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default MachineList;