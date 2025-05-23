<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Framework;
use App\Models\Project;
use App\Models\TechStack;
use App\Models\Tool;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use phpDocumentor\Reflection\ProjectFactory;

class ProjectsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::with('tags')->get();

        return inertia('admin/projects/index', compact('projects'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $techstack = TechStack::all();
        return inertia('admin/projects/create', compact('techstack'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());

        $validated = $request->validate([
            'name' => 'required|string',
            'tags' => 'required|string',
            'description' => 'required|string|max:2500',
            'year' => 'required|string|max:4',
            'roles' => 'required|string',
            'tools' => 'nullable|array|min:1',
            'frameworks' => 'nullable|array|min:1',
            'is_featured' => 'boolean',
            'screenshots' => 'nullable|array|min:1',
            'screenshots.*.name' => 'required|string',
            'screenshots.*.image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:20480',
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:20480',
        ]);

        if ($request->hasFile('thumbnail')) {
            $thumbnail_path = Storage::disk('public')->put('thumbnails', $request->file('thumbnail'));
        } else {
            $thumbnail_path = null;
        }

        $project = Project::create(array_merge(
            Arr::except($validated, ['tags', 'roles', 'tools', 'frameworks', 'thumbnail', 'screenshots']),
            ['thumbnail' => $thumbnail_path]
        ));

        if ($validated['tags'] ?? false) {
            foreach (explode(',', $validated['tags']) as $tag) {
                $project->tag(trim($tag)); // trim here
            }
        }

        if ($validated['roles'] ?? false) {
            foreach (explode(',', $validated['roles']) as $role) {
                $project->role(trim($role)); // and here
            }
        }

        if ($validated['screenshots'] ?? false) {
            foreach ($validated['screenshots'] as $screenshot) {
                $screenshot_path = Storage::disk('public')->put('screenshots', $screenshot['image']);
                $project->screenshots()->create([
                    'name' => $screenshot['name'],
                    'image' => $screenshot_path,
                ]);
            }
        }

        if ($validated['tools'] ?? false) {
            foreach ($validated['tools'] as $tool) {
                $find_tool = TechStack::where('name', $tool)->first();
                $project->techstack()->attach($find_tool->id);
            }
        }

        if ($validated['frameworks'] ?? false) {
            foreach ($validated['frameworks'] as $framework) {
                $find_framework = TechStack::where('name', $framework)->first();
                $project->techstack()->attach($find_framework->id);
            }
        }

        return redirect()->route('admin.projects.index')->with('success', 'New project added!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        $project_instance = new Project();
        $project_name = $project_instance->unslugify($slug);

        $project = $project_instance
            ->where('name', $project_name)
            ->with(['tags', 'roles', 'techstack', 'screenshots'])
            ->firstOrFail();

        return inertia('admin/projects/show', compact('project'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        $project->load(['tags', 'roles', 'techstack', 'screenshots']);

        dd($project);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        //
    }

    public function toggleFeatured(string $slug)
    {
        $maxFeatured = config('app.max_featured_projects');

        $project_instance = new Project();
        $project_name = $project_instance->unslugify($slug);

        $project = $project_instance
            ->where('name', $project_name)
            ->first();

        if (Project::where('is_featured', true)->count() >= $maxFeatured && !$project->is_featured) {
            return back()->with('warning', "You can only have {$maxFeatured} featured projects.");
        }

        $project->is_featured = !$project->is_featured;
        $project->save();

        $message = $project->is_featured
            ? $project->name . ' was added to featured.'
            : $project->name . ' was removed from featured.';

        return back()->with('update', $message);
    }

}