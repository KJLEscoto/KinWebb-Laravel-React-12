<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ModelAboutMeController extends Controller
{
    public function edit()
    {
        $about_me = DB::table('about_me')->first();

        return inertia('settings/model', compact('about_me'));
    }

    public function store(Request $request)
    {
        // dd($request->all());

        $request->validate([
            'modelImage' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:20480',
        ]);

        if ($request->hasFile('modelImage')) {
            $model_image = Storage::disk('public')->put('about_me', $request->file('modelImage'));
        }

        DB::table('about_me')->update([
            'picture' => $model_image,
            'updated_at' => now()
        ]);

        return to_route('model.edit')->with('success', "Model Image has been added!");
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'modelImage' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:20480',
        ]);

        // Delete old image
        $about = DB::table('about_me')->where('id', $id)->first();
        if ($about && $about->picture) {
            Storage::disk('public')->delete($about->picture);
        }

        // Store new image
        $path = $request->file('modelImage')->store('about_me', 'public');

        DB::table('about_me')->where('id', $id)->update([
            'picture' => $path,
            'updated_at' => now(),
        ]);

        return to_route('model.edit')->with('success', "Model Image has been updated!");
    }


}