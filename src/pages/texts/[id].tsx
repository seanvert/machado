import type { GetServerSideProps, NextPage } from "next";
import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import { LoadingPage } from "~/components/loading";
import Custom404 from "~/pages/404";

const TextPage: NextPage<{ id: number }> = ({ id }) => {
    const { data, isLoading } = api.text.getById.useQuery({ textId: id })
    if (!data) return <Custom404 />
    if (isLoading) return <LoadingPage />
    return (
        <PageLayout>
            <div className="relative h-48 border-slate-300 bg-slate-600 flex-col">
                {data.name} 
            {data.contents}
            </div>
            <div className="h-[64px]"></div>
            <div className="p-4 text-2xl font-bold">
                {`${data.id} - ${data.name}`}
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
    await helpers.text.getById.fetch({
        textId: id
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

export default TextPage