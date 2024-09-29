<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Ingredient;
use App\Models\PendingRecipe;
use App\Models\Subcategory;
use Illuminate\Http\Request;

class PendingRecipeController extends Controller
{
    public function index()
    {
        $pendingRecipes = PendingRecipe::with('category', 'subcategory', 'ingredients', 'user')->latest()->get();
        return response()->json($pendingRecipes, 200);
    }

    public function store()
    {
        $data = request()->validate([
            'name' => ['required', 'min:3'],
            'description' => ['required', 'min:3'],
            'directions' => ['required', 'min:3'],
            'image' => ['required', 'active_url'],
            'category' => ['required', 'string'],
            'subcategory' => ['required', 'string'],
            'user_id' => ['required'],
            'status' => ['string'],
            'ingredients' => ['required', 'array'],


        ]);

        // Fetch or create category by name
        $category = Category::firstOrCreate(['name' => $data['category']]);

        // Fetch or create subcategory by name
        $subcategory = Subcategory::firstOrCreate(['name' => $data['subcategory'], 'category_id' => $category->id]);

        // Create thePendingRecipe with the fetched category and subcategory IDs
        $pendingRecipe = PendingRecipe::create([
            'name' => $data['name'],
            'description' => $data['description'],
            'directions' => $data['directions'],
            'image' => $data['image'],
            'category_id' => $category->id,
            'user_id' => $data['user_id'],
            'status' => $data['status'],
            'subcategory_id' => $subcategory->id

        ]);

        // Attach ingredients with quantity and measurement
        foreach ($data['ingredients'] as $ingredientData) {
            $ingredient = Ingredient::firstOrCreate(['name' => $ingredientData['name']]);

            // Attach with additional pivot data (quantity, measurement unit)
            $pendingRecipe->ingredients()->attach($ingredient->id, [
                'quantity' => $ingredientData['quantity'],
                'measurement_unit' => $ingredientData['measurement_unit']
            ]);
        }

        return response()->json($pendingRecipe->load('ingredients'), 201); // Return thePendingRecipe with ingredients
    }




    public function show(PendingRecipe $pendingRecipe)
    {
        $pendingRecipe->load(['ingredients', 'category', 'subcategory', 'user']);
        if (is_null($pendingRecipe)) {
            return response()->json(['message' => 'recipe not found'], 404);
        }

        return response()->json($pendingRecipe, 200);
    }

    public function update(PendingRecipe $pendingRecipe)
    {

        $data = request()->validate([
            'name' => ['required', 'min:3'],
            'description' => ['required', 'min:3'],
            'directions' => ['required', 'min:3'],
            'image' => ['required', 'active_url'],
            'category' => ['required', 'string'],
            'subcategory' => ['required', 'string'],
            'user_id' => ['required'],
            'status' => ['required'],
            'ingredients' => ['required', 'array'],
        ]);

        // Fetch or update category by name
        $category = Category::firstOrCreate(['name' => $data['category']]);
        // dd($category);

        // Fetch or update subcategory by name
        $subcategory = Subcategory::firstOrCreate(['name' => $data['subcategory'], 'category_id' => $category->id]);

        // update the recipe with the fetched category and subcategory IDs
        $pendingRecipe->update([
            'name' => $data['name'],
            'description' => $data['description'],
            'directions' => $data['directions'],
            'image' => $data['image'],
            'status' => $data['status'],
            'category_id' => $category->id,
            'subcategory_id' => $subcategory->id,
            'user_id' => $data['user_id']
        ]);

        // Update ingredients
        $pendingRecipe->ingredients()->detach(); // Detach current ingredients

        foreach ($data['ingredients'] as $ingredientData) {
            $ingredient = Ingredient::firstOrCreate(['name' => $ingredientData['name']]);

            // Attach the new ingredients with the additional pivot data (quantity, measurement_unit)
            $pendingRecipe->ingredients()->attach($ingredient->id, [
                'quantity' => $ingredientData['quantity'],
                'measurement_unit' => $ingredientData['measurement_unit']
            ]);
        }
        return response()->json($pendingRecipe, 200);
        // Return the updated recipe with its average rating
        // $averageRating = $pendingRecipe->users_ratings()->avg('rating');
        // $pendingRecipe->average_rating = $averageRating;

    }

    public function destroy(PendingRecipe $pendingRecipe)
    {
        $deleted = $pendingRecipe->delete();
        if ($deleted) {
            return response()->json(['message' => 'Deleted successfully'], 200);
        } else {
            return response()->json(['message' => 'Failed to delete'], 500);
        }
    }

    public function deny(PendingRecipe $pendingRecipe){
        $data = request()->validate([
            'status' => ['required']
        ]);

        $result = $pendingRecipe->update($data);
        if($result){
            // return response()->json($result, 200);
            return response()->json(['message' => 'successfully denied', $data], 200);
        }else {
            return response()->json(['message'=> 'failed to deny'], 500);
        }
    }
}
