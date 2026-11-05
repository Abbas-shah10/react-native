import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  placeholder: string;
};

export const SearchInput = ({ placeholder }: Props) => {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: title,
    },
  ]);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTodos((prev) => [
      ...prev,
      { id: Math.floor(Math.random() + 2), title: title },
    ]);

    setTitle("");
  };

  const deleteTodo = (id: number) => {
    todos.filter((todo) => todo.id !== id);

    console.log("Removed successfully");
  };

  console.log(todos);

  return (
    <View style={styles.container}>
      <form onSubmit={handleSubmit}>
        <TextInput
          autoCorrect={false}
          placeholder={placeholder}
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
          style={styles.textInput}
          clearButtonMode="always"
          value={title}
          onChangeText={setTitle}
        />
        <button type="submit">CLick</button>
      </form>

      {todos.map((todo) => (
        <View style={{ marginBottom: "10px" }}>
          <Text key={todo.id}>{todo.title}</Text>
          <button
            onClick={() => {
              deleteTodo(todo.id);
            }}
          >
            Delete
          </button>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: "#666",
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    color: "white",
  },
});
