<?php

use App\Http\Controllers\CommentsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return view('welcome');
});
Route::get('Users',[UserController::class,'index']);
Route::post('Users',[UserController::class,'upload']);
Route::get('comments',[CommentsController::class,'index']);
Route::post('comments',[CommentsController::class,'upload']);