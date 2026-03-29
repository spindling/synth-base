import { TouchableHighlight, TouchableOpacity, StyleSheet, Button, TextInput, Text, View, ScrollView, FlatList } from "react-native";
import { useState } from "react";

import axios from "axios";
import { blue } from "react-native-reanimated/lib/typescript/Colors";

const styles = StyleSheet.create({
  content: {
    paddingTop: 50
  },

  subheading: {
    fontSize: 28
  },

  touchableButton: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 2,
    width: 100,
    height: 50,
    borderWidth: 1,
    backgroundColor: "#4169E1",

    //justifyContent: "center",
    //alignItems: "center",

  },
  buttonText: {
    fontSize: 16,
    color: "white"
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 0,
  },
  listRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 1,
    backgroundColor: "#87cfeb71"
  },
  textBox: {
    backgroundColor: "#eeeeeeff",
    borderWidth: 2,
    width: 200
  }

})
export default function RootLayout() {
  const [formData, setFormData] = useState({ make: "", model: "", price: "", keyboard: "", type: "", voice: "" });

  const [result, setResult] = useState("");
  const [items, setItems] = useState([]);
  const [id, setID] = useState("");

  async function retrieveAllItems() {
    const response = await axios.get("http://localhost:3000/api");

    setItems(response.data);
  }

  async function enterItem() {
    const response = await axios.post("http://localhost:3000/api",
      {
        make: formData.make,
        model: formData.model,
        price: parseFloat(formData.price),
        keyboard: parseFloat(formData.keyboard),
        type: formData.type,
        voice: formData.voice
      });
  }
  async function deleteAllItems() {
    const response = await axios.delete("http://localhost:3000/api");
  }

  async function retrieveItem() {
    //needs functionality to only retrieve one item if id is empty

    const response = await axios.get("http://localhost:3000/api/" + id);

    setItems(response.data);
  }

  async function deleteItem() {
    //needs functionality to only delete one item if id is empty
    const response = await axios.delete("http://localhost:3000/api/" + id);

  }

  async function modifyItem() {
    //todo
  }

  return (

    <View>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>SynthBase</Text>


      <View style={{ backgroundColor: "#dae8fc", width: 400, borderWidth: 1, padding: 10 }}>
        <Text style={styles.subheading}>Add New Synth</Text>
        <Text>Make</Text>
        <TextInput
          style={styles.textBox}
          value={formData.make}
          onChangeText={data => setFormData(values => ({ ...values, make: data }))}
        />

        <Text>Model</Text>
        <TextInput
          style={styles.textBox}
          value={formData.model}
          onChangeText={data => setFormData(values => ({ ...values, model: data }))}
        />

        <Text>Price</Text>
        <TextInput
          style={styles.textBox}
          value={formData.price}
          onChangeText={data => setFormData(values => ({ ...values, price: data }))}
        />

        <Text>Keyboard</Text>
        <TextInput
          style={styles.textBox}
          value={formData.keyboard}
          onChangeText={data => setFormData(values => ({ ...values, keyboard: data }))}
        />

        <Text>Type</Text>
        <TextInput
          style={styles.textBox}
          value={formData.type}
          onChangeText={data => setFormData(values => ({ ...values, type: data }))}
        />

        <Text>Voice</Text>
        <TextInput
          style={styles.textBox}
          value={formData.voice}
          onChangeText={data => setFormData(values => ({ ...values, voice: data }))}
        />
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity onPress={enterItem}>
            <View style={styles.touchableButton}>
              <Text style={styles.buttonText}>Enter Item
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flexDirection: "row", flex: 1 }}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity onPress={retrieveAllItems}>
            <View style={styles.touchableButton}>
              <Text style={styles.buttonText}>Retrieve All Items
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={deleteAllItems}>
            <View style={styles.touchableButton}>
              <Text style={styles.buttonText}>Delete All Items
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <View style={{flexDirection: "column", backgroundColor: "#49eb5772", width: 400,height: 200, padding: 10 }}>
            <View style={{flex: 2}}>
            <Text style={styles.subheading}>Enter Synth ID:</Text>
            <TextInput
              style={styles.textBox}
              value={id}
              onChangeText={setID} />
            </View>
            <View style={{ flex: 1, flexDirection:"row" }}>
              <View style={{ flex: 2 }}>
                <TouchableOpacity onPress={retrieveItem}>
                  <View style={styles.touchableButton}>
                    <Text style={styles.buttonText}>Retrieve
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 2 }}>
                <TouchableOpacity onPress={deleteItem}>
                  <View style={styles.touchableButton}>
                    <Text style={styles.buttonText}>Delete Item
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{padding: 10}}>
        <Text style={styles.subheading}>Results</Text>
        <FlatList data={items}
          renderItem={({ item }) =>
            <View style={styles.listRow}>

              <Text style={styles.listItem}>{item.make}</Text>
              <Text style={styles.listItem}>{item.model} </Text>
              <Text style={styles.listItem}>{item.price} </Text>
              <Text style={styles.listItem}>{item.keyboard} </Text>
              <Text style={styles.listItem}>{item.type} </Text>
              <Text style={styles.listItem}>{item.voice}</Text>
            </View>}
          keyExtractor={(item) => item.id}
        />

      </View>

    </View>
  );

}
