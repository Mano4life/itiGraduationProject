<?php

use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\Post_RatingController;
use App\Http\Controllers\Api\User_Saved_PostController;
use App\Http\Controllers\Api\VisitorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('visitors',VisitorController::class);
Route::apiResource('comments',CommentController::class);
Route::apiResource('post_rating',Post_RatingController::class);
Route::apiResource('user_saved_posts',User_Saved_PostController::class);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
