<?php

use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\UserController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SubcategoryController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\pending_recipeController;

Route::post('/login',[UserController::class,'login']);
Route::post('/register',[UserController::class,'register']);

Route::middleware(['auth:sanctum'])->group(function(){
    Route::post('/logout',[UserController::class,'logout']);
    Route::get('/user',[UserController::class,'user']);
    Route::post('/recipes/{recipe}/save', [RecipeController::class, 'saveRecipe']);
    Route::post('/recipes/{recipe}/unsave', [RecipeController::class, 'unsaveRecipe']);
    Route::post('/recipes/{recipe}/rate', [RecipeController::class, 'rateRecipe']);
    Route::patch('/updateUser',[UserController::class,'update']);
});

Route::apiResource('comments',CommentController::class);


Route::apiResource('recipes', RecipeController::class);



// Recipe API resource route
Route::apiResource('recipes', RecipeController::class);
Route::post('/recipes/store-multiple', [RecipeController::class, 'storeMultiple']);

// Category API resource route
Route::apiResource('categories', CategoryController::class);

// Subcategory can be handled as a nested resource within categories says chatgpt but still don't know why so I omitted it for now
// Route::apiResource('categories.subcategories', SubcategoryController::class);
Route::apiResource('subcategories', SubcategoryController::class);

// Tag API resource route
//Route::apiResource('tags', TagController::class);

// Ingredient API resource route
Route::apiResource('ingredients', IngredientController::class);

Route::apiResource('pendingRecipes', pending_recipeController::class);
