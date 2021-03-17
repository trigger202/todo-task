<?php

use Illuminate\Database\Seeder;
use App\Models\Todo;

class TodoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker\Generator $faker)
    {
        Todo::create([
            'title'              => 'Sample Title',
            'recipient'          => $faker->name,
            'video_watched'      => false,
            'video_name'         => '',
            'status'             => 'Not Completed'
        ]);

        Todo::create([
            'title'              => 'Sample Title2',
            'recipient'          => $faker->name,
            'video_watched'      => false,
            'video_name'         => '',
            'status'             => 'Not Completed'
        ]);
    }
}
