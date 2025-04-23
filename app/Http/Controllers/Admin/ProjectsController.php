<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Auth::user()->projects()->with(['tags', 'roles'])->get();

        return inertia('admin/projects/index', compact('projects'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('admin/projects/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        dd($request->all());

        $validated = $request->validate([
            'name' => 'required|string',
            'tags' => 'required|string',
            'description' => 'required|string|max:2500',
            'year' => 'required|string|max:4',
            'roles' => 'required|string',
            'tools' => 'nullable|array',
            'frameworks' => 'nullable|array',
            'is_featured' => 'boolean',
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:20480',
        ]);

        if ($request->hasFile('thumbnail') ?? false) {
            $path = Storage::disk('public')->put('thumbnails', $request->file('thumbnail'));
        } else {
            $path = null;
        }

        $project = Auth::user()->projects()->create(array_merge(
            Arr::except($validated, ['tags', 'roles', 'tools', 'frameworks', 'thumbnail']),
            ['thumbnail' => $path]
        ));

        if ($validated['tags'] ?? false) {
            foreach (explode(',', $validated['tags']) as $tag) {
                $project->tag($tag);
            }
        }

        if ($validated['roles'] ?? false) {
            foreach (explode(',', $validated['roles']) as $role) {
                $project->role($role);
            }
        }

        return redirect()->route('admin.projects.index')->with('success', 'New project added!');
    }

    // Project::create([
    //     'name' => $request->name,
    //     'description' => $request->description,
    //     'thumbnail' => $path,
    //     'year' => $request->year,
    //     'isFeatured' => $request->isFeatured,
    // ]);

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}