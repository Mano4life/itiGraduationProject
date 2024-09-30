<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\stripController;

Route::get('/', [stripController::class, 'index'])->name('index');
Route::post('/checkout', [stripController::class, 'checkout'])->name('checkout');
Route::get('/success', [stripController::class, 'success'])->name('success');

