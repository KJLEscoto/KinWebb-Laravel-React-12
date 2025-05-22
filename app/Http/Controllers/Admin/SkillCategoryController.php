<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SkillCategoryController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:categories,name'
        ]);

        $created = Category::create([
            'name' => $validated['name']
        ]);

        if (!$created) {
            return back()->with('warning', 'Something went wrong.');
        }

        return back()->with('success', "{$validated['name']} has been added.");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // dd($request->all());

        $category = Category::whereId($id)->first();

        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                Rule::unique('categories', 'name')->ignore($id),
            ],
        ]);

        if ($validated['name'] === $category->name) {
            return back()->with('info', "No changes made.");
        }

        $category->update([
            'name' => $validated['name']
        ]);

        return back()->with('update', "{$validated['name']} has been updated.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::whereId($id)->first();
        $name = $category->name;
        $category->delete();

        return back()->with('success', "Category \"{$name}\" has been deleted.");
    }
}