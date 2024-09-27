<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Ingredient;
use App\Models\pending_recipe;
use App\Models\Subcategory;
use Illuminate\Http\Request;

class pending_recipeController extends Controller
{
    public function index()
    {
        $pending_recipes =pending_recipe::with('category', 'subCategory', 'ingredients')->latest()->get();
        return response()->json($pending_recipes, 200);
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
            'user_id' => ['required', 'string'],
            'status'=>['string'],
            'ingredients' => ['required', 'array'] ,

            
        ]);

        // Fetch or create category by name
        $category = Category::firstOrCreate(['name' => $data['category']]);

        // Fetch or create subcategory by name
        $subcategory = Subcategory::firstOrCreate(['name' => $data['subcategory'], 'category_id' => $category->id]);

        // Create thepending_recipe with the fetched category and subcategory IDs
        $pending_recipe =pending_recipe::create([
            'name' => $data['name'],
            'description' => $data['description'],
            'directions' => $data['directions'],
            'image' => $data['image'],
            'category_id' => $category->id,
            'user_id'=>$data['user_id'],
            'status'=>$data['status'],
            'subcategory_id' => $subcategory->id

        ]);

        // Attach ingredients with quantity and measurement
        foreach ($data['ingredients'] as $ingredientData) {
            $ingredient = Ingredient::firstOrCreate(['name' => $ingredientData['name']]);

            // Attach with additional pivot data (quantity, measurement unit)
            $pending_recipe->ingredients()->attach($ingredient->id, [
                'quantity' => $ingredientData['quantity'],
                'measurement_unit' => $ingredientData['measurement_unit']
            ]);
        }

        return response()->json($pending_recipe->load('ingredients'), 201); // Return thepending_recipe with ingredients
    }




    public function show(pending_recipe $pending_recipe)
    {
        $pending_recipe->load(['ingredients', 'category', 'subcategory']);
        if (is_null($pending_recipe)) {
            return response()->json(['message' => 'recipe not found'], 404);
        }

        return response()->json($pending_recipe, 200);
    }
   
    public function update(pending_recipe $pending_recipe)
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

        $result = $pending_recipe->update($data);

        return response()->json($result);
    }

    public function destroy(pending_recipe $penpending_recipe)
    {
        $penpending_recipe->delete();
        return response()->json(['message' => 'deleted succesfully'], 200);
    }
}
