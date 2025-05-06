<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Framework;
use App\Models\TechStack;
use App\Models\Tool;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TechStackController extends Controller
{
    public function index()
    {
        $tools = Tool::all();
        $frameworks = Framework::all();
        return inertia('admin/tech-stack/index', compact('tools', 'frameworks'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $tools = Tool::all();
        $frameworks = Framework::all();
        return inertia('admin/tech-stack/create', compact('tools', 'frameworks'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'type' => 'required|string|in:tool,framework',
            'logoUrl' => 'nullable|string',
            'logoUpload' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:20480',
        ]);

        $logo = $validated['logoUrl'] ?? null;

        if ($request->hasFile('logoUpload')) {
            $logo = Storage::disk('public')->put('techstack', $request->file('logoUpload'));
        }

        $modelMap = [
            'tool' => Tool::class,
            'framework' => Framework::class,
        ];

        $modelClass = $modelMap[$validated['type']] ?? null;

        if (!$modelClass) {
            return back()->with('error', 'Error occurred, please try again.');
        }

        $modelClass::create([
            'name' => $validated['name'],
            'logo' => $logo,
        ]);

        $message = "{$validated['name']} has been added.";

        return redirect()->route('admin.techstack.index')->with('success', $message);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        $techstack_instance = new TechStack();
        $tech_name = $techstack_instance->unslugify($slug);

        $techtype = '';

        $techstack = Framework::where('name', $tech_name)->first();
        $techtype = 'framework';

        if (!$techstack) {
            $techstack = Tool::where('name', $tech_name)->first();
            $techtype = 'tool';
        }

        return inertia('admin/tech-stack/show', compact('techstack', 'techtype'));
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        //
    }
}