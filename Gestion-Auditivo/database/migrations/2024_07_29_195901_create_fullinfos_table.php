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
        Schema::create('fullinfos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('patient_id')->nullable();
            $table->foreign('patient_id')->references('id')->on('patients')->onUpdate('cascade')->onDelete('set null');
            $table->string('companion', 100)->nullable(); // Limitar a 100 caracteres
            $table->string('group', 50)->nullable(); // Limitar a 50 caracteres

            $table->string('work', 150)->nullable(); // Limitar a 150 caracteres
            $table->string('common_enviroment', 200)->nullable(); // Limitar a 200 caracteres
            $table->boolean('strong_noise')->nullable(); // Limitar a 50 caracteres
            $table->boolean('isAlone')->nullable();

            $table->boolean('high_pressure')->nullable(); // Limitar a 50 caracteres
            $table->boolean('hasCardiovascularProblems')->nullable();
            $table->boolean('hasDiabetes')->nullable();
            $table->boolean('hasNervousDisorder')->nullable();
            $table->boolean('hasFainting')->nullable();
            $table->boolean('hasVomit')->nullable();
            $table->boolean('hasDizziness')->nullable();
            $table->boolean('hasNeurologicalProblems')->nullable();
            $table->boolean('hasAllergies')->nullable();
            $table->boolean('hasWeightProblems')->nullable();
            $table->string('others')->nullable();
            $table->boolean('useGlasses')->nullable();
            $table->boolean('hasusedAntibiotic')->nullable();

            $table->boolean('hasItch')->nullable();
            $table->boolean('hasPain')->nullable();
            $table->boolean('hasFlow')->nullable();
            $table->boolean('hasEarPlug')->nullable();
            $table->boolean('hasORL')->nullable();
            $table->boolean('hasSinusitis')->nullable();
            $table->boolean('hasCatarro')->nullable();
            $table->boolean('hasBreathIssues')->nullable();
            $table->boolean('hasFamilyDeafness')->nullable();
            $table->boolean('hasEarAllergy')->nullable();
            $table->boolean('hasNoseAllergy')->nullable();
            $table->boolean('isSmoker')->nullable();
            $table->boolean('hasTinitus')->nullable();
            $table->string('whichear')->nullable();
            $table->string('whaattime')->nullable();
            $table->string('description')->nullable();
            $table->boolean('hasSurgicalIntervention')->nullable();
            $table->string('earCleaning')->nullable();
            $table->string('hosDoesEarCleaning')->nullable();
            $table->boolean('visitOtorrineMedician')->nullable();
            $table->string('whois')->nullable();

            $table->string('bestEar')->nullable();
            $table->string('phoneEar')->nullable();
            $table->string('timeProblems')->nullable();
            $table->string('howLong')->nullable();
            $table->string('cause')->nullable();
            $table->string('problemsInNormalConver')->nullable();
            $table->string('inGroups')->nullable();
            $table->string('anyDangerNoise')->nullable();
            $table->string('leftRight')->nullable();
            $table->string('motorCoordination')->nullable();
            $table->string('whatDDoYouWait')->nullable();

            $table->string('doYouKnowAuditive')->nullable();
            $table->string('whatDoYouThink')->nullable();
            $table->string('whatDoYouExpect')->nullable();
            $table->string('whatAreYouInterest')->nullable();




            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fullinfos');
    }
};
