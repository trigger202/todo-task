import axios from 'axios';
import config from '../config/config';
import {
  TodoListResponse,
  AddTodoRequest,
  DeleteTodoResponse,
  SingleTodoResponse,
  UpdateTodoRequest,
} from '../types/Todo';

export function getAllTodos() {
  const req = axios.get<TodoListResponse>(`${config.api}api/todo`);

  return req.then((res) => res.data);
}

export function addTodo(body: AddTodoRequest) {
  const req = axios.post(`${config.api}api/todo`, body);
  return req.then((res) => res.data);
}

export function updateTodo(id: string, body: UpdateTodoRequest) {
  const req = axios.put(`${config.api}api/todo/${id}`, body);
  return req.then((res) => res.data);
}

export function getTodo(id: string | null) {
  if (!id) return;
  const req = axios.get<SingleTodoResponse>(`${config.api}api/todo/${id}`);

  return req.then((res) => res.data);
}

export function deleteTodo(id: string) {
  const req = axios.delete<DeleteTodoResponse>(`${config.api}api/todo/${id}`);

  return req.then((res) => res.data);
}

export function uploadVideo(id: string, video: Blob) {
  if (!id) return;
  const formData = new FormData();
  formData.append('video', video);

  const req = axios.post(`${config.api}api/todo/video/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return req.then((res) => res.data);
}
