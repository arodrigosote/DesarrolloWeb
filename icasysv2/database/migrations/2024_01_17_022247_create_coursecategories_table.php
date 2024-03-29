<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('coursecategories', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();
            $table->unsignedBigInteger('father_category_id')->nullable();
            $table->foreign('father_category_id')->references('id')->on('coursecategories')->onUpdate('cascade')->onDelete('set null');
            $table->integer('counter')->default(0);
            $table->string('image')->nullable();
            $table->timestamps();
        });

        DB::table('coursecategories')->insert([
            ['name' => 'programación'],
            ['name' => 'diseño-gráfico'],
            ['name' => 'edición de audio'],
            ['name' => 'edición de video'],
            ['name' => 'marketing'],
            ['name' => 'ventas'],
            ['name' => 'desarrollo-web'],
            ['name' => 'ofimática'],
            ['name' => 'introducción-a-la-computación'],
            ['name' => 'redes-sociales'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('coursecategories');
    }
};
