<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\DayController;
use App\Http\Controllers\HourController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfessorController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\StudentclassController;
use App\Http\Controllers\StudentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/dashboard', function () {
    return Inertia::render("Dashboard/Dashboard");
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth', 'verified')->group(function () {
    Route::get('/perfil/editar', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::get('/perfil', [ProfileController::class, 'show'])->name('profile.show');
    Route::post('/perfil', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/perfil', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('dias', DayController::class);
    Route::get('/dias', [DayController::class, "index"])->name("day.index");

    Route::resource("/horas", HourController::class);
    Route::get("/horas", [HourController::class, "index"])->name('horas.index');

    Route::resource("/horarios", ScheduleController::class);
    Route::resource("/profesores", ProfessorController::class);
    Route::resource("/grupos", GroupController::class);
    Route::resource("/alumnos", StudentController::class);

    //PROFESSOR
    Route::post("/profesor/actualizar/{id}", [ProfessorController::class, "update"])->name("professor.update");

    //STUDENTS PAYMENTS
    Route::get("/alumno/{id}/agregar/pagos", [StudentController::class, "showStudentPayment"])->name("alumnos.payment.show");
    Route::post("/alumno/crear/pago", [StudentController::class, "storeStudentPayment"])->name("alumnos.payment");
    Route::get("/alumno/{id}/mostrar/recibos", [StudentController::class, "showStudentReceipts"])->name("alumnos.receipts");
    //STUDENT SEARCH
    Route::get("/buscar/alumno/{name}", [StudentController::class, "searchStudent"])->name("alumno.search");
    //STUDENT
    Route::get("/alumno/mis-cursos", [StudentController::class, "myCourses"])->name("alumno.courses");
    Route::get("/alumno/mis-calificaciones", [StudentController::class, "myGrades"])->name("alumno.grades");

    //GRADES
    Route::put("/grupo/materia/ver-calificaciones/{id}", [StudentclassController::class, "updateGrades"])->name("grupos.grades.update");
    Route::get("/grupo/materia/ver-calificaciones/{id}", [StudentclassController::class, "showGrades"])->name("grupos.grades");

    //GROUP
    Route::get("/grupos/{id}/mostrar/materias", [GroupController::class, "showSubjects"])->name("grupos.subjects.show");
    Route::post("/grupos/agregar/materia", [GroupController::class, "storeSubjects"])->name("grupos.subjects.store");
    Route::put("/grupos/{id}/actualizar/materia", [GroupController::class, "updateSubjects"])->name("grupos.subjects.update");
    Route::delete("/grupos/{id}/eliminar/materia", [GroupController::class, "deleteSubjects"])->name("grupos.subjects.delete");

    Route::get("/grupo/materia/{subject_id}/{group_id}", [GroupController::class, "showLessons"])->name("grupos.lessons.show");
    Route::post("/grupo/materia/clase/guardar", [GroupController::class, "storeLessons"])->name("grupos.lessons.store");
    Route::put("/grupo/materia/clase/{id}/actualizar", [GroupController::class, "updateLessons"])->name("grupos.lessons.update");
    Route::delete("/grupo/materia/clase/{id}/eliminar", [GroupController::class, "deleteLessons"])->name("grupos.lessons.delete");

    //COURSES
    Route::get("/admin/cursos", [CourseController::class, "index"])->name("admin.courses");
    Route::post("/admin/cursos/crear", [CourseController::class, "store"])->name("admin.courses.store");
    Route::post("/admin/cursos/actualizar/{id}", [CourseController::class, "update"])->name("admin.courses.update");
    Route::get("/admin/cursos/mostrar/{id}", [CourseController::class, "show"])->name("admin.courses.show");
    Route::get("/curso/mostrar/{course_id}/{course_slug}/", [CourseController::class, "show_content"])->name("course.show.content");

    //MODULES
    Route::post("/admin/cursos/modulo/crear", [ModuleController::class, "store"])->name("admin.modules.store");
    Route::put("/admin/cursos/modulo/actualizar/{id}", [ModuleController::class, "update"])->name("admin.modules.update");
    Route::delete("/admin/cursos/modulo/eliminar/{id}", [ModuleController::class, "delete"])->name("admin.module.destroy");

    //LESSONS
    Route::post("/admin/cursos/modulo/lesson/crear", [LessonController::class, "store"])->name("admin.lesson.store");
    Route::post("/admin/cursos/modulo/lesson/actualizar/{id}", [LessonController::class, "update"])->name("admin.lesson.update");
    Route::delete("/admin/cursos/modulo/lesson/eliminar/{id}", [LessonController::class, "delete"])->name("admin.lesson.destroy");
    Route::get("/curso/{course_id}/{course_name}/lesson/{lesson_id}/{lesson_number}/{lesson_name}", [LessonController::class, "show_lesson"])->name("lesson.show");
    Route::get("/curso/{course_id}/{course_name}/lesson/primera-leccion", [LessonController::class, "show_lesson_updated"])->name("lesson.show.updated");

    //Courses
    Route::get('/curso/ver/{id}/{slug}', [CourseController::class, 'show_course_landing'])->name('course.landing');
    Route::get('/curso/comprar/{id}/{slug}', [CourseController::class, 'cart_course'])->name('course.cart');

    //Payments
    Route::get('/curso/comprar/{id}/{slug}/aprobado', [PaymentController::class, 'success'])->name('payment.success');
    Route::get('/curso/comprar/{id}/{slug}/pendiente', [PaymentController::class, 'pending'])->name('payment.pending');
    Route::get('/curso/comprar/{id}/{slug}/error', [PaymentController::class, 'failure'])->name('payment.failure');
});



// Normal pages
Route::get('/', [PagesController::class, "home"])->name('page.home');
Route::get('/contacto', [PagesController::class, "contact"])->name('page.contact');
Route::get('/acerca-de', [PagesController::class, "about"])->name('page.about');
Route::get('/servicios', [PagesController::class, "services"])->name('page.services');
Route::get('/cursos', [PagesController::class, "courses"])->name('courses');
Route::get('/curso/ver/{id}/{slug}', [CourseController::class, 'show_course_landing'])->name('course.landing');

//dashboard
Route::get('/escritorio', [DashboardController::class, "dashboard"])->name('dashboard.home')->middleware(['auth', 'verified']);

//ADMIN DASHBOARD
// Route::get('administrador/dias', [DayController::class, "index"])->name("index.day");
// Route::post("administrador/dia/agregar", [DayController::class,"create"])->name("create.day");




require __DIR__ . '/auth.php';
