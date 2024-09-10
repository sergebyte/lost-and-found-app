import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import axios from "axios";

export default function Index() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Attempting to fetch data from server...");
        const response = await axios.get("http://127.0.0.1:3000/");
        console.log("Data fetched successfully:", response.data);
        setMessage(response.data);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{message || "Loading..."}</Text>
    </View>
  );
}