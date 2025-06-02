<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Inicio - NewTube</title>
  <link rel="icon" type="image/x-icon" href="./assets/favicon/newtube.ico">
  <link href='./styles/styles.css' rel='stylesheet'>
  <link href="./output.css" rel="stylesheet">
  <link rel="stylesheet" href="./styles/fonts.css">
</head>
<body>
  <div id="plantilla">
    <?php include './components/header.php'; ?>
    <main id='main' class="contenedor_ref h-[calc(100vh-50px)] overflow-auto">
     <div class=' w-full h-full'>
      <div id="listado_horizontal_categorias" class='pt-[5px] pb-[5px] flex items-center overflow-hidden bg-[#FDFDFD] sticky top-0 z-30'>

      </div>
      <div id='contenedor_videos_inicio' class="pb-2.5">
     
      </div>
     </div>
    </main>
    <?php include './components/sidebar.php'; ?>
  </div>
  <script src="./js/components/sidebar.js"></script>
  <script src="./js/components/header.js"></script>
  <script src="./js/utils/observer.js"></script>
  <script src="./js/main.js"></script>
  <script src="./js/animaciones/animaciones.js"></script>
  <script src="./js/pages/inicio.js"></script>
</body>
</html>
