<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('assistancecategories', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();
            $table->timestamps();
        });

        DB::table('coursecategories')->insert([
            ['name' => 'Duda del curso'],
            ['name' => 'Ayuda con problema en el curso'],
            ['name' => 'Soporte técnico'],
            ['name' => 'Ventas, compras'],
            ['name' => 'Otro'],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assistancecategories');
    }
};
