import React, { useEffect, useState } from "react";
import useLinkStore from "@/store/links";
import { useRouter } from "next/router";
import { LinkIncludingShortenedCollectionAndTags } from "@/types/global";
import ReadableView from "@/components/ReadableView";

export default function Index() {
  const { links, getLink } = useLinkStore();

  const [link, setLink] = useState<LinkIncludingShortenedCollectionAndTags>();

  const router = useRouter();

  useEffect(() => {
    const fetchLink = async () => {
      if (router.query.id) {
        await getLink(Number(router.query.id));
      }
    };

    fetchLink();
  }, []);

  useEffect(() => {
    if (links[0]) setLink(links.find((e) => e.id === Number(router.query.id)));
  }, [links]);

  return (
    <div className="relative">
      {/* <div className="fixed left-1/2 transform -translate-x-1/2 w-fit py-1 px-3 bg-base-200 border border-neutral-content rounded-md">
        Readable
      </div> */}
      {link && <ReadableView link={link} />}
    </div>
  );
}
