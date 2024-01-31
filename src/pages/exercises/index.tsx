import { api } from "~/utils/api";
import { useForm, type SubmitHandler } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { PageLayout } from "~/components/layout"
import { cn } from "@/lib/utils"
type Inputs = {
  textAreaID: string
}

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/jWS6awMPrcR
 */
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"

export function Component() {
  const { mutate, isLoading } = api.post.create.useMutation()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate({
      name: data.textAreaID
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

function BoldIcon(props: React.HTMLAttributes<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 12a4 4 0 0 0 0-8H6v8" />
      <path d="M15 20a4 4 0 0 0 0-8H6v8Z" />
    </svg>
  )
}


function ItalicIcon(props: React.HTMLAttributes<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" x2="10" y1="4" y2="4" />
      <line x1="14" x2="5" y1="20" y2="20" />
      <line x1="15" x2="9" y1="4" y2="20" />
    </svg>
  )
}


function RedoIcon(props: React.HTMLAttributes<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 7v6h-6" />
      <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" />
    </svg>
  )
}


function UnderlineIcon(props: React.HTMLAttributes<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 4v6a6 6 0 0 0 12 0V4" />
      <line x1="4" x2="20" y1="20" y2="20" />
    </svg>
  )
}


function UndoIcon(props: React.HTMLAttributes<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7v6h6" />
      <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
    </svg>
  )
}

export default function Home() {
  const { data, isLoading } = api.exercise.getAll.useQuery();
  return (

        <PageLayout>
        { isLoading ? "carregando..." : data?.map((exercise) => {
          return exercise.name
        }) }
        <Component />
        </PageLayout>
  );
}


