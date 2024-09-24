<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class RecipeController extends Controller
{
    public function index()
    {

        // $recipes = Recipe::latest()->paginate(8);
        $recipes = Recipe::with('category', 'subCategory', 'ingredients')->latest()->get();

        return response()->json($recipes, 200);
        // dd($recipes);

        // $recipes = Recipe::with('category', 'subCategory')->get();
        // $recipes = Recipe::latest()->simplePaginate(3);
        // return view('recipes.index', [
        //     'recipes' => $recipes
        // ]);
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

    public function store()
    {
        // Separate the recipe data from the ingredients
        $data = request()->validate([
            'name' => ['required', 'min:3'],
            'description' => ['required', 'min:3'],
            'directions' => ['required', 'min:3'],
            'image' => ['required', 'active_url'],
            'category_id' => ['required', 'exists:categories,id'],
            'subcategory_id' => ['required', 'exists:subcategories,id'],
            'ingredients' => ['required', 'array'], // Ingredients array is required
            'ingredients.*.ingredient_id' => ['required', 'exists:ingredients,id'], // Validate each ingredient ID
            'ingredients.*.quantity' => ['required', 'numeric'], // Quantity for each ingredient
            'ingredients.*.measurement_unit' => ['required', 'string'], // Measurement unit for each ingredient
        ]);

        // Extract the recipe data excluding ingredients
        $recipeData = Arr::except($data, ['ingredients']);

        // Create the recipe with the recipe data
        $recipe = Recipe::create($recipeData);

        // Attach ingredients with pivot data (quantity and measurement_unit)
        if (isset($data['ingredients'])) {
            foreach ($data['ingredients'] as $ingredient) {
                $recipe->ingredients()->attach($ingredient['ingredient_id'], [
                    'quantity' => $ingredient['quantity'],
                    'measurement_unit' => $ingredient['measurement_unit']
                ]);
            }
        }

        // Return the created recipe along with the attached ingredients
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
