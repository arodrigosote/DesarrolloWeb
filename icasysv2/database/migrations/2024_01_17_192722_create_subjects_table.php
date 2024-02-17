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
        Schema::create('subjects', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('semester_id')->nullable();
            $table->foreign('semester_id')->references('id')->on('semesters')->onUpdate('cascade')->onDelete('set null');
            $table->timestamps();
        });

        DB::table('subjects')->insert([
            ['name' => 'Microsoft Word', 'semester_id' => 1],
            ['name' => 'Microsoft PowerPoint', 'semester_id' => 1],
            ['name' => 'Windows', 'semester_id' => 1],
            ['name' => 'Internet', 'semester_id' => 1],
            ['name' => 'Windows e Internet', 'semester_id' => 1],
            ['name' => 'Microsoft Excel I', 'semester_id' => 1],
            ['name' => 'Microsoft Excel II', 'semester_id' => 1],
            ['name' => 'Microsoft Excel', 'semester_id' => 1],
            ['name' => 'Microsoft Publisher', 'semester_id' => 2],
            ['name' => 'Canva', 'semester_id' => 2],
            ['name' => 'Adobe Photoshop', 'semester_id' => 2],
            ['name' => 'Corel Draw ', 'semester_id' => 2],
            ['name' => 'Eovia Carrara', 'semester_id' => 2],
            ['name' => 'Prezi y Powtoon', 'semester_id' => 2],
            ['name' => 'Desarrollo Web I', 'semester_id' => 3],
            ['name' => 'Desarrollo Web II', 'semester_id' => 3],
            ['name' => 'HTML / CSS', 'semester_id' => 3],
            ['name' => 'Frameworks', 'semester_id' => 3],
            ['name' => 'Laravel', 'semester_id' => 3],
            ['name' => 'Django', 'semester_id' => 3],
            ['name' => 'Fundamentos Programación', 'semester_id' => 3],
            ['name' => 'Base de datos I', 'semester_id' => 4],
            ['name' => 'Programación I', 'semester_id' => 4],
            ['name' => 'Programación II', 'semester_id' => 4],
            ['name' => 'Base de datos', 'semester_id' => 4],
            ['name' => 'Wordpress', 'semester_id' => 4],
            ['name' => 'Proyecto', 'semester_id' => 4],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('subjects');
    }
};
