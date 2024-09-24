<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post_Rating;
use App\Http\Resources\Post_RatingResource;
use App\Models\Recipe;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class Recipe_user_RatingController extends Controller
{
     public function store(User $user, Recipe $recipe, Request $request)
    {
        $request->validate(['rating' => 'required|integer|min:1|max:5']);
        
        $user->recipes_ratings()->attach($recipe->id, ['rating' => $request->rating]);
        return response()->json(['message' => 'Post rated successfully.'], 201);
    }

    public function update(User $user, Recipe $recipe, Request $request)
    {
        $request->validate(['rating' => 'required|integer|min:1|max:5']);
        
        $user->recipes_ratings()->updateExistingPivot($recipe->id, ['rating' => $request->rating]);
        return response()->json(['message' => 'recipe rating updated successfully.']);
    }
    
    public function destroy(User $user, Recipe $recipe)
    {
        $user->recipes_ratings()->detach($recipe->id);
        return response()->json(['message' => 'Post rating removed successfully.']);
    }

    public function getAverageRating(Recipe $recipe)
    {
        return response()->json(['average_rating' => $recipe->averageRating()]);
    }

   /*  public function showRatings(Recipe $recipe)
    {
        return RatingResource::collection($recipe->users_ratings);
    } */
    /* public function getAverageRating(Recipe $recipe)
    {
        $averageRating = $recipe->averageRating();
        
        return response()->json(['average_rating' => $averageRating]);
    } */
    
}