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
        Schema::create('activities', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->string('activity');
            $table->timestamps();
        });
        DB::table('activities')->insert([
            ['activity' => 'Publico general'],
            ['activity' => 'Estudiante'],
            ['activity' => 'Negocio/Empresa'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('activities');
    }
};
