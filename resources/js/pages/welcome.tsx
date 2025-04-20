import AboutMe from '@/components/personalized/about-me-short';
import FeaturedProjects from '@/components/personalized/featured-projects';
import Hero from '@/components/personalized/hero';
import ClientLayout from '@/layouts/client-layout';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    // const { auth } = usePage<SharedData>().props;

    return (
        <ClientLayout>
            <Head title="Welcome" />
            <main className='min-h-screen h-auto w-full bg-[#040204]'>
                <Hero />

                <span className='space-y-40'>
                    <FeaturedProjects />
                    <AboutMe />
                </span>
            </main>
        </ClientLayout>
    );
}

{/* <hr className='z-10 absolute top-[200px] left-0 md:w-2xl w-sm transition-all duration-500' />
<hr className='z-10 absolute top-[203px] left-0 md:w-xl w-xs transition-all duration-500' />

<hr className='z-10 absolute top-[700px] -rotate-[25deg] right-0 md:w-2xl w-sm transition-all duration-500' />
<hr className='z-10 absolute top-[690px] -rotate-[25deg] right-0 md:w-xl w-xs transition-all duration-500' /> */}