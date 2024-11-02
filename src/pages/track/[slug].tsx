import type { GetServerSideProps, NextPage } from "next";
import { api } from "~/utils/api";
import Image from "next/image";
import { PageLayout } from "~/components/layout";
import { LoadingPage } from "~/components/loading";
import Custom404 from "~/pages/404";

const UserTrack: NextPage<{ username: string }> = ({ username }) => {
  const { data, isLoading } = api.profile.getUserByUsername.useQuery({ username: username })
  if (isLoading) return <LoadingPage />
  if (!data) return <Custom404 />
  return (
    <PageLayout>
        <div className="relative h-48 border-slate-300 bg-slate-600 flex-col">
            { data.image ? 
            <Image
            className="absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-4 border-black bg-black"
            src={data.image}
            width={128}
            height={128}
            alt={`Foto do perfil de ${data.name}`} /> :
            <>erro</>
            }
          
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
  const username = context.params?.slug
    
  return {
    props: {
      trpcState: helpers.dehydrate(),
      username,
    },
  };
}

export default UserTrack;