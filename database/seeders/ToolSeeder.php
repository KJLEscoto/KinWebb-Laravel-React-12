<?php

namespace Database\Seeders;

use App\Models\Tool;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ToolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tools = [
            [
                'name' => 'Figma',
                'logo' => 'https://cdn.sanity.io/images/599r6htc/regionalized/5094051dac77593d0f0978bdcbabaf79e5bb855c-1080x1080.png?w=540&h=540&q=75&fit=max&auto=format',
            ],
            [
                'name' => 'Adobe Photoshop',
                'logo' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPyo7vJVx9CbXBSx2u_Cy_NOiLEY_NwEwyLA&s',
            ],
            [
                'name' => 'Adobe XD',
                'logo' => 'https://png.pngtree.com/templates/sm/20180519/sm_5b0022bcebeaa.png',
            ],
            [
                'name' => 'Adobe After Effects',
                'logo' => 'https://static.vecteezy.com/system/resources/previews/056/850/863/non_2x/adobe-after-effects-logo-with-transparent-background-free-png.png',
            ],
        ];

        foreach ($tools as $tool) {
            Tool::create($tool);
        }
    }
}