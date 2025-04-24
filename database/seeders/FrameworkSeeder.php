<?php

namespace Database\Seeders;

use App\Models\Framework;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FrameworkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $frameworks = [
            [
                'name' => 'React.js',
                'logo' => 'https://static-00.iconduck.com/assets.00/react-icon-512x512-u6e60ayf.png',
            ],
            [
                'name' => 'Nuxt.js',
                'logo' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY5VCNaZeIs5a3yv0yk6iWHpYOS6h6kY1G8g&s',
            ],
            [
                'name' => 'Laravel',
                'logo' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzhmURm06QeNwqxvaQI10XX6z_9cRtmej4hA&s',
            ],
            [
                'name' => 'Tailwind CSS',
                'logo' => 'https://seeklogo.com/images/T/tailwind-css-logo-5AD4175897-seeklogo.com.png',
            ],
        ];

        foreach ($frameworks as $framework) {
            Framework::create($framework);
        }
    }
}