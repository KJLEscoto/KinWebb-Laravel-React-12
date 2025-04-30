<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

use function Laravel\Prompts\alert;

class ProjectsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::with('roles')->get();

        return inertia('client/projects/index', compact('projects'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $validate = $request->validate([
            'email' => 'required|string|email',
        ]);

        return back()->with('success', 'Request sent! Check your email in a bit.');

        // $project = Project::where('id', $request->project)->first();

        // $project_name = $project->slugify($project->name);

        // return redirect()->route('projects.show', $project_name)->with('success', 'Request has been submitted! Check your email in a bit.');
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
            ->with(['tags', 'roles', 'tools', 'frameworks', 'screenshots'])
            ->firstOrFail();

        // $project->load(['tags', 'roles', 'tools', 'frameworks', 'screenshots']);

        return inertia('client/projects/show', compact('project'));
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

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}