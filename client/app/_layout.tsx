import {Button, TextInput, Text, View, ScrollView, FlatList} from "react-native";
import {useState} from "react";

import axios from "axios";

export default function RootLayout() {
    const [formData, setFormData] = useState({make:"n/a", model:"n/a", price:"n/a", keyboard:"n/a",type:"n/a", voice:"n/a"});
    
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
                                        {make: "Korg", 
                                         model: "MicroKorg",
                                         price: 600,
                                         keyboard: 1,
                                         type: "Digital",
                                         voice: "Polyphonic"});
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
    return (
      <ScrollView>
        <FlatList data={items}
                  renderItem={({item}) => <Text>{item.make} {item.model}</Text>}
                  keyExtractor={(item) => item.id }
        />
        <Button onPress={ retrieveAllItems }
                title="Retrieve All Items" />
       
        <Button onPress={ deleteAllItems}
                title="Delete All Items" />
        <Text>Retrieve Item by ID</Text>
        <TextInput
          style={{borderWidth: 2}}
          value = {id}
          onChangeText={setID} />

        <Button onPress={ retrieveItem }
                title="Retrieve item"/>
        <Button onPress={ deleteItem }
                title="Delete item"/>

        <Text>Enter new synthesizer</Text>
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
        <Button //onPress={ enterItem }
                title="Enter item"/>
        <Text>{formData.make}</Text>
        <Text>{formData.model}</Text>
        
        
      </ScrollView>
    );
  
}
