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
        Schema::create('studentgroupsubjects', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->unsignedBigInteger('student_id');
            $table->foreign('student_id')->references('id')->on('students')->onDelete('restrict')->onUpdate('cascade');
            $table->unsignedBigInteger('subjectgroup_id');
            $table->foreign('subjectgroup_id')->references('id')->on('subjectgroups')->onDelete('restrict')->onUpdate('cascade');
            $table->smallInteger('grade');

            // $table->primary(['alumno_id', 'grupomateria_id']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('studentgroupsubjects');
    }
};
