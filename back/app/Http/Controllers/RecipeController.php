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
        $recipes = Recipe::with('category', 'subcategory', 'ingredients', 'user')->latest()->get();
        return response()->json($recipes, 200);
    }

    public function store()
    {
        $data = request()->validate([
            'name' => ['required', 'min:3'],
            'description' => ['required', 'min:3'],
            'directions' => ['required', 'min:3'],
            'image' => ['required', 'active_url'],
            'servings' => ['required'],
            'time' => ['required', 'min:3'],
            'category' => ['required', 'string'],
            'subcategory' => ['required', 'string'],
            'user_id' => ['required'],
            'ingredients' => ['required', 'array'],
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
            'servings' => $data['servings'],
            'time' => $data['time'],
            'category_id' => $category->id,
            'subcategory_id' => $subcategory->id,
            'user_id' => $data['user_id']
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

    public function storeMultiple()
    {
        $data = request()->validate([
            'recipes' => ['required', 'array'],  // Validate that recipes is an array
            'recipes.*.name' => ['required', 'min:3'],
            'recipes.*.description' => ['required', 'min:3'],
            'recipes.*.directions' => ['required', 'min:3'],
            'recipes.*.image' => ['required', 'active_url'],
            'recipes.*.servings' => ['required'],
            'recipes.*.time' => ['required', 'min:3'],
            'recipes.*.category' => ['required', 'string'],
            'recipes.*.subcategory' => ['required', 'string'],
            'recipes.*.user_id' => ['required'],
            'recipes.*.ingredients' => ['required', 'array'],
            'recipes.*.ingredients.*.name' => ['required', 'string'],
            'recipes.*.ingredients.*.quantity' => ['required', 'numeric'],
            'recipes.*.ingredients.*.measurement_unit' => ['required', 'string'],
        ]);
    
        $createdRecipes = [];
    
        foreach ($data['recipes'] as $recipeData) {
            // Fetch or create category by name
            $category = Category::firstOrCreate(['name' => $recipeData['category']]);
    
            // Fetch or create subcategory by name
            $subcategory = Subcategory::firstOrCreate([
                'name' => $recipeData['subcategory'],
                'category_id' => $category->id,
            ]);
    
            // Create the recipe with the fetched category and subcategory IDs
            $recipe = Recipe::create([
                'name' => $recipeData['name'],
                'description' => $recipeData['description'],
                'directions' => $recipeData['directions'],
                'image' => $recipeData['image'],
                'servings' => $recipeData['servings'],
                'time' => $recipeData['time'],
                'category_id' => $category->id,
                'subcategory_id' => $subcategory->id,
                'user_id' => $recipeData['user_id']
            ]);
    
            // Attach ingredients with quantity and measurement
            foreach ($recipeData['ingredients'] as $ingredientData) {
                $ingredient = Ingredient::firstOrCreate(['name' => $ingredientData['name']]);
    
                // Attach with additional pivot data (quantity, measurement unit)
                $recipe->ingredients()->attach($ingredient->id, [
                    'quantity' => $ingredientData['quantity'],
                    'measurement_unit' => $ingredientData['measurement_unit']
                ]);
            }
    
            $createdRecipes[] = $recipe->load('ingredients');  // Add the created recipe to the array
        }
    
        return response()->json($createdRecipes, 201);  // Return all created recipes with ingredients
    }
    


    // public function show(Recipe $recipe)
    // {
    //     $recipe->load(['ingredients', 'category', 'subcategory', 'comments', 'user']);
    //     $averageRating = $recipe->users_ratings()->avg('rating');
    //     if (is_null($recipe)) {
    //         return response()->json(['message' => 'recipe not found'], 404);
    //     }

    //     $recipe->average_rating = $averageRating;
    //     return response()->json($recipe, 200);

    // }

    public function show(Recipe $recipe)
{
    $recipe->load(['ingredients', 'category', 'subcategory', 'comments', 'user']);
    $averageRating = $recipe->users_ratings()->avg('rating');

    if (!$recipe) {
        return response()->json(['message' => 'Recipe not found'], 404);
    }
    $recipeData = $recipe->toArray();
    $recipeData['average_rating'] = $averageRating;

    $recipeData['ingredients'] = $recipe->ingredients->map(function($ingredient) {
        return [
            'id' => $ingredient->id,
            'name' => $ingredient->name,
            'quantity' => $ingredient->pivot->quantity,  
            'measurement_unit' => $ingredient->pivot->measurement_unit 
        ];
    });
    return response()->json($recipeData, 200);
}



    public function update(Recipe $recipe)
    {
        //authorize (on hold....)
        $data = request()->validate([
            'name' => ['required', 'min:3'],
            'description' => ['required', 'min:3'],
            'directions' => ['required', 'min:3'],
            'image' => ['required', 'active_url'],
            'category' => ['required', 'string'],
            'subcategory' => ['required', 'string'],
            'user_id' => ['required'],
            'ingredients' => ['required', 'array'],
        ]);

        // Fetch or update category by name
        $category = Category::firstOrCreate(['name' => $data['category']]);

        // Fetch or update subcategory by name
        $subcategory = Subcategory::firstOrCreate(['name' => $data['subcategory'], 'category_id' => $category->id]);

        // update the recipe with the fetched category and subcategory IDs
        $recipe->update([
            'name' => $data['name'],
            'description' => $data['description'],
            'directions' => $data['directions'],
            'image' => $data['image'],
            'category_id' => $category->id,
            'subcategory_id' => $subcategory->id,
            'user_id' => $data['user_id']
        ]);

        // Update ingredients
        $recipe->ingredients()->detach(); // Detach current ingredients

        foreach ($data['ingredients'] as $ingredientData) {
            $ingredient = Ingredient::firstOrCreate(['name' => $ingredientData['name']]);

            // Attach the new ingredients with the additional pivot data (quantity, measurement_unit)
            $recipe->ingredients()->attach($ingredient->id, [
                'quantity' => $ingredientData['quantity'],
                'measurement_unit' => $ingredientData['measurement_unit']
            ]);
        }

        // Return the updated recipe with its average rating
        $averageRating = $recipe->users_ratings()->avg('rating');
        $recipe->average_rating = $averageRating;

        return response()->json($recipe, 200);
    }

    public function destroy(Recipe $recipe)
    {
        $recipe->delete();
        return response()->json(['message' => 'deleted succesfully'], 200);
    }

    
    public function saveRecipe(Request $request, Recipe $recipe)
    {
      $userId = $request->user()->id; 
      $recipe->users_saves()->attach($userId);

      return response()->json(['message' => 'Recipe saved successfully.'], 200);
    }

    public function unsaveRecipe(Request $request, Recipe $recipe)
    {
      $userId = $request->user()->id; 
      $recipe->users_saves()->detach($userId);

      return response()->json(['message' => 'Recipe unsaved successfully.'], 200);
    }


    //rate recipe  (raghad)
    public function rateRecipe(Request $request, Recipe $recipe)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
        ]);
        $userId = $request->user()->id;
        
        $recipe->users_ratings()->sync([
            $userId => ['rating' => $request->rating]
        ]);
    
        return response()->json(['message' => 'Recipe rated successfully.'], 200);
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