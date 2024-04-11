import type { GetServerSideProps, NextPage } from "next";
import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import { LoadingPage } from "~/components/loading";
import Custom404 from "~/pages/404";
const ExercisePage: NextPage<{ id: number }> = ({ id }) => {
    const { data, isLoading } = api.exercise.getById.useQuery({ exerciseId: id })
    if (!data) return <Custom404 />
    if (isLoading) return <LoadingPage />
    return (
        <PageLayout>
            <div className="p-4 text-2xl font-bold">
                {`${data.name}`}
            </div>
            <div className="flex">
                <div className="w-1/3"></div>
                <div className="prose prose-sm mx-auto ">
                    <div>{data.contents.split('\n').map(line => {
                        return <p key={line}>{line}</p>
                    })}</div>
                </div>
                <div className="w-1/3"></div>
            </div>
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