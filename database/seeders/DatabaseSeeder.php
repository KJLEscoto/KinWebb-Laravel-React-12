<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Kent Joemar Escoto',
            'email' => 'kin.webb.1024@gmail.com',
            'password' => Hash::make('123'),
            'job_status' => 'On Duty',
            'job_message' => 'Currently working on something.',
        ]);

        DB::table('about_me')->insert([
            'resume_link' => 'https://drive.google.com/file/d/1Kxu04RPwJtZs4KQujC2Y_36wKl5eaR6E/view',
            'resume_status' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->call([
            // ToolSeeder::class,
            // FrameworkSeeder::class,
            // Add other seeders here
        ]);
    }
}