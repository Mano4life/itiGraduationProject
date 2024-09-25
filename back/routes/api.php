<?php

use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\Recipe_user_RatingController;
use App\Http\Controllers\Api\Recipe_User_SavedController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SubcategoryController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\pending_recipeController;

Route::apiResource('users',UserController::class);
Route::apiResource('comments',CommentController::class);
//Route::apiResource('recipe_user_rating',Recipe_user_RatingController::class);
Route::apiResource('recipe_user_saved',Recipe_User_SavedController::class);
Route::apiResource('recipes', RecipeController::class);
Route::resource('recipes.ratings', Recipe_user_RatingController::class);
Route::get('/recipes/{recipe}/average-rating', [Recipe_user_RatingController::class, 'getAverageRating']);


// Recipe API resource route
Route::apiResource('recipes', RecipeController::class);

// Category API resource route
Route::apiResource('categories', CategoryController::class);

// Subcategory can be handled as a nested resource within categories says chatgpt but still don't know why so I omitted it for now
// Route::apiResource('categories.subcategories', SubcategoryController::class);
Route::apiResource('subcategories', SubcategoryController::class);

// Tag API resource route
//Route::apiResource('tags', TagController::class);

// Ingredient API resource route
Route::apiResource('ingredients', IngredientController::class);


// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

//raghad edited here
Route::post('/recipes/{recipe}/save', [RecipeController::class, 'saveRecipe']);
Route::post('/recipes/{recipe}/unsave', [RecipeController::class, 'unsaveRecipe']);
Route::post('/recipes/{recipe}/rate', [RecipeController::class, 'rateRecipe']);
Route::post('pendingRecipes', pending_recipeController::class);
