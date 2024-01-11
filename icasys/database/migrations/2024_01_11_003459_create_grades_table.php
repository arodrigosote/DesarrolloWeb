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
        Schema::create('grades', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->string('grade');
            $table->timestamps();
        });
        DB::table('grades')->insert([
            ['grade' => 'Primaria'],
            ['grade' => 'Secundaria'],
            ['grade' => 'Bachillerato'],
            ['grade' => 'Licenciatura'],
            ['grade' => 'Maestría'],
            ['grade' => 'Doctorado']
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('grades');
    }
};
