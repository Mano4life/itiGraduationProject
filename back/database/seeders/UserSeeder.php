<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
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
    }
}
