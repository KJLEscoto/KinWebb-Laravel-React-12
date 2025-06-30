<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'position' => 'required|string',
            'job_type' => 'required|string',
            'link' => 'required|string',
            'month_start' => 'required|date_format:Y-m',
            'month_end' => 'nullable|date_format:Y-m'
        ]);

        $created = Company::create([
            'name' => $validated['name'],
            'position' => $validated['position'],
            'job_type' => $validated['job_type'],
            'link' => $validated['link'],
            'month_started' => $validated['month_start'],
            'month_ended' => $validated['month_end']
        ]);

        if (!$created) {
            return back()->with('warning', 'Something went wrong.');
        }

        return back()->with('success', "Company '{$validated['name']}' has been added.");
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
        $company = Company::find($id);

        if (!$company) {
            return back()->with('warning', 'Company not found.');
        }

        $company->delete();

        return back()->with('success', "Company '{$company->name}' has been deleted.");
    }
}