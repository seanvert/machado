import type { GetServerSideProps, NextPage } from "next";
import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import { LoadingPage } from "~/components/loading";
import { NotFound } from "~/components/notfound";
const ExercisePage: NextPage<{ id: number }> = ({ id }) => {
    const { data, isLoading } = api.exercise.getById.useQuery({ exerciseId: id })
    if (!data) return <NotFound />
    if (isLoading) return <LoadingPage />
    return (
        <PageLayout>
            <div className="relative h-48 border-slate-300 bg-slate-600 flex-col">
                {data.name} 
            {data.contents}
            {data.configs}
            {data.progress}
            </div>
            <div className="h-[64px]"></div>
            <div className="p-4 text-2xl font-bold">
                {`${data.name}`}
            </div>
            <div className="border-b border-slate-400 w-full"></div>
        </PageLayout>
    );
}

import { createServerSideHelpers } from '@trpc/react-query/server';
import { appRouter } from '~/server/api/root';
import { db } from '~/server/db';
import superjson from 'superjson';
import { authOptions } from "~/server/auth";
import { getServerSession } from "next-auth";


export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions)
    const helpers = createServerSideHelpers({
        router: appRouter,
        ctx: {
            db: db,
            session: session,
        },
        transformer: superjson,
    });
    let id;
    if (context.params?.id && !Array.isArray(context.params?.id)) {
        id = parseInt(context.params?.id)
    }
    if (!id) {
        id = 0
    }
    await helpers.exercise.getById.fetch({
        exerciseId: id
    })
    const username = session?.user.name

    return {
        props: {
            trpcState: helpers.dehydrate(),
            id,
            username
        },
    };
}

export default ExercisePage;