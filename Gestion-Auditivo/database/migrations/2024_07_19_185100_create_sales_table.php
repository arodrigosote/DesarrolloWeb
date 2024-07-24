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
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('patients')->onUpdate('cascade')->onDelete('restrict');
            $table->unsignedBigInteger('patient_id')->nullable();
            $table->foreign('patient_id')->references('id')->on('patients')->onUpdate('cascade')->onDelete('set null');
            $table->date('date');
            $table->string('model');
            $table->string('brand');
            $table->decimal('price', 10, 2);
            $table->string('serial_number');
            $table->string('guarranty')->nullable();
            $table->text('details')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};
