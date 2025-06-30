<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::with('skills')->get();

        return inertia('admin/skills/index', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());

        $validated = $request->validate([
            'id' => 'numeric',
            'description' => 'required|string'
        ]);

        if ($validated['id'] ?? false) {
            $skill = Skill::create([
                'description' => $validated['description']
            ]);

            $find_category = Category::where('id', $validated['id'])->first();

            $skill->categories()->attach($find_category->id);
        }

        return back()->with('success', 'New skill has been added.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // dd($request->all(), $id);

        $skill = Skill::with('categories')->findOrFail($id);

        $categoryName = $skill->categories->pluck('name')->implode(', ');

        $validated = $request->validate([
            'description' => 'required|string'
        ]);

        $skill->update([
            'description' => $validated['description']
        ]);

        return back()->with('update', "Skill from \"{$categoryName}\" has been updated.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $skill = Skill::with('categories')->findOrFail($id);

        // If you want to list all category names:
        $categoryName = $skill->categories->pluck('name')->implode(', ');

        $skill->delete();

        return back()->with('success', "Skill from \"{$categoryName}\" has been deleted.");
    }

}