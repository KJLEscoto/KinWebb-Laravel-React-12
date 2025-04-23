<?php

use App\Http\Controllers\Admin\ProjectsController as AdminProjectsController;
use App\Http\Controllers\Client\ProjectsController as ClientProjectsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware('guest')->group(function () {
    Route::resource('projects', ClientProjectsController::class);

    Route::post('/send-message', function (Request $request) {
        // dd($request->all());
        return back()->with('message', 'Message sent successfully!');
    })->name('send.message');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('admin/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('admin.dashboard');

    Route::resource('admin/projects', AdminProjectsController::class)->names([
        'index' => 'admin.projects.index',
        'create' => 'admin.projects.create',
        'store' => 'admin.projects.store',
        'show' => 'admin.projects.show',
        'edit' => 'admin.projects.edit',
        'update' => 'admin.projects.update',
        'destroy' => 'admin.projects.delete',
    ]);

});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';