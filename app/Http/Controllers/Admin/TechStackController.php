<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Framework;
use App\Models\TechStack;
use App\Models\Tool;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class TechStackController extends Controller
{
    public function index()
    {
        $techstack = TechStack::all();
        return inertia('admin/tech-stack/index', compact('techstack'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:techstack,name',
            'type' => 'required|string|in:tool,framework',
            'logoUrl' => 'nullable|string',
            'logoUpload' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:20480',
        ]);

        $logo = $validated['logoUrl'] ?? null;

        if ($request->hasFile('logoUpload')) {
            $logo = Storage::disk('public')->put('techstack', $request->file('logoUpload'));
        }

        if (!TechStack::class) {
            return back()->with('error', 'Error occurred, please try again.');
        }

        TechStack::create([
            'name' => $validated['name'],
            'logo' => $logo,
            'type' => $validated['type']
        ]);

        $message = "{$validated['name']} has been added.";

        return back()->with('success', $message);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $techstack = TechStack::findOrFail($id);
        // dd($request->all(), $id);

        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                Rule::unique('techstack', 'name')->ignore($id),
            ],
        ]);

        $techstack->update([
            'name' => $validated['name'],
        ]);

        return back()->with('update', "Name has been updated.");
    }

    public function updateLogo(Request $request, string $id)
    {
        $techstack = TechStack::findOrFail($id);

        $validated = $request->validate([
            'logoUrl' => 'nullable|string',
            'logoUpload' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:20480',
        ]);

        $logo = $techstack->logo;

        if ($request->hasFile('logoUpload')) {
            // Delete the old file only if it's local
            if (!filter_var($techstack->logo, FILTER_VALIDATE_URL)) {
                Storage::disk('public')->delete($techstack->logo);
            }

            $logo = Storage::disk('public')->put('techstack', $request->file('logoUpload'));
        } elseif (!empty($validated['logoUrl'])) {
            Storage::disk('public')->delete($techstack->logo);
            $logo = $validated['logoUrl'];
        }

        $techstack->update([
            'logo' => $logo,
        ]);

        return back()->with('update', "Logo has been updated.");
    }

    public function destroy(string $id)
    {
        $techstack = TechStack::findOrFail($id);

        if ($techstack->logo && Storage::disk('public')->exists($techstack->logo)) {
            Storage::disk('public')->delete($techstack->logo);
        }

        $techstack->delete();

        return back()->with('success', "{$techstack->name} has been deleted!");
    }
}