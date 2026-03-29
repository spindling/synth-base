import {Button, TextInput, Text, View, ScrollView, FlatList} from "react-native";
import {useState} from "react";

import axios from "axios";

export default function RootLayout() {
    const [value, setValue] = useState("abc");

    const [result, setResult] = useState("");
    const [items, setItems] = useState([]);
    const [id, setID] = useState("");
  
    async function retrieveAllItems()
    {
      const response = await axios.get("http://localhost:3000/api");
  
      setItems(response.data); 
    }

    async function deleteAllItems()
    {
      const response = await axios.delete("http://localhost:3000/api");
    }

    async function retrieveItem()
    {
      const response = await axios.get("http://localhost:3000/api/" + id);
  
      setItems(response.data); 
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
        <Text>{id}</Text>
        
        
      </ScrollView>
    );
  
}
