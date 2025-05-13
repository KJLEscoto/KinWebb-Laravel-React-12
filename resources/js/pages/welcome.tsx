import AboutMe from '@/components/personalized/about-me-short';
import FeaturedProjects from '@/components/personalized/featured-projects';
import Hero from '@/components/personalized/hero';
import MainLayer from '@/components/personalized/main-layer';
import ClientLayout from '@/layouts/client-layout';
import { Hero as MainHero, Project, ShortAbout, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

type WelcomeProps = {
    featured_projects: Project[],
    main_hero: MainHero,
    short: ShortAbout
}

export default function Welcome({ main_hero, featured_projects, short }: WelcomeProps) {

    return (
        <ClientLayout>
            <Head title="Welcome" />
            <MainLayer paddingBottom>
                <Hero main_hero={main_hero} />
                <div className='space-y-40' id='explore'>
                    <FeaturedProjects projects={featured_projects} />
                    <AboutMe short={short} />
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