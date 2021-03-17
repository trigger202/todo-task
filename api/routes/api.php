<?php

Route::post('todo', ['as' => 'register', 'uses' => 'TodoController@add']);
Route::get('todo', ['as' => 'register', 'uses' => 'TodoController@getAll']);
Route::get('todo/{id}', ['as' => 'register', 'uses' => 'TodoController@get']);
Route::delete('todo/{id}', ['as' => 'register', 'uses' => 'TodoController@delete']);
Route::post('todo/video/{id}', ['as' => 'register', 'uses' => 'TodoController@uploadVideo']);
Route::put('todo/{id}', ['as' => 'register', 'uses' => 'TodoController@update']);
