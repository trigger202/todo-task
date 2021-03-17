import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import Card from '../components/Card';
import Textfield from '../components/Textfield';
import Button from '../components/Button';
import { getAllTodos, addTodo, deleteTodo } from '../api/api';
import { TodoItem, TodoStatus, TodoDetails } from '../types/Todo';

const Container = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TodoItemContainer = styled.div`
  cursor: pointer;
  margin: 5px;
  width: 100%;
  padding: 5px;
  &:hover {
    background-color: #d1d8e0;
  }
`;

const TodoListItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DeleteButton = styled(Button)`
  margin: 15px 0;
  align-items: flex-end;
  align-content: flex-end;
`;

const Status = styled.div<Pick<TodoDetails, 'status'>>`
  color: ${props => props.status === TodoStatus.completed ? '#2ed573' : '#ff4757'};
`;

const AddButtonContainer = styled.div``;

export default function TodoList() {
  const { data, status } = useQuery("getAll", () => getAllTodos());
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newRecipient, setNewRecipient] = useState('');
  const history = useHistory();

  useEffect(() => {
    if(status !== "loading" && data) setTodoList(data.data);
  }, [status, data]);

  if (status === "loading" || !data) {
    return <>"Loading..."</>;
  }

  function onTitleChange(title:string) {
    setNewTitle(title)
  }

  function onRecipientChange(recipient:string) {
    setNewRecipient(recipient);
  }

  function resetFields() {
    setNewTitle('');
    setNewRecipient('');
  }

  async function onAddNewTodo() {
    if(!newTitle || !newRecipient) return;
    const { id } = await addTodo({
      recipient: newRecipient,
      title: newTitle,
    });
    
    const newTodo: TodoItem = {
      id, 
      recipient: newRecipient,
      status: TodoStatus.not_completed
    };

    resetFields();
    setTodoList([ newTodo, ...todoList]);
  }

  function onDeleteTodo(id:string) {
    return async function() {
      const { success } = await deleteTodo(id);
      if(success) {
        const newTodoList = todoList.filter(function (v) {
          return v.id !== id;
        });

        setTodoList(newTodoList);
      }
    }
  }

  return (
    <Container>
      <Card title="Add Todo List"> 
        <Textfield value={newTitle} placeholder="Title" onChange={onTitleChange}/>
        <Textfield value={newRecipient} placeholder="Name of Recepient" onChange={onRecipientChange}/>
        <AddButtonContainer>
          <Button label="Add" onClick={onAddNewTodo}/>
        </AddButtonContainer>
      </Card>
      <Card title="Todo List"> 
        {
          todoList.map((todo, key) => {
            return (
              <TodoListItemContainer>
                <TodoItemContainer key={`${todo.recipient}-${key}`} onClick={() => history.push(`/${todo.id}`)}>
                  <div>
                    To: {todo.recipient}
                  </div>
                  <Status status={todo.status as TodoStatus}>{todo.status}</Status>
                </TodoItemContainer>
                <DeleteButton label="Delete" onClick={onDeleteTodo(todo.id)}/>
              </TodoListItemContainer>
            )
          })
        }
      </Card>
    </Container>
  );
}
