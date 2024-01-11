<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inscriptions', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->string('inscription');
            $table->timestamps();
        });
        DB::table('inscriptions')->insert([
            ['inscription' => 'Familias/Amigo/Conocido'],
            ['inscription' => 'Asesor educativo'],
            ['inscription' => 'Redes sociales'],
            ['inscription' => 'Marketing'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('inscriptions');
    }
};
