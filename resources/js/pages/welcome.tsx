import AboutMe from '@/components/personalized/about-me-short';
import FeaturedProjects from '@/components/personalized/featured-projects';
import Hero from '@/components/personalized/hero';
import MainLayer from '@/components/personalized/main-layer';
import ClientLayout from '@/layouts/client-layout';
import { Head } from '@inertiajs/react';

export default function Welcome() {

    return (
        <ClientLayout>
            <Head title="Welcome" />
            <MainLayer paddingBottom>
                <Hero />
                <div className='space-y-40' id='explore'>
                    <FeaturedProjects />
                    <AboutMe />
                </div>
            </MainLayer>
        </ClientLayout>
    );
}

// const { auth } = usePage<SharedData>().props;
{/* <hr className='z-10 absolute top-[200px] left-0 md:w-2xl w-sm transition-all duration-500' />
<hr className='z-10 absolute top-[203px] left-0 md:w-xl w-xs transition-all duration-500' />

<hr className='z-10 absolute top-[700px] -rotate-[25deg] right-0 md:w-2xl w-sm transition-all duration-500' />
<hr className='z-10 absolute top-[690px] -rotate-[25deg] right-0 md:w-xl w-xs transition-all duration-500' /> */}