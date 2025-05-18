<?php

use App\Http\Controllers\Settings\ModelAboutMeController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', 'settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('settings/job-status', [ProfileController::class, 'setJobStatus'])->name('profile.job-status');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance');

    Route::get('settings/model', [ModelAboutMeController::class, 'edit'])->name('model.edit');
    Route::post('settings/model', [ModelAboutMeController::class, 'store'])->name('model.store');
    Route::patch('settings/model/{id}', [ModelAboutMeController::class, 'update'])->name('model.update');

});