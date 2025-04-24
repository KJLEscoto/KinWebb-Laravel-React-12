<?php

use App\Http\Controllers\Client\ProjectsController as ClientProjectsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::resource('projects', ClientProjectsController::class);

Route::post('/send-message', function (Request $request) {
    // dd($request->all());
    return back()->with('message', 'Message sent successfully!');
})->name('send.message');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';