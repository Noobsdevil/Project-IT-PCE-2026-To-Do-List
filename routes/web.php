<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;

Route::get('/', [TodoController::class, 'index']);
Route::post('/todos', [TodoController::class, 'store']);
Route::delete('/todos/{id}', [TodoController::class, 'destroy']);
Route::get('/todos', [TodoController::class, 'showAll']);
Route::delete('/todos', [TodoController::class, 'destroyAll']);