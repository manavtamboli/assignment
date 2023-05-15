import {useState} from "react";
import {TodoItem} from "./TodoItem";
import Todo from "./Todo";

export function TodoList({todoItems, setFinished}){

    const items = todoItems.map(item => <>
        <Todo todoItem={item} onFinish={setFinished}></Todo>
    </>);
    return <ul>{items}</ul>;
}
