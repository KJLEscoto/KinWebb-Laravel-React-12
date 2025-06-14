<?php

use App\Http\Controllers\Admin\AboutController as AdminAboutController;
use App\Http\Controllers\Admin\HeroController as AdminHeroController;
use App\Http\Controllers\Admin\MainTextController as AdminMainTextController;
use App\Http\Controllers\Admin\ProjectsController as AdminProjectsController;
use App\Http\Controllers\Admin\ResumeController as AdminResumeController;
use App\Http\Controllers\Admin\SecondaryTextController as AdminSecondaryTextController;
use App\Http\Controllers\Admin\ShortController as AdminShortController;
use App\Http\Controllers\Admin\SkillCategoryController as AdminSkillCategoryController;
use App\Http\Controllers\Admin\SkillController as AdminSkillController;
use App\Http\Controllers\Admin\TechStackController as AdminTechStackController;
use App\Http\Controllers\Admin\SocialController as AdminSocialController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
  // dashboard page
  Route::get('admin/dashboard', function () {
    return Inertia::render('dashboard');
  })->name('admin.dashboard');

  // admin projects page
  Route::resource('admin/projects', AdminProjectsController::class)
    ->except(['destroy'])
    ->names([
      'index' => 'admin.projects.index',
      'create' => 'admin.projects.create',
      'store' => 'admin.projects.store',
      'show' => 'admin.projects.show',
      'edit' => 'admin.projects.edit',
      'update' => 'admin.projects.update',
    ]);
  Route::patch('admin/projects/{project}/toggle-featured', [AdminProjectsController::class, 'toggleFeatured'])->name('admin.projects.toggle-featured');

  // admin tech stack page
  Route::resource('admin/tech-stack', AdminTechStackController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->names([
      'index' => 'admin.techstack.index',
      'store' => 'admin.techstack.store',
      'update' => 'admin.techstack.update',
      'destroy' => 'admin.techstack.destroy',
    ]);
  Route::patch('admin/tech-stack/{id}/update-logo', [AdminTechStackController::class, 'updateLogo'])->name('admin.techstack.update-logo');

  // admin hero page
  Route::resource('admin/hero', AdminHeroController::class)
    ->except(['edit', 'show'])
    ->names([
      'index' => 'admin.hero.index',
      'create' => 'admin.hero.create',
      'store' => 'admin.hero.store',
      'update' => 'admin.hero.update',
      'destroy' => 'admin.hero.destroy',
    ]);

  // about me page
  Route::resource('admin/about-me', AdminAboutController::class)
    ->only(['index'])
    ->names([
      'index' => 'admin.about-me.index',
    ]);
  Route::resource('admin/about-me/short', AdminShortController::class)
    ->only(['store', 'update'])
    ->names([
      'store' => 'admin.about-me.store-short',
      'update' => 'admin.about-me.update-short',
    ]);
  Route::resource('admin/about-me/main', AdminMainTextController::class)
    ->only(['store', 'update'])
    ->names([
      'store' => 'admin.about-me.store-main-text',
      'update' => 'admin.about-me.update-main-text',
    ]);
  Route::resource('admin/about-me/secondary', AdminSecondaryTextController::class)
    ->only(['store', 'update'])
    ->names([
      'store' => 'admin.about-me.store-secondary-text',
      'update' => 'admin.about-me.update-secondary-text',
    ]);
  Route::resource('admin/about-me/resume', AdminResumeController::class)
    ->only(['store', 'update'])
    ->names([
      'store' => 'admin.about-me.store-resume',
      'update' => 'admin.about-me.update-resume',
    ]);
  Route::patch('admin/about-me/{id}/resume-status', [AdminResumeController::class, 'setResumeStatus'])->name('admin.about-me.update-resume-status');

  // skills page
  Route::resource('admin/skills', AdminSkillController::class)
    ->except(['create', 'show', 'edit'])
    ->names([
      'index' => 'admin.skills.index',
      'store' => 'admin.skills.store',
      'update' => 'admin.skills.update',
      'destroy' => 'admin.skills.destroy',
    ]);
  // skill category
  Route::resource('admin/skill-category', AdminSkillCategoryController::class)
    ->only(['store', 'update', 'destroy'])
    ->names([
      'store' => 'admin.skill-category.store',
      'update' => 'admin.skill-category.update',
      'destroy' => 'admin.skill-category.destroy',
    ]);

  Route::resource('admin/socials', AdminSocialController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->names([
      'index' => 'admin.socials.index',
      'store' => 'admin.socials.store',
      'update' => 'admin.socials.update',
      'destroy' => 'admin.socials.destroy',
    ]);
});