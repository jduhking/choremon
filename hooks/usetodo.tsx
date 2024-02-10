import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

type Todo = {
  name: string;
  id: string;
  childCheck: boolean;
  parentCheck: boolean;
  difficulty: 1 | 2 | 3 | 4 | 5;
};
type TodoPartition = {
  child_checked: Todo[];
  uncompleted: Todo[];
  completed: Todo[];
};
const useTodo = () => {
  const [todo, setTodo] = useState<Todo[]>([
    {
      name: "string",
      id: "string",
      childCheck: false,
      parentCheck: false,
      difficulty: 3,
    },
    {
      name: "string",
      id: "string2",
      childCheck: false,
      parentCheck: false,
      difficulty: 3,
    },
  ]);

  const addTodo = (newTodo: Todo) => {
    setTodo([...todo, newTodo]);
  };

  const storeTodo = async (todo_arr?: Todo[]) => {
    try {
      console.log(`storing`);
      if (todo_arr) {
        console.log(todo_arr);
        await AsyncStorage.setItem("todo", JSON.stringify(todo_arr));
      } else {
        console.log(todo);
        await AsyncStorage.setItem("todo", JSON.stringify(todo));
      }
    } catch (e) {
      // saving error
    }
  };

  const retrieveTodo = async (): Promise<Todo[] | undefined> => {
    try {
      const value = await AsyncStorage.getItem("todo");
      if (value) {
        console.log("retrieving");
        console.log(JSON.parse(value));
        return JSON.parse(value);
      }
      undefined;
    } catch (e) {
      // saving error
      return undefined;
    }
  };

  const deleteTodo = async (id: string) => {
    const todo = await retrieveTodo();
    if (todo) {
      let theOne: number = -1;
      for (let i = 0; i < todo.length; i++) {
        if (todo[i].id == id) {
          theOne = i;
          break;
        }
      }
      if (theOne == -1) {
        return;
      }

      const splice = todo.splice(theOne, 1);

      setTodo([...todo]);
      console.log("deleting");
      console.log(splice);
      console.log("and");

      await storeTodo(todo);
    }
  };

  return { storeTodo, retrieveTodo, deleteTodo , todo};
};
export default useTodo;
