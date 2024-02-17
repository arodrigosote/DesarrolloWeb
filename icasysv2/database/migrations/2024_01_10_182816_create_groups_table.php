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
        Schema::create('groups', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->unsignedBigInteger('schedule_id')->nullable();
            $table->foreign('schedule_id')->references('id')->on('schedules')->onUpdate('cascade')->onDelete('set null');
            $table->unsignedBigInteger('professor_id')->nullable();
            $table->foreign('professor_id')->references('id')->on('professors')->onUpdate('cascade')->onDelete('set null');
            $table->boolean('active')->default(1);
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
        Schema::dropIfExists('groups');
    }
};
