<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('audiometries', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('patients')->onUpdate('cascade')->onDelete('restrict');
            $table->unsignedBigInteger('patient_id')->nullable();
            $table->foreign('patient_id')->references('id')->on('patients')->onUpdate('cascade')->onDelete('cascade');
            $table->date('date');
            $table->enum('oido', ['O.D.', 'O.I.', 'T.D.', 'T.L.'])->nullable();
            $table->integer('frecuencia_250')->nullable();
            $table->integer('frecuencia_500')->nullable();
            $table->integer('frecuencia_1000')->nullable();
            $table->integer('frecuencia_2000')->nullable();
            $table->integer('frecuencia_4000')->nullable();
            $table->integer('frecuencia_6000')->nullable();
            $table->string('nivel_confort')->nullable();
            $table->string('comments')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audiometries');
    }
};
