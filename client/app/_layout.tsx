import {TouchableHighlight, TouchableOpacity, StyleSheet, Button, TextInput, Text, View, ScrollView, FlatList} from "react-native";
import {useState} from "react";

import axios from "axios";
import { blue } from "react-native-reanimated/lib/typescript/Colors";

const styles = StyleSheet.create({
    content:{
      paddingTop: 50
    },

    heading: {
      fontSize: 28
      },
    button: {
      flex: 1,
      width: 100,
      height: 50,
      backgroundColor: "lightblue",
      justifyContent: "center",
      alignItems: "center"
    },
    buttonText:{
      fontSize: 16
    },
    
    
})
export default function RootLayout() {
    const [formData, setFormData] = useState({make:"", model:"", price: "", keyboard:"",type:"", voice:""});
    
    const [result, setResult] = useState("");
    const [items, setItems] = useState([]);
    const [id, setID] = useState("");
    
    async function retrieveAllItems()
    {
      const response = await axios.get("http://localhost:3000/api");
  
      setItems(response.data); 
    }

    async function enterItem()
    {
      const response = await axios.post("http://localhost:3000/api",
                                        {make: formData.make, 
                                         model: formData.model,
                                         price: parseFloat(formData.price),
                                         keyboard: parseFloat(formData.keyboard),
                                         type: formData.type,
                                         voice: formData.voice});
    }
    async function deleteAllItems()
    {
      const response = await axios.delete("http://localhost:3000/api");
    }

    async function retrieveItem()
    {
      //needs functionality to only retrieve one item if id is empty

      const response = await axios.get("http://localhost:3000/api/" + id);
  
      setItems(response.data); 
    }

    async function deleteItem()
    {
      //needs functionality to only delete one item if id is empty
      const response = await axios.delete("http://localhost:3000/api/" + id);

    }

    async function modifyItem()
    {
      //todo
    }

    return (
      <View>
        <View style={{flex:1}}>
            
          <FlatList data={items}
                renderItem={({item}) => <Text>
                  
                  <View>

                  </View>
                  {item.make} {item.model} {item.price} {item.keyboard} {item.type} {item.voice}</Text>}
                keyExtractor={(item) => item.id }
          />  
           
        </View>
        
        
        <TouchableOpacity onPress={ retrieveAllItems }>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Retrieve All Items
                </Text>
            </View>
        </TouchableOpacity>
       
        <TouchableOpacity onPress={ deleteAllItems}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Delete All Items
                </Text>
            </View>
        </TouchableOpacity>

        <Text>Retrieve Item by ID</Text>
        <TextInput
          style={{borderWidth: 2}}
          value = {id}
          onChangeText={setID} />

        <TouchableOpacity onPress={ retrieveItem}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Retrieve Item
                </Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={ deleteItem}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Delete Item
                </Text>
            </View>
        </TouchableOpacity>

        <Text style={styles.heading}>Enter new synthesizer</Text>
        <Text>Make</Text>
        <TextInput
          style={{borderWidth: 2}}
          value = {formData.make}
          onChangeText= {data => setFormData(values => ({...values, make:data}))}
        />
        
        <Text>Model</Text>
        <TextInput
          style={{borderWidth: 2}}
          value = {formData.model}
          onChangeText= {data => setFormData(values => ({...values, model:data}))}
        />

        <Text>Price</Text>
        <TextInput
          style={{borderWidth: 2}}
          value = {formData.price}
          onChangeText= {data => setFormData(values => ({...values, price:data}))}
        />

        <Text>Keyboard</Text>
        <TextInput
          style={{borderWidth: 2}}
          value = {formData.keyboard}
          onChangeText= {data => setFormData(values => ({...values, keyboard:data}))}
        />

        <Text>Type</Text>
        <TextInput
          style={{borderWidth: 2}}
          value = {formData.type}
          onChangeText= {data => setFormData(values => ({...values, type:data}))}
        />

        <Text>Voice</Text>
        <TextInput
          style={{borderWidth: 2}}
          value = {formData.voice}
          onChangeText= {data => setFormData(values => ({...values, voice:data}))}
        />

        <TouchableOpacity onPress={ enterItem}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Enter Item
                </Text>
            </View>
        </TouchableOpacity>
       
      </View>
    );
  
}
