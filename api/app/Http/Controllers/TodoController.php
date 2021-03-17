<?php

namespace App\Http\Controllers;

use App\Http\Requests\TodoRequest;
use App\Http\Requests\UploadVideoRequest;
use App\Service\Exceptions\RecordNotFoundException;
use App\Service\TodoService;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    private $todoService;
    public function __construct(TodoService $todoService) {
        $this->todoService = $todoService;
    }

    public function add(TodoRequest $request){
        $id = $this->todoService->addTodo($request->title, $request->recipient);
        return response()->json(compact('id'));
    }

    public function getAll(){
        $data = $this->todoService->getAll();
        return response()->json(compact('data'));
    }

    public function get(Request $request){
        try {
            $data = $this->todoService->getTodo($request->route('id'));
            return response()->json(compact('data'));
        }catch (RecordNotFoundException $e) {
            return response()->json(['message' => 'not found', 'status' => 404], 200); //hack for the ui
        }catch (\Exception $e) {
            return abort(500);
        }

    }

    public function delete(Request $request){
        $success = (boolean)$this->todoService->deleteTodo($request->route('id'));
        return response()->json(compact('success'));
    }

    public function uploadVideo(UploadVideoRequest $request){
        $data = $this->todoService->uploadVideo($request);
        return response()->json(compact('data'));
    }

    public function update(Request $request){
        $data = $this->todoService->updateTodo($request);
        return response()->json(compact('data'));
    }
}
