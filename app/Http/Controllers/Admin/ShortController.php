<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ShortController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'body' => 'required|string|max:2500',
            'highlight' => 'nullable|string',
        ]);

        DB::table('short_about')->insert(
            [
                'body' => $validated['body'],
                'highlight' => $validated['highlight'],
            ]
        );

        return back()->with('success', 'Short is added!');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'body' => 'required|string|max:2500',
            'highlight' => 'nullable|string',
        ]);

        $updated = DB::table('short_about')
            ->where('id', $id)
            ->update([
                'body' => $validated['body'],
                'highlight' => $validated['highlight'],
            ]);

        if (!$updated) {
            return back()->with('info', 'No changes made.');
        }

        return back()->with('success', 'Short has been updated!');
    }
}