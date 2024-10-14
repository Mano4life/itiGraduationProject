<?php

namespace Database\Seeders;

use App\Models\Ingredient;
use App\Models\Recipe;
use App\Models\Tag;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin user
        User::create([
            'name' => 'admin',
            'email' => 'admin@mail.com',
            'password' => bcrypt('Admin@123'), // Password encryption
            'role' => 'admin',
            'gender' => 'male',
            'date_of_birth' => '1998-01-01',
        ]);

        // premium user
        User::create([
            'name' => 'vip',
            'email' => 'vip@mail.com',
            'password' => bcrypt('Vip@123'),
            'role' => 'premium',
            'gender' => 'male',
            'date_of_birth' => '1999-01-01',
        ]);

        // regular user
        User::create([
            'name' => 'user',
            'email' => 'user@mail.com',
            'password' => bcrypt('User@123'),
            'role' => 'user',
            'gender' => 'female',
            'date_of_birth' => '1999-01-01',
        ]);

        // Optionally, generate additional random users using the factory
        // User::factory(10)->create();
    }
}
