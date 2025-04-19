import FeaturedProjects from '@/components/personalized/featured-projects';
import FixedBottom from '@/components/personalized/fixed-bottom';
import Hero from '@/components/personalized/hero';
import NavHeader from '@/components/personalized/nav-header';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    // const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome" />
            <main className='min-h-screen h-auto max-w-5xl mx-auto'>
                <span className='fixed top-0 z-50 max-w-5xl mx-auto w-full mix-blend-difference'>
                    <NavHeader />
                </span>

                <Hero />
                <FeaturedProjects />

                <span className='fixed bottom-5 z-50 max-w-5xl mx-auto w-full mix-blend-difference'>
                    <FixedBottom />
                </span>
            </main>
        </>
    );
}

{/* <hr className='z-10 absolute top-[200px] left-0 md:w-2xl w-sm transition-all duration-500' />
<hr className='z-10 absolute top-[203px] left-0 md:w-xl w-xs transition-all duration-500' />

<hr className='z-10 absolute top-[700px] -rotate-[25deg] right-0 md:w-2xl w-sm transition-all duration-500' />
<hr className='z-10 absolute top-[690px] -rotate-[25deg] right-0 md:w-xl w-xs transition-all duration-500' /> */}