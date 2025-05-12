<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>@yield('title')</title>
    @vite('resources/css/app.css')

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
        rel="stylesheet">

    <style>
        .material-symbols-light--home-rounded {
            display: inline-block;
            --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M5 19v-8.692q0-.384.172-.727t.474-.565l5.385-4.078q.423-.323.966-.323t.972.323l5.385 4.077q.303.222.474.566q.172.343.172.727V19q0 .402-.299.701T18 20h-3.384q-.344 0-.576-.232q-.232-.233-.232-.576v-4.769q0-.343-.232-.575q-.233-.233-.576-.233h-2q-.343 0-.575.233q-.233.232-.233.575v4.77q0 .343-.232.575T9.385 20H6q-.402 0-.701-.299T5 19'/%3E%3C/svg%3E");
            background-color: currentColor;
            -webkit-mask-image: var(--svg);
            mask-image: var(--svg);
            -webkit-mask-repeat: no-repeat;
            mask-repeat: no-repeat;
            -webkit-mask-size: 100% 100%;
            mask-size: 100% 100%;
        }

        .flowbite--angle-right-outline {
            display: inline-block;
            --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m9 5l7 7l-7 7'/%3E%3C/svg%3E");
            background-color: currentColor;
            -webkit-mask-image: var(--svg);
            mask-image: var(--svg);
            -webkit-mask-repeat: no-repeat;
            mask-repeat: no-repeat;
            -webkit-mask-size: 100% 100%;
            mask-size: 100% 100%;
        }

        .flowbite--folder-solid {
            display: inline-block;
            --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' fill-rule='evenodd' d='M3 6a2 2 0 0 1 2-2h5.532a2 2 0 0 1 1.536.72l1.9 2.28H3zm0 3v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9z' clip-rule='evenodd'/%3E%3C/svg%3E");
            background-color: currentColor;
            -webkit-mask-image: var(--svg);
            mask-image: var(--svg);
            -webkit-mask-repeat: no-repeat;
            mask-repeat: no-repeat;
            -webkit-mask-size: 100% 100%;
            mask-size: 100% 100%;
        }
    </style>
</head>

<body class="antialiased font-lato bg-[#040204] text-white">
    <main class="max-5xl mx-auto min-h-screen flex flex-col items-center justify-center p-5">

        <div class="relative w-full flex justify-center">
            <h1 class="text-[12rem] text-center w-full text-white absolute -top-[5rem] font-bold tracking-wider">
                @yield('code')
            </h1>
            <img class="max-5xl h-full" src="/gif/orb.gif" alt="orb">
        </div>

        <p class="opacity-70">@yield('message')</p>

        <p class="mt-7 text-xl">Let's take you back.</p>

        <div class="w-full flex flex-col lg:flex-row items-center justify-center lg:gap-10 gap-5 mt-5">
            {{-- home --}}
            <a href="/"
                class="p-5 cursor-pointer min-w-sm border border-white/20 rounded-sm flex items-center justify-between gap-10 hover:border-white transition">
                <div class="flex items-center gap-5">
                    <div class="p-2 bg-white rounded-full flex">
                        <span class="material-symbols-light--home-rounded size-6 text-black"></span>
                    </div>
                    <section class="space-y-1">
                        <h1 class="font-medium text-lg">Home</h1>
                        <p class="font-light">Explore my portfolio</p>
                    </section>
                </div>
                <span class="flowbite--angle-right-outline size-4 text-white"></span>
            </a>

            {{-- projects --}}
            <a href="/projects"
                class="p-5 cursor-pointer min-w-sm border border-white/20 rounded-sm flex items-center justify-between gap-10 hover:border-white transition">
                <div class="flex items-center gap-5">
                    <div class="p-2 bg-white rounded-full flex">
                        <span class="flowbite--folder-solid size-6 text-black"></span>
                    </div>
                    <section class="space-y-1">
                        <h1 class="font-medium text-lg">Projects</h1>
                        <p class="font-light">See my works</p>
                    </section>
                </div>
                <span class="flowbite--angle-right-outline size-4 text-white"></span>
            </a>
        </div>
    </main>
</body>

</html>
