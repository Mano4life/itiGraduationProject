<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Ingredient;
use App\Models\Recipe;
use App\Models\Subcategory;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Recipe>
 */
class RecipeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // 'name' => fake()->sentence(3),
            // 'description' => fake()->paragraph(),
            // 'directions' => fake()->paragraph(30),
            // 'image' => fake()->imageUrl(),
            // 'category_id' => Category::factory(),
            // 'subcategory_id' => Subcategory::factory()
        ];
    }

    // public function configure()
    // {
    //     return $this->afterCreating(function (Recipe $recipe) {
    //         $ingredients = Ingredient::factory()->count(3)->create();
    //         $recipe->ingredients()->attach($ingredients, [
    //             'quantity' => fake()->randomFloat(2, 1, 10), 
    //             'measurement_unit' => 'g'
    //         ]);

    //         $tags = Tag::factory()->count(2)->create();
    //         $recipe->tags()->attach($tags);
    //     });
    // }
}
