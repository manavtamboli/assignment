
export default function Todo({todoItem, onFinish}){
    function updateFinished(){
        onFinish(todoItem);
    }
    return (
        <>
            <h1>{todoItem.title}</h1>
            <h2>{todoItem.desc}</h2>
            <input type="checkbox" disabled={true} checked={todoItem.finished}/>
            <button onClick={updateFinished}>Finished</button>
        </>
    );
}