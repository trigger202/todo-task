<?php

namespace App\Interfaces\Repository;

use App\Mapper\TodoMap;

interface ITodoRepository
{
    public function addTodo(TodoMap $todo): string;
}
