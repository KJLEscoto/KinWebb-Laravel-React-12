<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SecondaryTextController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $validated = $request->validate([
            'secondary' => 'required|string|max:2500',
            'secondary_highlight' => 'nullable|string',
        ]);

        DB::table('about_me')->update([
            'secondary_text' => $validated['secondary'],
            'secondary_text_highlight' => $validated['secondary_highlight'],
            'updated_at' => now()
        ]);

        return back()->with('success', 'Secondary is added!');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'secondary' => 'required|string|max:2500',
            'secondary_highlight' => 'nullable|string',
        ]);

        $updated = DB::table('about_me')
            ->where('id', $id)
            ->update([
                'secondary_text' => $validated['secondary'],
                'secondary_text_highlight' => $validated['secondary_highlight'],
                'updated_at' => now()
            ]);

        if (!$updated) {
            return back()->with('info', 'No changes made.');
        }

        return back()->with('update', 'Secondary has been updated!');
    }
}