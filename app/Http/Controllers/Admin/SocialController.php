<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Social;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SocialController extends Controller
{
    public function index()
    {
        $socials = Social::all();

        return inertia('admin/socials/index', compact('socials'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $validated = $request->validate([
            'name' => 'required|string|unique:socials,name',
            'link' => 'required|string',
            'logoUrl' => 'nullable|string',
            'logoUpload' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:20480',
        ]);

        $logo = $validated['logoUrl'] ?? null;

        if ($request->hasFile('logoUpload')) {
            $logo = Storage::disk('public')->put('socials', $request->file('logoUpload'));
        }

        if (!Social::class) {
            return back()->with('error', 'Error occurred, please try again.');
        }

        Social::create([
            'name' => $validated['name'],
            'link' => $validated['link'],
            'logo' => $logo,
        ]);

        $message = "{$validated['name']} has been added.";

        return back()->with('success', $message);
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, string $id)
    // {
    // }

    /**
     * Remove the specified resource from storage.
     * 
     */
    public function destroy(string $id)
    {
        $social = Social::findOrFail($id);
        if ($social->logo && Storage::disk('public')->exists($social->logo)) {
            Storage::disk('public')->delete($social->logo);
        }

        $social->delete();

        return back()->with('success', "{$social->name} has been deleted.");
    }
}