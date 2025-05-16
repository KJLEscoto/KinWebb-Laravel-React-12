<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('about_me', function (Blueprint $table) {
            $table->id();
            $table->string('main_text')->nullable();
            $table->string('main_text_highlight')->nullable();
            $table->string('secondary_text')->nullable();
            $table->string('secondary_text_highlight')->nullable();
            $table->string('picture')->nullable();
            $table->string('resume_link')->nullable();
            $table->boolean('resume_status')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('about_me');
    }
};