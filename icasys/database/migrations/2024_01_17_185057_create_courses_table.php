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
        Schema::create('courses', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->string('title')->unique();
            $table->text('description');
            $table->mediumText('short_description');
            $table->string('slug')->nullable();
            $table->unsignedBigInteger('difficulty_id')->nullable();
            $table->foreign('difficulty_id')
                ->references('id')
                ->on('coursedifficulties')
                ->onUpdate('cascade')
                ->onDelete('set null');
            $table->unsignedBigInteger('professor_id')->nullable();
            $table->foreign('professor_id')
                ->references('id')
                ->on('professors')
                ->onUpdate('cascade')
                ->onDelete('set null');
            $table->unsignedBigInteger('category_id')->nullable();
            $table->foreign('category_id')
                ->references('id')
                ->on('coursecategories')
                ->onUpdate('cascade')
                ->onDelete('set null');
            $table->string('state')->default('draft');
            $table->double('price');
            $table->text('target_learning')->nullable();
            $table->mediumText('target_audience')->nullable();
            $table->integer('houres');
            $table->mediumText('files_included')->nullable();
            $table->mediumText('requirements')->nullable();
            $table->string('image')->nullable();
            $table->string('video')->nullable();
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
        Schema::dropIfExists('courses');
    }
};
