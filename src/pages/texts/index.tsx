import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import React from "react";
import type { RouterOutputs } from "~/utils/api";
import Link from "next/link"
import { LoadingPage } from "~/components/loading";

type Text = RouterOutputs["text"]["getById"];
const TextCard = (props: Text) => {
  const {id, name, contents} = props;
  return (
    <Link href={`/texts/${id}`}>
    <div>
      {name}
      {contents}
    </div>
    </Link>
  )
}

export default function Home() {
  const { data, isLoading } = api.text.getAll.useQuery();
  return (
    <PageLayout>
      {isLoading ? <LoadingPage /> :
        data?.map((text) => {
          return <TextCard key={text.id} {...text} /> 
        })}
    </PageLayout>
  );
}


