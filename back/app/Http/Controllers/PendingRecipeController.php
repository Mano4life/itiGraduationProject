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
        $pendingRecipes = PendingRecipe::with('category', 'subCategory', 'ingredients', 'user')->latest()->get();
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
        $pendingRecipe->load(['ingredients', 'category', 'subcategory']);
        if (is_null($pendingRecipe)) {
            return response()->json(['message' => 'recipe not found'], 404);
        }

        return response()->json($pendingRecipe, 200);
    }

    public function update(PendingRecipe $pendingRecipe)
    {
        //authorize (on hold....)
        $data = request()->validate([
            'name' => ['required', 'min:3'],
            'description' => ['required', 'min:3'],
            'directions' => ['required', 'min:3'],
            'image' => ['required', 'active_url'],
            'category_id' => ['required', 'exists:categories,id'],
            'user_id' => ['required', 'exists:Users,id'],
            'status' => ['in:pending,approved,declined'],
            'subcategory_id' => ['required', 'exists:subcategories,id']
        ]);

        $result = $pendingRecipe->update($data);

        return response()->json($result);
    }

    public function destroy(PendingRecipe $pendingRecipe)
    {
        $deleted = $pendingRecipe->delete();
        // return response()->json(['message' => 'deleted succesfully'], 200);
        if ($deleted) {
            return response()->json(['message' => 'Deleted successfully'], 200);
        } else {
            return response()->json(['message' => 'Failed to delete'], 500);
        }
    }
}
