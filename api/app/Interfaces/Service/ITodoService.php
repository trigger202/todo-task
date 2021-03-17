<?php

namespace App\Interfaces\Service;

interface ITodoService
{
    public function addTodo($title, $recipient) : string;
}
