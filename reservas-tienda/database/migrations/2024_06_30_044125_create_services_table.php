<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('durations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('category_id');
            $table->foreign('category_id')->references('id')->on('servicecategories')->onDelete('cascade')->onUpdate('cascade');
            $table->string('name', 255);
            $table->decimal('price', 8, 2);
            $table->unsignedBigInteger('duration_id');
            $table->foreign('duration_id')->references('id')->on('durations')->onDelete('restrict')->onUpdate('restrict');
            $table->text('description');
            $table->string('image');
            $table->timestamps();
        });

        // Insert default durations
        $durations = [];
        for ($i = 5; $i <= 1440; $i += 5) {
            $hours = floor($i / 60);
            $minutes = $i % 60;
            if ($hours > 0) {
                $durations[] = ['name' => sprintf('%dh %02dm', $hours, $minutes)];
            } else {
                $durations[] = ['name' => sprintf('%dm', $i)];
            }
        }

        DB::table('durations')->insert($durations);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
        Schema::dropIfExists('durations');
    }
};
