import type { GetServerSideProps, NextPage } from "next";
import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import { LoadingPage } from "~/components/loading";
import Custom404 from "~/pages/404";
import { useForm, type SubmitHandler } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
type Inputs = {
  textAreaID: string
}
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { UndoIcon, ItalicIcon, BoldIcon, RedoIcon, UnderlineIcon } from "~/components/icon";

export function Component() {
  const { mutate, isLoading } = api.text.create.useMutation()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate({
      name: "test",
      contents: data.textAreaID,
      exerciseId: 1,
    })
  }

  const freeWriting = () => {
    console.log("free writing")
    return 0
  }

  const allStartingWithLetter = () => {
    console.log("all starting with letter")
    return 0
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn("flex flex-col h-full max-w-3xl mx-auto rounded-lg shadow-lg overflow-hidden")}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <Button size="icon" variant="ghost">
              <BoldIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </Button>
            <Button size="icon" variant="ghost">
              <ItalicIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </Button>
            <Button size="icon" variant="ghost">
              <UnderlineIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">Word count: {watch("textAreaID") ? watch("textAreaID")?.split(" ").length - 1 : 0}</span>
            <Button size="icon" variant="ghost">
              <UndoIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </Button>
            <Button size="icon" variant="ghost">
              <RedoIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </Button>
            <Button
              disabled={isLoading} type="submit"
              className="text-gray-500 dark:text-gray-400 border-gray-500 dark:border-gray-400" variant="outline">
              Save
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="text-gray-500 dark:text-gray-400 border-gray-500 dark:border-gray-400"
                  variant="outline"
                >
                  Exercise Type
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <DropdownMenuItem className="text-gray-500 dark:text-gray-400">Prompts</DropdownMenuItem>
                <DropdownMenuItem onClick={allStartingWithLetter} className="text-gray-500 dark:text-gray-400">All Starting With Letter</DropdownMenuItem>
                <DropdownMenuItem onClick={freeWriting} className="text-gray-500 dark:text-gray-400">Freewriting</DropdownMenuItem>
                <DropdownMenuItem className="text-gray-500 dark:text-gray-400">Timed Writing</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Textarea
          className="flex-1 p-6 resize-none outline-none rounded-b-lg"
          {...register("textAreaID", { required: true })}
          id="writing-area"
          placeholder="Start writing here..."
        />
      </div>
    </form>
  )
}

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
            <Component />
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