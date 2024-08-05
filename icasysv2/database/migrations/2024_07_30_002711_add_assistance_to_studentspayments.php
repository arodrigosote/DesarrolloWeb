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
        Schema::table('studentpayments', function (Blueprint $table) {
            $table->boolean('assistance')->default(false)->after('week_topay_number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('studentspayments', function (Blueprint $table) {
            $table->dropColumn('assistance');
        });
    }
};
