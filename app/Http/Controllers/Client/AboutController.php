<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\TechStack;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AboutController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $techstack = TechStack::all();
        $about_me = DB::table('about_me')->first();
        $user = User::first();
        $categories = Category::with('skills')->get();
        return inertia('client/about/index', compact('techstack', 'about_me', 'user', 'categories'));
    }
}