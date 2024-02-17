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
        Schema::create('studentclasssubjects', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->unsignedBigInteger('student_id');
            $table->foreign('student_id')->references('id')->on('students')->onDelete('restrict')->onUpdate('cascade');
            $table->unsignedBigInteger('class_subject_group_id');
            $table->foreign('class_subject_group_id')->references('id')->on('classsubjectgroups')->onDelete('restrict')->onUpdate('cascade');
            $table->boolean('attendance')->nullable();
            $table->smallInteger('grade')->nullable();
            $table->string('note')->nullable();
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
        Schema::dropIfExists('studentclasssubjects');
    }
};
