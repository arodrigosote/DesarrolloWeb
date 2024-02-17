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
        Schema::create('lessons', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->unsignedBigInteger('module_id');
            $table->foreign('module_id')->references('id')->on('modules')->onUpdate('cascade')->onDelete('cascade');
            $table->unsignedSmallInteger('lesson_number')->nullable();
            $table->string('name');
            $table->text('content');
            $table->string('image')->nullable();
            $table->string('video')->nullable();
            $table->unsignedSmallInteger('content_houres');
            $table->unsignedSmallInteger('content_minutes');
            $table->string('resources_url')->nullable();
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
        Schema::dropIfExists('lessons');
    }
};
