<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Marcados - NewTube</title>
  <link href='../styles/styles.css' rel='stylesheet'>
  <link href="../output.css" rel="stylesheet">
  <link rel="stylesheet" href="../styles/fonts.css">
  <link rel="icon" type="image/x-icon" href="../assets/favicon/newtube.ico">
</head>
<body>
<div id="plantilla">
    <?php include '../components/header.php'; ?>
    <main id='main' class="contenedor_ref p-5 overflow-auto h-[100vh-50px]">
        <div class="w-[1284px] mx-auto pt-10 h-full flex flex-col gap-7 max-2xl:w-full">
            <div>
                <h2 class="font-Poppins font-medium text-lg">
                    Marcados
                </h2>
            </div>
            <div class="border-b pb-2">
                <div class="flex items-center gap-5">
                    <button id="btn_mostrar_marcados_videos" class="font-Geist text-[13px] relative">
                        Videos
                    </button>
                    <button id="btn_mostrar_marcados_comentarios" class="font-Geist text-[13px] relative">
                        Comentarios
                    </button>
                </div>
            </div>
            <div id="contenedor_marcados" class="flex flex-col gap-2">
                
            </div>
        </div>
    </main>
    <?php include '../components/sidebar.php'; ?>
  </div>
  <script src="../js/components/sidebar.js"></script>
  <script src="../js/components/header.js"></script>
  <script src="../js/main.js"></script>
  <script src="../js/animaciones/animaciones.js"></script>
  <script src="../js/pages/marcados.js"></script>
  <script src="../js/utils/observer.js"></script>

</body>
</html>
