<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ResumeController extends Controller
{
    public function store(Request $request)
    {
        // dd($request->all());
        $validated = $request->validate([
            'resume' => 'required|string',
        ]);

        DB::table('about_me')->update([
            'resume_link' => $validated['resume'],
            'resume_status' => true,
            'updated_at' => now()
        ]);

        return back()->with('success', 'Secondary is added!');
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'resume' => 'required|string',
        ]);

        $updated = DB::table('about_me')
            ->where('id', $id)
            ->update([
                'resume_link' => $validated['resume'],
                'updated_at' => now()
            ]);

        if (!$updated) {
            return back()->with('info', 'No changes made.');
        }

        return back()->with('update', 'Resume has been updated!');
    }

    public function setResumeStatus(string $id)
    {
        $resume = DB::table('about_me')->where('id', $id)->first();

        if (!$resume) {
            return back()->with('warning', 'Resume not found.');
        }

        $newStatus = !$resume->resume_status;

        $updated = DB::table('about_me')->where('id', $id)->update([
            'resume_status' => $newStatus,
            'updated_at' => now(),
        ]);

        if (!$updated) {
            return back()->with('warning', 'Something went wrong.');
        }

        $message = $newStatus
            ? 'Resume is now active.'
            : 'Resume is now inactive.';

        return back()->with('update', $message);
    }
}