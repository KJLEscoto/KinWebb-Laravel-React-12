<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Hero;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HeroController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hero_entries = Hero::all();
        return inertia('admin/hero/index', compact('hero_entries'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('admin/hero/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());

        $validated = $request->validate([
            'body' => 'required|string|max:2500',
            'isActive' => 'boolean',
            'logoImage' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:20480',
            'modelImage' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:20480',
        ]);

        if ($request->hasFile('logoImage')) {
            $logo_image = Storage::disk('public')->put('hero', $request->file('logoImage'));
        }

        if ($request->hasFile('modelImage')) {
            $model_image = Storage::disk('public')->put('hero', $request->file('modelImage'));
        }

        Hero::create([
            'logo_image' => $logo_image,
            'model_image' => $model_image,
            'body' => $validated['body'],
            'is_active' => $validated['isActive']
        ]);

        return redirect()->route('admin.hero.index')->with('success', 'New hero entry is added!');
    }

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
    public function edit(Hero $hero)
    {
        return inertia('admin/hero/edit', compact('hero'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Hero $hero)
    {
        dd($request->all(), $hero);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function toggleMainHero(Hero $hero)
    {
        $mainHeroCount = config('app.main_hero_count');

        if ($hero->where('is_active', true)->count() >= $mainHeroCount && !$hero->is_active) {
            return back()->with('warning', "You can only have {$mainHeroCount} main hero.");
        }
        $hero->is_active = !$hero->is_active;
        $hero->save();

        $message = $hero->is_active
            ? 'Entry ' . $hero->id . ' is now the main hero.'
            : 'Entry ' . $hero->id . ' was removed as main hero.';

        return back()->with('update', $message);
    }
}