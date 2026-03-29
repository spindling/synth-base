import {Button, TextInput, Text, View, ScrollView, FlatList} from "react-native";
import {useState} from "react";

import axios from "axios";

export default function RootLayout() {
    const [value, setValue] = useState("abc");

    const [result, setResult] = useState("");
    const [items, setItems] = useState([]);
  
    async function retrieveAllItems()
    {
      const response = await axios.get("http://localhost:3000/api");
  
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
       

      </ScrollView>
    );
  
}
