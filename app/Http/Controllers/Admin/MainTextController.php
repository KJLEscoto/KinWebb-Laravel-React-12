<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MainTextController extends Controller
{
    public function store(Request $request)
    {
        // dd($request->all());
        $validated = $request->validate([
            'main' => 'required|string|max:2500',
            'main_highlight' => 'nullable|string',
        ]);

        DB::table('about_me')->update([
            'main_text' => $validated['main'],
            'main_text_highlight' => $validated['main_highlight'],
            'updated_at' => now()
        ]);

        return back()->with('success', 'Main is added!');
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // dd($request->all());

        $validated = $request->validate([
            'main' => 'required|string|max:2500',
            'main_highlight' => 'nullable|string',
        ]);

        $updated = DB::table('about_me')
            ->where('id', $id)
            ->update([
                'main_text' => $validated['main'],
                'main_text_highlight' => $validated['main_highlight'],
                'updated_at' => now()
            ]);

        if (!$updated) {
            return back()->with('info', 'No changes made.');
        }

        return back()->with('update', 'Main has been updated!');
    }
}