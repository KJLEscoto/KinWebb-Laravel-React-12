<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function store(Request $request)
    {
        // dd($request->all());
        $validate = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email',
            'message' => 'required|string'
        ]);

        return back()->with('success', 'Message sent!');
    }
}