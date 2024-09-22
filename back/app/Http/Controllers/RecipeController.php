<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    public function index()
    {

        // $recipes = Recipe::latest()->paginate(8);
        $recipes = Recipe::with('category', 'subCategory', 'ingredients')->get();

        return response()->json($recipes, 200);
        // dd($recipes);

        // $recipes = Recipe::with('category', 'subCategory')->get();
        // $recipes = Recipe::latest()->simplePaginate(3);
        // return view('recipes.index', [
        //     'recipes' => $recipes
        // ]);
    }

    public function store()
    {
        $data = request()->validate([
            'name' => ['required', 'min:3'],
            'description' => ['required', 'min:3'],
            'directions' => ['required', 'min:3'],
            'image' => ['required', 'active_url'],
            'category_id' => ['required', 'exists:categories,id'],
            'subcategory_id' => ['required', 'exists:subcategories,id']
        ]);

        $result = Recipe::create($data);

        return response()->json($result, 200);
    }
    // public function store()
    // {
    //     $data = request()->validate([
    //         'name' => ['required', 'min:3'],
    //         'description' => ['required', 'min:3'],
    //         'directions' => ['required', 'min:3'],
    //         'image' => ['required', 'active_url'],
    //         'category_id' => ['required', 'exists:categories,id'],
    //         'subcategory_id' => ['required', 'exists:subcategories,id'],
    //         'ingredients.*.ingredient_id' => 'required|exists:ingredients,id',
    //         'ingredients.*.quantity' => 'required|numeric|min:0',
    //         'ingredients.*.measurement_unit' => 'required|string', 
    //     ]);
    
    //     $recipe = Recipe::create($data); 
    
        
    //     if (request()->has('ingredients')) {
    //         foreach ($data['ingredients'] as $ingredient) {
    //             $recipe->ingredients()->attach($ingredient['ingredient_id'], [
    //                 'quantity' => $ingredient['quantity'],
    //                 'measurement_unit' => $ingredient['measurement_unit']
    //             ]);
    //         }
    //     }
    
    //     return response()->json($recipe, 201); 
    // }
    

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
