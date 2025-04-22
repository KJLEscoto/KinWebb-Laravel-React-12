<?php

use App\Http\Controllers\Client\ProjectsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::resource('projects', ProjectsController::class);

Route::post('/send-message', function (Request $request) {
    // dd($request->all());
    return back()->with('message', 'Message sent successfully!');
})->name('send.message');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';