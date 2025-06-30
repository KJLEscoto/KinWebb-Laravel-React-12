<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Company;
use App\Models\Experience;
use Illuminate\Http\Request;

class ExpController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $companies = Company::with('experiences')->get();

        return inertia('admin/experiences/index', compact('companies'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());

        $validated = $request->validate([
            'id' => 'numeric',
            'description' => 'required|string',
        ]);

        if ($validated['id'] ?? false) {
            $experience = Experience::create([
                'description' => $validated['description']
            ]);

            $find_company = Company::where('id', $validated['id'])->first();

            $experience->company()->attach($find_company->id);
        }

        return back()->with('success', 'New experience has been added.');
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, string $id)
    // {
    //     //
    // }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $experience = Experience::findOrFail($id);

        if ($experience->delete()) {
            return back()->with('success', 'Experience has been removed.');
        }

        return back()->with('warning', 'Something went wrong.');
    }
}