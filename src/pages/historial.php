<!doctype html>
<html lang="es">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Historial - NewTube</title>
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
            Historial
          </h2>
        </div>
        <div>
          <div class="relative">
              <div>
                <input id="busqueda_ipt_historial" type="text" class="border w-[300px] max-xs:w-full rounded-md py-2 font-Inter text-xs px-6 outline-none" placeholder="Buscar por título...">
              </div>
              <div class="absolute top-2 left-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 22.5 22.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m19.688 19.688-4.069-4.069m2.194-5.306a7.5 7.5 0 0 1-7.5 7.5 7.5 7.5 0 0 1-7.5-7.5 7.5 7.5 0 0 1 15 0"/></svg>
              </div>
            </div>
        </div>
        <div id="contenedor_historial" class="flex flex-col gap-5">

        </div>
      </div>
    </main>
    <?php include '../components/sidebar.php'; ?>
  </div>
  <script src="../js/components/sidebar.js"></script>
  <script src="../js/components/header.js"></script>
  <script src="../js/utils/observer.js"></script>
  <script src="../js/pages/historial.js"></script>
  <script src="../js/main.js"></script>
  <script src="../js/animaciones/animaciones.js"></script>

</body>

</html>