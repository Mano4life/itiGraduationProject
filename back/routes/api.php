<?php

use Illuminate\Http\Request;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SubcategoryController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\IngredientController;

// Recipe API resource route
Route::apiResource('recipes', RecipeController::class);

// Category API resource route
Route::apiResource('categories', CategoryController::class);

// Subcategory can be handled as a nested resource within categories says chatgpt but still don't know why so I omitted it for now
// Route::apiResource('categories.subcategories', SubcategoryController::class);
Route::apiResource('subcategories', SubcategoryController::class);

// Tag API resource route
Route::apiResource('tags', TagController::class);

// Ingredient API resource route
Route::apiResource('ingredients', IngredientController::class);
