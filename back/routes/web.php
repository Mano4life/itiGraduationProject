<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RecipeController;

Route::get('/', function () {
    return view('index');
});
// Route::get('/recipes', [RecipeController::class, 'index']);

// Route::resource('recipes', RecipeController::class);

