<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User_Saved_Post;
use App\Http\Resources\User_Saved_PostResource;
use App\Models\Recipe;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class Recipe_User_SavedController extends Controller
{
    public function store(User $user,Recipe $recipe)
    {
        $user->savedPosts()->attach($recipe->id);
        return response()->json(['message' => 'Post saved successfully.'], 201);
    }
    public function destroy(User $user,Recipe $recipe)
    {
        $user->savedPosts()->detach($recipe->id);
        return response()->json(['message' => 'Post unsaved successfully.']);
    }
    

}
