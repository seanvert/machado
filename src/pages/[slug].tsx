import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import Image from "next/image";
import NavBar from "src/components/navbar";

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data, isLoading } = api.profile.getUserByUsername.useQuery({ username: username })
  if (!data) return <div>404</div>

  return (
    <>
      <Head>
        <title>Perfil de {data.name}</title>
      </Head>
      <NavBar />
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
    </>
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
  
  const slug = context.params?.slug;

  const username = session?.user.name
    
  return {
    props: {
      trpcState: helpers.dehydrate(),
      username,
    },
  };
}

export default ProfilePage;