import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Picker } from 'react-native';

const MachineFilter = ({ onApplyFilters, onBackPress }) => {
  const [filterCriteria, setFilterCriteria] = useState({
    name: '',
    brand: '',
    price: '',
    available
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Machine Filter</Text>
      <Text>Name:</Text>
      <TextInput
        style={styles.input}
        value={filterCriteria.name}
        onChangeText={(text) => setFilterCriteria({ ...filterCriteria, name: text })}
      />
      <Text>Brand:</Text>
      <TextInput
        style={styles.input}
        value={filterCriteria.brand}
        onChangeText={(text) => setFilterCriteria({ ...filterCriteria, brand: text })}
      />
      <Text>Brand:</Text>
      <TextInput
        style={styles.input}
        value={filterCriteria.brand}
        onChangeText={(text) => setFilterCriteria({ ...filterCriteria, brand: text })}
      />
      <Text>Availability:</Text>
      <Picker
        selectedValue={filterCriteria.available}
        onValueChange={(itemValue) =>
          setFilterCriteria({ ...filterCriteria, available: true })
        }
      >
        <Picker.Item label="Select Price" value="" />
      </Picker>
      <Button title="Apply Filters" onPress={() => onApplyFilters(filterCriteria)} />
      <Button title="Back" onPress={onBackPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    width: 200,
  },
});

export default MachineFilter;