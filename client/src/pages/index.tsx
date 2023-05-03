import Head from 'next/head'
import { useRef } from "react";
import CategoryNav from "@/components/CategoryNav";
import ShrinkText from "@/components/UI/ShrinkText";
import {API_URL} from "@/core/constants";

export default function Home({categories}:any) {

    // const ttt = ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam aspernatur consequatur dolores eius eos excepturi ipsam ipsum magnam, officia quia quibusdam quidem. Cum deserunt fugit minima sequi, similique ut.\n' +
    //     '                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam aspernatur consequatur dolores eius eos excepturi ipsam ipsum magnam, officia quia quibusdam quidem. Cum deserunt fugit minima sequi, similique ut.\n' +
    //     '                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam aspernatur consequatur dolores eius eos excepturi ipsam ipsum magnam, officia quia quibusdam quidem. Cum deserunt fugit minima sequi, similique ut.\n' +
    //     '                  '
    // const shrRef = useRef(null)

    // const click = (event) => {
    //     console.log(event.target.attributes['data-file-name'].nodeValue)
    //     console.log(event.target)
    // }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
          <div style={{minHeight:'1000px'}}>
              <CategoryNav categories={categories}/>
              {/*<img src={`/api/static/images/9ddca34b-35e4-4acb-914d-b394a19b02aa/9ddca34b-35e4-4acb-914d-b394a19b02aa.jpeg`} alt="123"/>*/}

              {/*<div ref={shrRef} style={{width:'100%', maxWidth:'300px', height:'200px'}}>*/}
              {/*    <ShrinkText text={ttt} wrapperRef={shrRef}/>*/}
              {/*</div>*/}
          </div>
      </main>
    </>
  )
}

export async function getServerSideProps() {
    const categories = await fetch(`${API_URL}/blog/category/`).then(r => r.json())

    return {
        props: {categories: categories}
    }
}
