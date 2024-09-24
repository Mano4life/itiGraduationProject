<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\Category;
use App\Models\Subcategory;
use App\Models\Ingredient;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class RecipeController extends Controller
{
    public function index()
    {
        $recipes = Recipe::with('category', 'subCategory', 'ingredients')->latest()->get();
        return response()->json($recipes, 200);
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
            'ingredients' => ['required', 'array'] // Array of ingredient names, quantity, and measurement
        ]);

        // Fetch or create category by name
        $category = Category::firstOrCreate(['name' => $data['category']]);

        // Fetch or create subcategory by name
        $subcategory = Subcategory::firstOrCreate(['name' => $data['subcategory'], 'category_id' => $category->id]);

        // Create the recipe with the fetched category and subcategory IDs
        $recipe = Recipe::create([
            'name' => $data['name'],
            'description' => $data['description'],
            'directions' => $data['directions'],
            'image' => $data['image'],
            'category_id' => $category->id,
            'subcategory_id' => $subcategory->id
        ]);

        // Attach ingredients with quantity and measurement
        foreach ($data['ingredients'] as $ingredientData) {
            $ingredient = Ingredient::firstOrCreate(['name' => $ingredientData['name']]);

            // Attach with additional pivot data (quantity, measurement unit)
            $recipe->ingredients()->attach($ingredient->id, [
                'quantity' => $ingredientData['quantity'],
                'measurement_unit' => $ingredientData['measurement_unit']
            ]);
        }

        return response()->json($recipe->load('ingredients'), 201); // Return the recipe with ingredients
    }




    public function show(Recipe $recipe)
    {
        $recipe->load(['ingredients', 'category', 'subcategory']);
        if (is_null($recipe)) {
            return response()->json(['message' => 'recipe not found'], 404);
        }

        return response()->json($recipe, 200);
    }


    public function update(Recipe $recipe)
    {
        //authorize (on hold....)
        $data = request()->validate([
            'name' => ['required', 'min:3'],
            'description' => ['required', 'min:3'],
            'directions' => ['required', 'min:3'],
            'image' => ['required', 'active_url'],
            'category_id' => ['required', 'exists:categories,id'],
            'subcategory_id' => ['required', 'exists:subcategories,id']
        ]);

        $result = $recipe->update($data);

        return response()->json($result);
    }

    public function destroy(Recipe $recipe)
    {
        $recipe->delete();
        return response()->json(['message' => 'deleted succesfully'], 200);
    }
}


    // public function store()
    // {
    //     $data = request()->validate([
    //         'name' => ['required', 'min:3'],
    //         'description' => ['required', 'min:3'],
    //         'directions' => ['required', 'min:3'],
    //         'image' => ['required', 'active_url'],
    //         'category_id' => ['required', 'exists:categories,id'],
    //         'subcategory_id' => ['required', 'exists:subcategories,id']
    //     ]);

    //     $result = Recipe::create($data);

    //     return response()->json($result, 200);
    // }