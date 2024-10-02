<?php

use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\PendingRecipeController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\stripController;
use App\Http\Controllers\SubcategoryController;
use App\Http\Controllers\TwoFactorController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/user', [UserController::class, 'user']);
    Route::post('/recipes/{recipe}/save', [RecipeController::class, 'saveRecipe']);
    Route::post('/recipes/{recipe}/unsave', [RecipeController::class, 'unsaveRecipe']);
    Route::post('/recipes/{recipe}/rate', [RecipeController::class, 'rateRecipe']);
    Route::patch('/updateUser', [UserController::class, 'update']);
    Route::post('/recipes/{recipe}/comment', [CommentController::class, 'store']);
    Route::put('/comments/{comment}', [CommentController::class, 'update']);
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy']);
});

//otp handler and user api
route::post('/verify-otp', [TwoFactorController::class, 'verifyOtp']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);
Route::get('users', [UserController::class, 'index']);
Route::delete('/users/delete/{user}', [UserController::class, 'destroy']);
Route::patch('/adminEditUser/{user}',[UserController::class,'updateUser']);


// Recipe API resource route
Route::apiResource('recipes', RecipeController::class);
Route::post('/recipes/store-multiple', [RecipeController::class, 'storeMultiple']);

// Category API resource route
Route::apiResource('categories', CategoryController::class);

// Route::apiResource('categories.subcategories', SubcategoryController::class);
Route::apiResource('subcategories', SubcategoryController::class);

// Ingredient API resource route
Route::apiResource('ingredients', IngredientController::class);

Route::apiResource('pendingRecipes', PendingRecipeController::class);
Route::patch('/pendingRecipes/{pendingRecipe}/deny', [PendingRecipeController::class, 'deny']);

Route::apiResource('comments', CommentController::class);


//payment api routes
route::post('/payment/checkout', [stripController::class, 'checkout']);
Route::get('/payment/success', [stripController::class, 'success']);
Route::get('/payment/cancel', [stripController::class, 'cancel']);
