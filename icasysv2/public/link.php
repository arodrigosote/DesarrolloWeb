<?php

$cadena = substr_replace($_SERVER['DOCUMENT_ROOT'], "", 26, 6);


$targetFolder = $cadena . '/storage/app/public';
$linkFolder = $_SERVER['DOCUMENT_ROOT'] . '/storage';

// Verificar si el directorio de destino existe
if (!is_dir($targetFolder)) {
    die('El directorio de destino no existe: ' . $targetFolder);
}

// Verificar si el enlace simbólico ya existe
if (file_exists($linkFolder)) {
    die('El enlace simbólico ya existe: ' . $linkFolder);
}

// Crear enlace simbólico
if (symlink($targetFolder, $linkFolder)) {
    echo 'Proceso de creación de enlace simbólico completado exitosamente';
} else {
    echo 'Error al crear enlace simbólico';
}
?>
