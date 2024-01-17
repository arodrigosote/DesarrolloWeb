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
        Schema::create('categories', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();
            $table->unsignedBigInteger('father_category_id')->nullable();
            $table->foreign('father_category_id')->references('id')->on('categories')->onUpdate('cascade')->onDelete('set null');
            $table->integer('post_counter')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });
        DB::table('categorias')->insert([
            ['name' => 'Programación y Desarrollo de Software'],
            ['name' => 'Sistemas Operativos'],
            ['name' => 'Seguridad Informática'],
            ['name' => 'Hardware y Componentes'],
            ['name' => 'Redes y Conectividad'],
            ['name' => 'Diseño Gráfico'],
            ['name' => 'Edición de Video'],
            ['name' => 'Marketing Digital'],
            ['name' => 'Redes Sociales'],
            ['name' => 'Aprendizaje Automático e Inteligencia Artificial'],
            ['name' => 'Herramientas y Productividad'],
            ['name' => 'Noticias y Tendencias Tecnológicas'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categories');
    }
};
