<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fullinfo extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'companion',
        'group',
        'work',
        'common_enviroment',
        'strong_noise',
        'isAlone',
        'high_pressure',
        'hasCardiovascularProblems',
        'hasDiabetes',
        'hasNervousDisorder',
        'hasFainting',
        'hasVomit',
        'hasDizziness',
        'hasNeurologicalProblems',
        'hasAllergies',
        'hasWeightProblems',
        'others',
        'useGlasses',
        'hasusedAntibiotic',
        'hasItch',
        'hasPain',
        'hasFlow',
        'hasEarPlug',
        'hasORL',
        'hasSinusitis',
        'hasCatarro',
        'hasBreathIssues',
        'hasFamilyDeafness',
        'hasEarAllergy',
        'hasNoseAllergy',
        'isSmoker',
        'hasTinitus',
        'whichear',
        'whaattime',
        'description',
        'hasSurgicalIntervention',
        'earCleaning',
        'hosDoesEarCleaning',
        'visitOtorrineMedician',
        'whois',
        'bestEar',
        'phoneEar',
        'timeProblems',
        'howLong',
        'cause',
        'problemsInNormalConver',
        'inGroups',
        'anyDangerNoise',
        'leftRight',
        'motorCoordination',
        'whatDDoYouWait',
        'doYouKnowAuditive',
        'whatDoYouThink',
        'whatDoYouExpect',
        'whatAreYouInterest',
    ];

    public function patient()
    {
        return $this->hasOne('App\Models\Patient', 'id', 'patient_id');
    }
}
