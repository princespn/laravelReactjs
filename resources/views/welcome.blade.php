<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-bs-theme="dark">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Welcome reactjs</title>

        <link href="/css/style.css" rel="stylesheet" />
        <link href="/css/bootstrap.min.css" rel="stylesheet" />
     
         @viteReactRefresh
        @vite(['resources/sass/app.scss','resources/js/app.jsx']);
          
    </head>
    <body>

    <div id="app"></div>
   
       
    </body>
</html>
