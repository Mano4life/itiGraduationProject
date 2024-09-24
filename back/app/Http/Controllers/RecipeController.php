<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
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
            'category_id' => ['required', 'exists:categories,id'],
            'subcategory_id' => ['required', 'exists:subcategories,id'],
            'ingredients' => ['required', 'array'],
            'ingredients.*.ingredient_id' => ['required', 'exists:ingredients,id'],
            'ingredients.*.quantity' => ['required', 'numeric'],
            'ingredients.*.measurement_unit' => ['required', 'string'],
        ]);

        $recipeData = Arr::except($data, ['ingredients']);

        $recipe = Recipe::create($recipeData);

        if (isset($data['ingredients'])) {
            foreach ($data['ingredients'] as $ingredient) {
                $recipe->ingredients()->attach($ingredient['ingredient_id'], [
                    'quantity' => $ingredient['quantity'],
                    'measurement_unit' => $ingredient['measurement_unit']
                ]);
            }
        }

        return response()->json($recipe->load('ingredients'), 201);
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