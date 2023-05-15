import './App.css';
import Todo from "./Todo";
import {TodoList} from "./TodoList";
import {useState} from "react";
import {TodoItem} from "./TodoItem";

function App() {
    const [isFirst, setFirst] = useState(true);
    const [todoItems, updateTodoItems] = useState([]);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    function fetchTodoItems(){
        return fetch("http://localhost:8080/items")
            .then(res => res.json())
            .then((data) => {
                updateTodoItems(data.items.map((i) => {
                    return new TodoItem(i._id, i.title, i.desc, i.finished);
                }));
            });
    }
    function setFinished(todoItem){
        fetch("http://localhost:8080/item", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: todoItem.id,
                title: todoItem.title,
                desc: todoItem.desc,
                finished: true
            })
        }).then(fetchTodoItems);
    }
    function add(){
        fetch("http://localhost:8080/item", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                desc: desc,
                finished: false
            })
        }).then(fetchTodoItems);
    }

    if (isFirst){
        fetchTodoItems();
        setFirst(false);
    }

    function updateTitle(e){
        setTitle(e.target.value);
    }
    function updateDesc(e){
        setDesc(e.target.value);
    }
    return (
    <div className="App">
        <input type="text" onChange={updateTitle}/>
        <input type="text" onChange={updateDesc}/>
        <button onClick={add}>Add</button>
        <TodoList todoItems={todoItems} setFinished={setFinished}/>
    </div>
  );
}

export default App;
