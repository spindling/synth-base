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
    color: "white",

  },
  headerItem:{
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 0,

  },
  headerRow: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 1,
    backgroundColor: "#c7c3ca93",

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
  const [newFormData, setNewFormData] = useState({ make: "", model: "", price: "", keyboard: "", type: "", voice: "" });
  const [modFormData, setModFormData] = useState({ make: "", model: "", price: "", keyboard: "", type: "", voice: "" });
  const [result, setResult] = useState("");
  const [items, setItems] = useState([]);
  const [id, setID] = useState("");
  const [modifyForm, setModifyForm] = useState(false);


  async function retrieveAllItems() {
    const response = await axios.get("http://localhost:3000/api");

    setItems(response.data);
  }

  async function enterItem() {
    const response = await axios.post("http://localhost:3000/api",
      {
        make: newFormData.make,
        model: newFormData.model,
        price: parseFloat(newFormData.price),
        keyboard: parseFloat(newFormData.keyboard),
        type: newFormData.type,
        voice: newFormData.voice
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
    const response = await axios.put("http://localhost:3000/api/" + id,
      {
        make: modFormData.make,
        model: modFormData.model,
        price: parseFloat(modFormData.price),
        keyboard: parseFloat(modFormData.keyboard),
        type: modFormData.type,
        voice: modFormData.voice
      });
  }

  async function retrieveItemtoModify(){
      const response = await axios.get("http://localhost:3000/api/" + id);
      setModFormData({
        make: response.data[0].make,
        model: response.data[0].model,
        price: response.data[0].price,       
        keyboard: response.data[0].keyboard, 
        type: response.data[0].type,
        voice: response.data[0].voice
      });
      

  }


  return (

    <View >

      <Text style={{ fontSize: 40, fontWeight: "bold" }}>SynthBase</Text>

      {modifyForm ? (
        <View style={{ backgroundColor: "#dae8fc", width: 500, borderWidth: 1, padding: 10 }}>

          <Text style={styles.subheading}>Modify Synth</Text>

          <Text>Make</Text>
          <TextInput
            style={styles.textBox}
            value={modFormData.make}
            onChangeText={data => setModFormData(values => ({ ...values, make: data }))}
          />
       
          <Text>Model</Text>
          <TextInput
            style={styles.textBox}
            value={modFormData.model}
            onChangeText={data => setModFormData(values => ({ ...values, model: data }))}
          />

          <Text>Price</Text>
          <TextInput
            style={styles.textBox}
            value={modFormData.price}
            onChangeText={data => setModFormData(values => ({ ...values, price: data }))}
          />

          <Text>Keyboard</Text>
          <TextInput
            style={styles.textBox}
            value={modFormData.keyboard}
            onChangeText={data => setModFormData(values => ({ ...values, keyboard: data }))}
          />

          <Text>Type</Text>
          <TextInput
            style={styles.textBox}
            value={modFormData.type}
            onChangeText={data => setModFormData(values => ({ ...values, type: data }))}
          />

          <Text>Voice</Text>
          <TextInput
            style={styles.textBox}
            value={modFormData.voice}
            onChangeText={data => setModFormData(values => ({ ...values, voice: data }))}
          />

          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            {modifyForm ? (
              <TouchableOpacity onPress={() => { modifyItem(); setModifyForm(false) }}>
                <View style={styles.touchableButton}>
                  <Text style={styles.buttonText}>Modify Item
                  </Text>
                </View>
              </TouchableOpacity>) :
              (
                <TouchableOpacity onPress={enterItem}>
                  <View style={styles.touchableButton}>
                    <Text style={styles.buttonText}>Enter Item
                    </Text>
                  </View>
                </TouchableOpacity>
              )}

          </View>
        </View>
      ) : (
        <View style={{ backgroundColor: "#dae8fc", width: 500, borderWidth: 1, padding: 10 }}>

          <Text style={styles.subheading}>Add New Synth</Text>

          <Text>Make</Text>
          <TextInput
            style={styles.textBox}
            value={newFormData.make}
            onChangeText={data => setNewFormData(values => ({ ...values, make: data }))}
          />
          <Text>{newFormData.make}</Text>
          <Text>Model</Text>
          <TextInput
            style={styles.textBox}
            value={newFormData.model}
            onChangeText={data => setNewFormData(values => ({ ...values, model: data }))}
          />

          <Text>Price</Text>
          <TextInput
            style={styles.textBox}
            value={newFormData.price}
            onChangeText={data => setNewFormData(values => ({ ...values, price: data }))}
          />

          <Text>Keyboard</Text>
          <TextInput
            style={styles.textBox}
            value={newFormData.keyboard}
            onChangeText={data => setNewFormData(values => ({ ...values, keyboard: data }))}
          />

          <Text>Type</Text>
          <TextInput
            style={styles.textBox}
            value={newFormData.type}
            onChangeText={data => setNewFormData(values => ({ ...values, type: data }))}
          />

          <Text>Voice</Text>
          <TextInput
            style={styles.textBox}
            value={newFormData.voice}
            onChangeText={data => setNewFormData(values => ({ ...values, voice: data }))}
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
      )}
      <View style={{ flexDirection: "row" }}>
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
          <View style={{ flexDirection: "column", backgroundColor: "#49eb5772", width: 400, height: 200, padding: 10 }}>
            <View style={{ flex: 2 }}>
              <Text style={styles.subheading}>Enter Synth ID:</Text>
              <TextInput
                style={styles.textBox}
                value={id}
                onChangeText={setID} />
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 3 }}>
                <TouchableOpacity onPress={retrieveItem}>
                  <View style={styles.touchableButton}>
                    <Text style={styles.buttonText}>Retrieve
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 3 }}>
                <TouchableOpacity onPress={() => {setModifyForm(true); retrieveItemtoModify();}}>
                  <View style={styles.touchableButton}>
                    <Text style={styles.buttonText}>Modify
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 3 }}>
                <TouchableOpacity onPress={deleteItem}>
                  <View style={styles.touchableButton}>
                    <Text style={styles.buttonText}>Delete
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </View>
      </View>

      <View style={{ padding: 10 }}>
        <Text style={styles.subheading}>Results</Text>
        <View style={styles.headerRow}>

          <Text style={styles.headerItem}>Make</Text>
          <Text style={styles.headerItem}>Model </Text>
          <Text style={styles.headerItem}>Price</Text>
          <Text style={styles.headerItem}>Keyboard</Text>
          <Text style={styles.headerItem}>Type</Text>
          <Text style={styles.headerItem}>Voice</Text>
        </View>
        

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
