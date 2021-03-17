<?php

namespace App\Repository;

use App\Mapper\TodoMap;
use App\Models\Todo;
use App\Interfaces\Repository\ITodoRepository;
use Illuminate\Support\Collection;

class TodoRepository implements ITodoRepository {

    public function addTodo(TodoMap $todo): string {
        $newTodo = new Todo;

        $newTodo->title = $todo->getTitle();
        $newTodo->recipient = $todo->getRecipient();
        $newTodo->video_watched = (int)$todo->getVideoWatched();
        $newTodo->video_name = $todo->getVideoName();
        $newTodo->status = $todo->getStatus();

        $newTodo->save();
        return $newTodo->id;
    }

    public function getAll(): Collection {
        return Todo::orderBy('created_at', 'desc')->get();
    }

    public function getTodo($id) {
        return Todo::where('id', $id)->first();
    }

    public function deleteTodo($id) {
        return Todo::where('id', $id)->delete();
    }

    public function updateTodo($id, $fields) {
        return Todo::where('id', $id)->update($fields);
    }
}
